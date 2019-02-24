const fs = require('fs')

module.exports = {
    sortRdsSnapshot: (a, b) => a.SnapshotCreateTime > b.SnapshotCreateTime ? -1 : 1,
    todayString: () => new Date().toISOString().split('T')[0],
    readConfigModule: (name) => JSON.parse(fs.readFileSync('./config.json', 'utf8'))[name]
}