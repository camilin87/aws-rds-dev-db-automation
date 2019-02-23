const fs = require('fs')

var config = {
    restore: {
        enabled: false,
        region: 'us-east-1',
        prod: {
            dbIdentifier: 'PROD_DATABASE_NAME'
        },
        dev: {
            databasePrefix: 'DEV_DATABASE_NAME',
            masterPassword: 'DEV_DATABASE_PASSWORD',
            securityGroups: ['sg-1', 'sg-2'],
            tags: [
                { Key: 'db_type', Value: 'dev' },
                { Key: 'automated_restore', Value: 'true' }
            ],
            availabilityZone: 'us-east-1c',
            instanceClass: 'db.t2.small'
        }
    },
    updateConnectionString: {
        enabled: false,
        region: 'us-east-1',
        environmentName: 'DEV_ENVIRONMENT_NAME',
        connectionStringKey: 'CONNECTION_STRING_ENVIRONMENT_VARIABLE_NAME',
        base64: true
    },
    sanitizeDevDatabase: {
        enabled: false,
        scripts: [
            'script1.sql',
            'script2.sql',
        ]
    }
}

const outputPath = './config.json'

console.log(`Writing default config to ${outputPath}`)

fs.writeFile(outputPath, JSON.stringify(config), 'utf-8', (err) => {
    if (err){
        console.log('ERROR', err)
        process.exit(1)
    }

    console.log('Completed')
    process.exit(0)
})
