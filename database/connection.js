const { Sequelize } = require('sequelize')

// Extract vars in .env file
const {
  DB_NAME: database,
  DB_USR: username,
  DB_PASS: password,
  DB_HOST: host,
  DB_PORT: port
} = process.env


/**
 * @param String database
 * @param String username
 * @param String password
*/
const DB_CON = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: 'postgres',
  logging: true,
  dialectOptions: {
    ssl: false
  }
});


// Self called function to execute DB connection
(async () => {
  try {
    await DB_CON.authenticate();
    console.log('DB connection successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = {
  DB_CON
}