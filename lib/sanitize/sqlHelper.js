const sql = require('mssql')

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms))

async function attemptConnection(connectionString){
    await sql.connect(connectionString)
}

async function releaseConnection(){
    await sql.close()
}

module.exports = {
    connect: async (connectionString, maxConnectionAttempts) => {
        var remainingAttempts = maxConnectionAttempts
        var lastError = null

        while (remainingAttempts > 0){
            remainingAttempts--
            try{
                console.log(`AttemptConnection... remainingAttempts: ${remainingAttempts}`)
                await attemptConnection(connectionString)
                return true
            }
            catch(err){
                lastError = err
                // console.log('CONNECTION_ERROR', lastError)
                await releaseConnection()
                await snooze(5000)
            }
        }

        console.log('CONNECTION_ERROR', lastError)
        throw lastError
    },
    execute: async (query) => {
        const result = await sql.query(query)
        return result
    }
}
