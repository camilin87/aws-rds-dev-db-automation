const rfr = require('rfr')
const connections = rfr('lib/connections')
const elasticBeanstalkHelper = rfr('lib/environment/elasticBeanstalkHelper')
const environmentStatus = rfr('lib/environment/environmentStatus')

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

        const elasticBeanstalk = elasticBeanstalkHelper(config.region)

        const connectionString = buildConnectionStringValue(config.connectionString, config.base64)

        await environmentStatus(elasticBeanstalk).ensureReady(config.environmentName, config.timeout)

        console.log('Updating environment...')
        const updateResult = await elasticBeanstalk.updateEnvironmentSetting(config.environmentName, config.connectionStringKey, connectionString)
        // console.log('UPDATE_RESULT', updateResult)
        await environmentStatus(elasticBeanstalk).ensureReady(config.environmentName, config.timeout)

        console.log('Update Connection String Completed')
        return true
    }
}