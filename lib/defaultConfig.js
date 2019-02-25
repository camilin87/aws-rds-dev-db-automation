const rfr = require('rfr')
const configHelper = rfr('lib/config')

const defaultConfig = {
    restore: {
        enabled: false,
        region: 'us-east-1',
        timeout: 1200,
        prod: {
            dbIdentifier: 'PROD_DATABASE_NAME'
        },
        dev: {
            databasePrefix: 'DEV_DATABASE_NAME',
            securityGroups: ['sg-1', 'sg-2'],
            tags: [
                { Key: 'db_type', Value: 'dev' },
                { Key: 'automated_restore', Value: 'true' }
            ],
            availabilityZone: 'us-east-1c',
            instanceClass: 'db.t2.small',
            publiclyAccessible: false,
            multiAZ: false
        }
    },
    connectionString: {
        region: 'us-east-1',
        dbIdentifier: 'WILL_GET_OVERWRITTEN_IF_RESTORE_RUN',
        awsAccount: 'AWS_ACCOUNT_ID',
        database: 'DATABASE_NAME',
        username: 'MASTER_USERNAME',
        password: 'DEV_DATABASE_PASSWORD'
    },
    updateMasterPassword: {
        enabled: false,
        region: 'us-east-1',
        timeout: 1200,
        dbIdentifier: 'WILL_GET_OVERWRITTEN_IF_RESTORE_RUN',
        password: 'DEV_DATABASE_PASSWORD'
    },
    sanitizeDevDatabase: {
        enabled: true,
        maxConnectionAttempts: 100,
        scripts: [
            'script1.sql',
            'script2.sql',
        ]
    },
    deleteOldDevDatabase: {
        enabled: false,
        region: 'us-east-1',
        databasePrefix: 'DEV_DATABASE_NAME'
    },
    updateConnectionString: {
        enabled: false,
        region: 'us-east-1',
        timeout: 1200,
        environmentName: 'DEV_ENVIRONMENT_NAME',
        connectionStringKey: 'CONNECTION_STRING_ENVIRONMENT_VARIABLE_NAME',
        base64: true
    }
}

module.exports = {
    save: () => configHelper.write(defaultConfig)
}