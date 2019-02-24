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

    }
}