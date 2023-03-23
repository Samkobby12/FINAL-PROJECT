const mysql = require("mysql2");

// create connection to database.
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "Travel_Blog",
  password: "",
});

function query(sql, params) {
  return new Promise(function (resolve, reject) {
    connection.query(sql, params, function (err, results) {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

// async function getTop3() {
//   const sql = `SELECT * FROM MyData ORDER BY id ASC LIMIT 3`;
//   const results = await query(sql);
//   return results;
// }

async function getTravels(req) {
  const sql = `SELECT * FROM MyData ORDER BY visitingDate ASC`;
  const results = await query(sql, req.body);
  return results;
}
async function getTravelByID(id) {
  const sql = `SELECT * FROM MyData where id= ?`;
  const results = await query(sql, [id]);
  return results[0];
}

async function addLocation(DataBody) {
  const sql = `INSERT INTO MyData VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    DataBody.title,
    DataBody.country,
    DataBody.city,
    DataBody.image,
    DataBody.visitingDate,
    DataBody.author,
    DataBody.text,
    DataBody.latitude,
    DataBody.longitude,
  ];
  const results = await query(sql, params);
  return results;
}

module.exports = {
  getTravels,
  getTravelByID,
  addLocation,
};
