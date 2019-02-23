var config = {
    restore: {
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
    }
}

console.log('DEFAULT_CONFIG', config)
