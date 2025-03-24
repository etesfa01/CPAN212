const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
 

// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const testValidationFunction = (req, res) => {
    const testValidation = req.query.test_validation;
    const currentDate = new Date();
    const formattedDate = currentDate.toUTCString();

    if (testValidation) {
        console.log(`test_validation: ${testValidation}`)
    }else {
        console.log("test validation invalid")
    }

    console.log(`[${formattedDate}]`)
}
 
// routes
app.get("/", (req, res)=>{
    res.send("Welcome to our server")
})
 
app.get("/route_test", (req, res)=>{
    testValidationFunction(req, res)
    res.send("Test Validation function")
})
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});