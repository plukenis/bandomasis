const express = require("express");
const app = express();
const port = 3003;
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "bandomasis",
  password: "root",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// //Routing
// app.get("/", (req, res) => {
//   res.send("Labas, ka tu? As tai nieko.");
// });

// app.get("/labas/:id", (req, res) => {
//   res.send(`Pats tu ${req.params.id}.`);
// });

// app.get("/test", (req, res) => {
//   res.send(JSON.stringify({ test: "OK" }));
// });

// --- ROUTING part ---
// All records from data base routing

app.get("/scooters", (req, res) => {
  const sql = `
      SELECT *
      FROM scooters
  `;
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

// CRUD parts
// Add new item

app.post("/scooters", (req, res) => {
  const sql = `
      INSERT INTO scooters
      (registration_code, is_busy, last_use_time, total_ride_kilometres)
      VALUES (?, ?, ?, ?)
  `;
  con.query(
    sql,
    [req.body.registration_code, 
      req.body.is_busy, 
      req.body.last_use_time, 
      req.body.total_ride_kilometres],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

// Edit item

app.put("/scooters/:id", (req, res) => {
  const sql = `
      UPDATE scooters
      SET registration_code = ?, 
      is_busy = ?, 
      last_use_time = ?, 
      total_ride_kilometres = ?
      WHERE id = ?
  `;
  con.query(
    sql,
    [
      req.body.registration_code,
      req.body.is_busy,
      req.body.last_use_time,
      req.body.total_ride_kilometres,
      req.params.id,
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

// delete item

app.delete("/scooters/:id", (req, res) => {
  const sql = `
      DELETE FROM scooters
      WHERE id = ?
      `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//FILTER< SORT< SEARCH
//Filter - rodo tik tam tikra "registration_code" is crystalu domenu bazess

app.get('/scooters-filter/:t', (req, res) => {
  const sql = `
      SELECT *
      FROM scooters
      WHERE registration_code = ?
  `;
  
  con.query(sql, [req.params.t], (err, results) => {
      if (err) {
          throw err;
      }
      res.send(results);
  })
})

// paieska pagal pavadynima arba raktini zodi

app.get('/scooters-registration_code', (req, res) => {
  const sql = `
      SELECT *
      FROM scooters
      WHERE registration_code LIKE ?
  `;
  con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
      if (err) {
          throw err;
      }
      res.send(results);
  })
})


app.listen(port, ()=>{})
  // console.log(`Example app listening at http://localhost:${port}`)
