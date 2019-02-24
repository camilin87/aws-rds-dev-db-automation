const rfr = require('rfr')
const connections = rfr('lib/connections')
const scriptProcessor = rfr('lib/sanitize/scriptProcessor')

module.exports = {
    sanitize: async (config) => {
        console.log('Sanitize starting...', config)

        if (!config.enabled){
            console.log('Sanitize Disabled. Finishing early.')
            return false
        }

        const scripts = (config.scripts || [])
        const connectionString = connections.buildForNode(config.connectionString)

        for (var i = config.scripts.length - 1; i >= 0; i--) {
            await scriptProcessor.run(connectionString, config.scripts[i], config.maxConnectionAttempts)
        }

        console.log('Sanitize Completed')
        return true
    }
}