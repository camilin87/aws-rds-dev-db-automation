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
        await instanceStatus(rds).ensureAvailable(config.prod.dbIdentifier, 600)
        // console.log('DBInstance Prod:', dbInstanceDataProd)

        const mostRecentSnapshot = await rds.readMostRecentSnapshot(config.prod.dbIdentifier)
        console.log('Most Recent Snapshot Id', mostRecentSnapshot.DBSnapshotIdentifier)

        const newInstanceName = nameGenerator()
            .create(config.dev.databasePrefix)
        await instanceStatus(rds).ensureDoesNotExist(newInstanceName)
        console.log('Restore Target', newInstanceName)

        //TODO restore goes here

        await instanceStatus(rds).ensureAvailable(newInstanceName, 600)
        const dbInstanceDataDev = await rds.readInstanceInfo(newInstanceName)
        // console.log('DBInstance Dev:', dbInstanceDataDev)


        return true
    }
}