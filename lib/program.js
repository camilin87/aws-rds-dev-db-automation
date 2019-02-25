const rfr = require('rfr')
const configHelper = rfr('lib/config')
const rdsService = require('aws-automation-utils').rds
const sanitizeService = rfr('lib/sanitize')
const updateConnectionStringService = rfr('lib/updateConnectionString')

module.exports = {
    run: async () => {
        try {
            console.log('Program Starting...')
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

            console.log('Ending...')
            process.exit(0)
        } catch(err){
            console.log('ERROR', err)
            process.exit(1)
        }
    }
}