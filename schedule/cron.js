const schedule         = require('node-schedule')

/**
* @param String periodicity
* @param Callback function
* @return
*/
const checkCovidInformation = schedule.scheduleJob('37 * * * *', function() {
  pubSub.publish('getNewCovidInformation')
})

module.exports = {
  checkCovidInformation
};

