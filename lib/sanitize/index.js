module.exports = {
    sanitize: async (config) => {
        console.log('Sanitize starting...', config)

        if (!config.enabled){
            console.log('Sanitize Disabled. Finishing early.')
            return false
        }

        // (config.scripts || []).forEach()

        return true
    }
}