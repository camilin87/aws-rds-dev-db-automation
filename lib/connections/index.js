module.exports = {
    buildForNode: (c) => `mssql://${c.username}:${c.password}@${c.dbIdentifier}.${c.awsAccount}.${c.region}.rds.amazonaws.com/${c.database}`,
    buildForDotNet: (c) => `Data Source=${c.dbIdentifier}.${c.awsAccount}.${c.region}.rds.amazonaws.com; Initial Catalog=${c.database};UID=${c.username};pwd=${c.password}`
}