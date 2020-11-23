const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            console.err('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code == 'ER_CON_COUNT_ERRROR') {
            console.err('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code == 'ECONNREFUSED') {
            console.err('DATABASE CONNECTION REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB IS CONNECTED');
    return;
});

//Promisify Pool query
pool.query = promisify(pool.query);

module.exports = pool;