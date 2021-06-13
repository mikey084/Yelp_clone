require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const db = require("./db/index.js");
const bodyParser = require("body-parser");
const { reset } = require("nodemon");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




//Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try{
        const results = await db.query("select * from restaurants");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows
            },
        });
    } catch(err) {
        console.log(err);
    }
});

//Get single restaurant
app.get("/api/v1/restaurants/:id", async (req, res) =>{
    console.log(req.params.id);
    try{
        const results = await db.query(`select * from restaurants where id= $1`, [req.params.id]);
        console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },  
        })
    } catch(err){
        console.log(err);
    }
});

//Create a Restaurant

app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
  
    try {
      const results = await db.query(
        "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price_range]
      );
      console.log(results);
      res.status(201).json({
        status: "succes",
        data: {
          restaurant: results.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
  });


//Update a restaurant

app.put("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await db.query("update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name,
        req.body.location, req.body.price_range, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        })
    } catch(err){
        console.log(err);
    }
    
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("delete from restaurants where id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        })
    } catch (err){
        console.log(err);
    }
})
  
app.listen(port, () =>  {
    console.log(`server is up and listening on port ${port}`);
});