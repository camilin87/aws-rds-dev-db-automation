const rfr = require('rfr')
const connections = rfr('lib/connections')
const AWS = require('aws-sdk')

function buildConnectionStringValue(connectionStringConfig, base64){
    const connectionString = connections.buildForDotNet(connectionStringConfig)

    if (base64){
        return Buffer.from(connectionString).toString('base64')
    }

    return connectionString
}

module.exports = {
    updateConnectionString: async (config) => {
        console.log('Update Connection String Starting...', config)

        if (!config.enabled){
            console.log('Update Connection String Disabled. Finishing early.')
            return false
        }

        AWS.config.update({region: config.region})
        const elasticbeanstalk = new AWS.ElasticBeanstalk()

        const connectionString = buildConnectionStringValue(config.connectionString, config.base64)

        const updateResult = await elasticbeanstalk.updateEnvironment({
            EnvironmentName: config.environmentName,
            OptionSettings: [
                {
                    Namespace: 'aws:elasticbeanstalk:application:environment',
                    OptionName: config.connectionStringKey,
                    Value: connectionString
                }
            ]
        }).promise()
        // console.log('UPDATE_RESULT', updateResult)

        console.log('Update Connection String Completed')
        return true
    }
}