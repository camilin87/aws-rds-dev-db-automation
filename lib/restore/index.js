const rfr = require('rfr')
const rdsHelper = rfr('lib/restore/rds')

module.exports = {
    restore: async (config) => {
        console.log('Restore Starting...', config)

        if (!config.enabled){
            console.log('Restore Disabled. Finishing early.')
            return false
        }

        const rds = rdsHelper(config.region)
        const dbInstanceDataProd = await rds.readInstanceInfo(config.prod.dbIdentifier)
        const currentStatus = dbInstanceDataProd.DBInstanceStatus
        // console.log('DBInstance Prod:', dbInstanceDataProd)

        if (currentStatus !== 'available'){
            throw new Error(`Production Instance must be in an 'available' status. status: ${currentStatus}`)
        }

        const mostRecentSnapshot = await rds.readMostRecentSnapshot(config.prod.dbIdentifier)
        console.log('DB_SNAPSHOT', mostRecentSnapshot.DBSnapshotIdentifier)
    }
}