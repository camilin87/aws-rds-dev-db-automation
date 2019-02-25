const fs = require('fs')

const configFilePath = './config.json'

module.exports = {
    configExists: () => fs.existsSync(configFilePath),
    read: () => JSON.parse(fs.readFileSync(configFilePath, 'utf8')),
    write: (config) => fs.writeFileSync(configFilePath, JSON.stringify(config)),
    delete: () => fs.unlinkSync(configFilePath)
}
