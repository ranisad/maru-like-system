const mysql = require('mysql');
var MySql = {};

var connection = null;

MySql.initialize = function() {
    global.connection = mysql.createPool(config.connectionString);
}

module.exports.MySqlConnection = MySql;
