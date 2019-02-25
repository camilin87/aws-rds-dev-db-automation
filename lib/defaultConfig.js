const rfr = require('rfr')
const configHelper = rfr('lib/config')

const defaultConfig = {
    restore: {
        enabled: false,
        region: 'us-east-1',
        // the timeout in seconds to wait for the restore to finish
        // and the instance to become available
        timeout: 1200,
        prod: {
            // the name of the database whose backups will be restored
            // typically a production database
            // the program will not impact this database at all
            dbIdentifier: 'PROD_DATABASE_NAME'
        },
        dev: {
            // a common prefix for the newly restored database
            // e.g. dev-database
            // the program will use this prefix and a function of the current time
            // to generate a unique and sortable name
            // e.g. dev-database-2019-02-25-12
            // e.g. dev-database-2019-02-25-10
            // e.g. dev-database-2019-02-25-05
            databasePrefix: 'DEV_DATABASE_NAME',
            // what security groups will be attached to the new instance
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
    // these parameters will be shared by other steps
    // that require a connection string
    connectionString: {
        region: 'us-east-1',
        // leave this blank when connecting to a newly created instance
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
        // this field will be added at runtime
        // dbIdentifier: 'WILL_GET_OVERWRITTEN_IF_RESTORE_RUN',
        password: 'DEV_DATABASE_PASSWORD'
    },
    sanitizeDevDatabase: {
        enabled: true,
        // a connectionString field will be added at runtime with
        // with the values from connectionString
        // connectionString: {},
        // a maximum number of connection attemps before executing the scripts
        // sometimes RDS instances don't allow connections for a brief time after creation
        maxConnectionAttempts: 100,
        // the list of scripts to execute after the new database has been created
        scripts: [
            'script1.sql',
            'script2.sql',
        ]
    },
    // step to delete older databases with the specified prefix
    // the programs gets all the RDS instances with the prefix
    // sorts them by name, and leaves only the most recent one
    deleteOldDevDatabase: {
        enabled: false,
        region: 'us-east-1',
        databasePrefix: 'DEV_DATABASE_NAME'
    },
    // step to update an elastic beanstalk environment setting
    // typically used to store connection strings
    updateConnectionString: {
        enabled: false,
        region: 'us-east-1',
        timeout: 1200,
        environmentName: 'DEV_ENVIRONMENT_NAME',
        // a connectionString field will be added at runtime with
        // with the values from connectionString
        // connectionString: {},
        connectionStringKey: 'CONNECTION_STRING_ENVIRONMENT_VARIABLE_NAME',
        // wether to encode the connection string value as a base64 string
        base64: true
    }
}

module.exports = {
    save: () => configHelper.write(defaultConfig)
}