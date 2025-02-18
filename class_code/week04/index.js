import express from "express"; // if you are using type: module
import logger from "./logger.js";
import auth from "./auth.js"
//if you are module.type - you have to add .js to the file

// const express = require("express"); // if using common JS (Default)

const app = express();
const PORT = process.env.PORT || 8000;

// middlelware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// //creating a function so you don't copy paste it multiple times in each function
// const logger = (req, res, next) => {
//     console.log(req.url);
//     console.log(req.method); //show me info they are requesting
//     console.log(req.headers); //information they are asking
//     console.log(Date()); //show me exact date and time
//     next();
// };

//will use it throughout the application instead of writing it in each route as //logger(req)
//this is application wide
app.use(logger);

// routes
//app.get("/", logger, (req, res) --- used if you didn't use app.use(logger)
//however, you will be running into issues without a return statement -> next()
app.get("/", (req, res) => {
    // logger(req);
    res.send("Welcome to our server");
});

app.get("/about", (req, res) => {
    res.send("Welcome to our server");
});

app.get("/login", (req, res) => {
    res.send("We have received your request - Login");
});

app.post("/login", (req, res) => {
    res.send("We stole your information");
});

app.get("/fetchData", auth, (req, res) => {
    res.send("Hi Eden, here is your profile data");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});


//you need tp put all your routing before this as then it will say 'PAGE NOT FOUND'
app.use("", (req, res) => {
    res.status(404).send("Page not found");
});
