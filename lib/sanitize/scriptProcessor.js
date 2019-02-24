const fs = require('fs')
const rfr = require('rfr')
const sqlHelper = rfr('lib/sanitize/sqlHelper')

module.exports = {
    run: async (connectionString, filePath, maxConnectionAttempts) => {
        await sqlHelper.connect(connectionString, maxConnectionAttempts)

        const sqlQueryContents = fs.readFileSync(filePath, 'utf8')

        console.log(`Executing SQL file: ${filePath}`)
        const result = await sqlHelper.execute(sqlQueryContents)
        console.log(result)
        return result
    }
}