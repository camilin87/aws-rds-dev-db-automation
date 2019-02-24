module.exports = (rds) => {
    function isAvailable(dbInstanceInfo){
        const currentStatus = dbInstanceInfo.DBInstanceStatus
        return currentStatus === 'available'
    }

    const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

    return {
        ensureAvailable: async (instanceIdentifier, maxSecondsToWait) => {
            var iterations = Math.floor(maxSecondsToWait)
            var shouldWait = false
            var dbInstanceInfo = null

            do {
                if (shouldWait){
                    await snooze(1000)
                }

                shouldWait = true
                iterations--
                dbInstanceInfo = await rds.readInstanceInfo(instanceIdentifier)
            } while(!isAvailable(dbInstanceInfo) && iterations > 0)

            if (!isAvailable(dbInstanceInfo)){
                throw new Error(`Instance ${instanceIdentifier} must be in an 'available' status. Status: ${currentStatus}`)
            }
        }
    }
}