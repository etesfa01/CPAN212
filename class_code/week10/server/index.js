import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/book.js"; //db.booksfunction
import book_router from "./routers/book_router.js"
import user_router from "./routers/user_router.js"

//variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000; //change to 6000 instead of

//middleware
app.use(express.json()); //JSON
app.use(express.urlencoded({extended: true})) //HTML Form
app.use(cors());

//routes
app.get("/", (req, res) => {
  //1. fetch from DB
  //2. send to client
  //Book.find is the same as db.books
  Book.find().then((results) => {
    res.json(results);
  });
});

app.use("/book", book_router);
app.use("/user", user_router);


//start up
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DB is connected");
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
