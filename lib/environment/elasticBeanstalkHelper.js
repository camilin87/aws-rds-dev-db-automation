const AWS = require('aws-sdk')

module.exports = (region) => {
    function createElasticBeanstalkClient(){
        AWS.config.update({region: region})
        return new AWS.ElasticBeanstalk()
    }


    return {
        updateEnvironmentSetting: async (environmentName, key, value) => {
            const elasticBeanstalk = createElasticBeanstalkClient()
            const updateResult = await elasticBeanstalk.updateEnvironment({
                EnvironmentName: environmentName,
                OptionSettings: [
                    {
                        Namespace: 'aws:elasticbeanstalk:application:environment',
                        OptionName: key,
                        Value: value
                    }
                ]
            }).promise()
            return updateResult
        }
    }
}
