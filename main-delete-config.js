const rfr = require('rfr')
const configHelper = rfr('lib/config')

if (configHelper.configExists()){
    configHelper.delete()
}

console.log('Configuration Deleted')
