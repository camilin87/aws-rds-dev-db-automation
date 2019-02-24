const rfr = require('rfr')
const connections = rfr('lib/connections')
const elasticBeanstalkHelper = rfr('lib/elasticBeanstalk')

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

        const connectionString = buildConnectionStringValue(config.connectionString, config.base64)

        await elasticBeanstalkHelper.updateEnvironment({
            region: config.region,
            environmentName: config.environmentName,
            key: config.connectionStringKey,
            value: connectionString,
            timeout: config.timeout
        })

        console.log('Update Connection String Completed...', config)

        return true
    }
}