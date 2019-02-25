const rfr = require('rfr')
const configHelper = rfr('lib/config')
const defaultConfig = rfr('lib/defaultConfig')
const rdsService = require('aws-automation-utils').rds
const sanitizeService = rfr('lib/sanitize')
const updateConnectionStringService = rfr('lib/updateConnectionString')

function generateDefaultConfig(){
    defaultConfig.save()
}

async function program(){
    const config = configHelper.read()

    var restoreConfig = config.restore
    const newDatabaseName = await rdsService.restore(restoreConfig)

    var connectionStringConfig = config.connectionString
    if (newDatabaseName){
        connectionStringConfig.dbIdentifier = newDatabaseName
    }

    var changePasswordConfig = config.updateMasterPassword
    changePasswordConfig.dbIdentifier = connectionStringConfig.dbIdentifier
    await rdsService.updatePassword(changePasswordConfig)

    var sanitizeConfig = config.sanitizeDevDatabase
    sanitizeConfig.connectionString = connectionStringConfig
    await sanitizeService.sanitize(sanitizeConfig)

    var deleteOlderConfig = config.deleteOldDevDatabase
    await rdsService.deleteOlder(deleteOlderConfig)

    var updateConnectionStringConfig = config.updateConnectionString
    updateConnectionStringConfig.connectionString = connectionStringConfig
    await updateConnectionStringService.updateConnectionString(updateConnectionStringConfig)
}

module.exports = {
    run: async () => {
        try {
            if (!configHelper.configExists()){
                console.log('No configuration found. Generating default config. And exiting.')
                generateDefaultConfig()
            }
            else {
                console.log('Program Starting...')
                await program()
                console.log('Ending...')
            }

            process.exit(0)
        } catch(err){
            console.log('ERROR', err)
            process.exit(1)
        }
    }
}