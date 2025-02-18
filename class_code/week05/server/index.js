import express from "express";
import cors from "cors";
import multer from "multer";

import path from 'path';
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(_dirname, 'uploads'))
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrefix + "-" + file.fieldname)
    }
  })
  
  const upload = multer({ storage: storage })

const app = express();
const PORT = process.env.PORT || 8000;

// middlelware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.send("Welcome to our server");
});

//send data
app.get("/data", (req, res) => {
    const data = {
        fname: "Eden",
        lname: "Joe"
    }
    // res.send(data);
    res.json(data)
});

app.get("/login", (req, res) => {
    console.log(req.body)
    //process with DB in future
    res.send("This is your blaah data");
});

app.post("/login", (req, res) => {
    console.log("Received login request:", req.body)
    res.json({ message: "Login successful", user: req.body})
    // res.send("We stole your information");
});

app.post("/fileform", upload.single("file"), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.json("I RECEIVED YOUR INFORMATION")
})