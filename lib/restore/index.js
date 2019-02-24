module.exports = {
    restore: async (config) => {
        console.log('Restore Starting...', config)

        if (!config.enabled){
            return false
        }

        //TODO restore goes here
    }
}