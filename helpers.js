module.exports = {
    sortRdsSnapshot: (a, b) => {
        return a.SnapshotCreateTime > b.SnapshotCreateTime ? -1 : 1
    }
}