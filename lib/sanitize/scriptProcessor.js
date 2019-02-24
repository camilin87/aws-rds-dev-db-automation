const fs = require('fs')
const sql = require('mssql')

module.exports = {
    run: async (connectionString, filePath) => {
        await sql.connect(connectionString)

        const sqlQueryContents = fs.readFileSync(filePath, 'utf8')

        console.log(`Executing SQL file: ${filePath}`)
        const result = await sql.query(sqlQueryContents)
        console.log(result)
        return result
    }
}