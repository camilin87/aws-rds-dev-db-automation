const AWS = require('aws-sdk')

module.exports = {
    restore: async (config) => {
        console.log('Restore Starting...', config)

        if (!config.enabled){
            console.log('Restore Disabled. Finishing early.')
            return false
        }

        AWS.config.update({region: config.region})
        const rds = new AWS.RDS()

        var dbInstances = await rds.describeDBInstances({
            DBInstanceIdentifier: config.prod.dbIdentifier
        }).promise()

        const dbInstanceDataProd = dbInstances.DBInstances[0]
        console.log('DBInstance Prod:', dbInstanceDataProd)
    }
}