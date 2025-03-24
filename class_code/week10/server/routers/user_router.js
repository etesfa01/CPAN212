import express from "express";
import User from "../models/user.js";
import bcrypt, { compare } from "bcryptjs";

const router = express.Router();

//1. Register
router.post("/register", (req, res) => {
    console.log("Received body:", req.body)
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({message: "Email and Password is required"})
  }

  bcrypt.hash(password, 10).then((hashedPassword) => {
    let newUser = new User({ 
        email, 
        password: hashedPassword 
    });

    newUser.save().then(() => {
      res.json({ message: "You are Registered" });
    }).catch((err) => {
        res.status(500).json({message: "Error saving user", error: err})
    });
  });
});

router.post("/login", (req, res) => {
    const {email, password} = req.body;

    //find vs findOne
    User.findOne({email: email})
    .then((userAccount) => {
        if(!userAccount){
            res.status(400).json({message: "NO ACCOUNT FOUND"})
        }
        bcrypt.compare(password, userAccount.password)
        .then((compareResults) =>{
            if (compareResults) {
                res.json({message: "YOU HAVE LOGGED IN"})
            }
        })
    })
    .catch((err) => {
        console.log(err);
        res.json({message: "Account not found"})
    })
})

/*
    1. Register
        a. parse info
        b. hash the password
        c. save
    2. Login
*/

export default router;