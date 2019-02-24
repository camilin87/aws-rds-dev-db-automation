const fs = require('fs')
const sql = require('mssql')

module.exports = {
    run: async (connectionString, filePath) => {
        await sql.connect(connectionString)

        const sqlQueryContents = fs.readFileSync(filePath, 'utf8')

        await sql.query(sqlQueryContents)
    }
}