const AWS = require('aws-sdk')

module.exports = (region) => {
    return {
        readInstanceInfo: async (instanceIdentifier) => {
            AWS.config.update({region: region})
            const rds = new AWS.RDS()

            var dbInstances = await rds.describeDBInstances({
                DBInstanceIdentifier: instanceIdentifier
            }).promise()

            return dbInstances.DBInstances[0]
        }
    }
}