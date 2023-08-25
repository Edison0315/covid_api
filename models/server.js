// 3rd parties imports
const express                   = require('express')

const DB_CON                    = require('../database/connection')
const pubSub                    = require("../events/pubSubObj")
const { checkCovidInformation } = require('../schedule/cron')

class Server {

  constructor(){

    // Server basics instance
    this.app  = express()
    this.port = process.env.PORT || 9001

    // Set obj in global scope to invoke
		global.pubSub = pubSub;

    // Globals
    global.DB_CON = DB_CON

    // Schedules
    this.checkCovidInformation = checkCovidInformation

    // Paths
    this.paths = {
      people: "/api/people"
    }

    // Invoke methods in constructor context
    this.routes()
    this.middlewares()

    this.connection = this.app.listen(this.port, () => {
      console.log(`Server listen in ${this.port} port`)
    })

  }

  routes(){
    this.app.use(this.paths.people, require("../routes/people"))
  }

  middlewares(){}

}

module.exports = Server