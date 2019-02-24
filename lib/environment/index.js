module.exports = {
    updateConnectionString: async (config) => {
        console.log('Update Connection String Starting...', config)

        if (!config.enabled){
            console.log('Update Connection String Disabled. Finishing early.')
            return false
        }

        //TODO

        console.log('Update Connection String Completed')
    }
}