const express = require("express");
const app  = express(); // create app from express
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json());


const db = mysql.createConnection(
    {
    user: "root",
    host:"localhost",
    password:"password",
    database:"reactlearn",
});

app.post("/createuser",(req,res) => {
    const name = req.body.name
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const wage = req.body.wage

    db.query("INSERT INTO employeeform (name, age, country, position, wage) VALUES (?,?,?,?,?)", 
    [name, age, country, position, wage], 
    (err,result) => { 

        if(err) {
            console.log(err)
        } else {
            res.send("values inserted")
        }
    })
})

//get all the people 
app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employeeform", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  // update the individuals based on an ID

  app.put("/update", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
      "UPDATE employeeform SET wage = ? WHERE id = ?",
      [wage, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  // delete based on id
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id; // get id from url
    db.query("DELETE FROM employeeform WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
app.listen(3001, 
    ()=>{console.log("running...msql");
});