require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("tiny"));

app.get("/api/v1/restaurants", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            restaurant: ["mcdonalds", "wendys"],
        },
    });
});

app.get("/api/v1/restaurants/restaurantid", (req, res) =>{
    console.log(req.params);
});

app.listen(port, () =>  {
    console.log(`server is up and listening on port ${port}`);
});