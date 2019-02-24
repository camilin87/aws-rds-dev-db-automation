const fs = require('fs')

module.exports = {
    sortRdsSnapshot: (a, b) => a.SnapshotCreateTime > b.SnapshotCreateTime ? -1 : 1,
    todayString: () => new Date().toISOString().split('T')[0]
}