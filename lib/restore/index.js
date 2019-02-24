const rfr = require('rfr')
const rdsHelper = rfr('lib/restore/rds')
const instanceStatus = rfr('lib/restore/instanceStatus')
const nameGenerator = rfr('lib/restore/nameGenerator')

module.exports = {
    restore: async (config) => {
        console.log('Restore Starting...', config)

        if (!config.enabled){
            console.log('Restore Disabled. Finishing early.')
            return false
        }

        const rds = rdsHelper(config.region)
        const dbInstanceDataProd = await rds.readInstanceInfo(config.prod.dbIdentifier)
        await instanceStatus(rds).ensureAvailable(config.prod.dbIdentifier, config.timeout)
        // console.log('DBInstance Prod:', dbInstanceDataProd)

        const mostRecentSnapshot = await rds.readMostRecentSnapshot(config.prod.dbIdentifier)
        const mostRecentSnapshotId = mostRecentSnapshot.DBSnapshotIdentifier
        console.log('Most Recent Snapshot Id', mostRecentSnapshotId)

        const newInstanceName = nameGenerator()
            .create(config.dev.databasePrefix)
        await instanceStatus(rds).ensureDoesNotExist(newInstanceName)
        console.log('Creating Instance:', newInstanceName)

        const restoreResult = await rds.restoreSnapshot({
            DBInstanceIdentifier: newInstanceName,
            DBSnapshotIdentifier: mostRecentSnapshotId,
            AvailabilityZone: config.dev.availabilityZone,
            DBInstanceClass: config.dev.instanceClass,
            Engine: dbInstanceDataProd.Engine,
            LicenseModel: dbInstanceDataProd.LicenseModel,
            MultiAZ: config.dev.multiAZ,
            PubliclyAccessible: config.dev.publiclyAccessible,
            StorageType: dbInstanceDataProd.StorageType,
            VpcSecurityGroupIds: config.dev.securityGroups,
            Tags: config.dev.tags
        })
        // console.log('Restore Result:', restoreResult)

        await instanceStatus(rds).ensureAvailable(newInstanceName, config.timeout)
        const dbInstanceDataDev = await rds.readInstanceInfo(newInstanceName)
        // console.log('DBInstance Dev:', dbInstanceDataDev)

        console.log('Changing Master Password')
        await rds.setMasterPassword(newInstanceName, config.dev.masterPassword)

        return newInstanceName
    }
}