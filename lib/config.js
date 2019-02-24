const fs = require('fs')

module.exports = {
    read: () => JSON.parse(fs.readFileSync('./config.json', 'utf8')),
    write: (config) => fs.writeFileSync('./config.json', JSON.stringify(config))
}
