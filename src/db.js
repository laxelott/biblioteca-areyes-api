import connData from "./../data";
import mysql from "mysql";

var DB = {
	con: {},
	open: () => {
		DB.con = mysql.createConnection({
			host: connData.host,
			user: connData.user,
			password: connData.password,
			database : connData.database
		});
		
		DB.con.connect();
	},
	close: () => {
		DB.con.destroy();
	},
	query: (sql) => {
		return new Promise((resolve, reject) => {
			DB.con.query(sql, function (err, result) {
				if (err) {
					throw err;
				}
				resolve(result);
			});
		});
	},
};

DB.con = mysql.createConnection({
	host: connData.host,
	user: connData.user,
	password: connData.password,
	database : connData.database
});

export default DB;
