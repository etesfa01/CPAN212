import express from "express";

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Welcome to the lab router file")
})
router.get("/name", (req, res) => {
    res.send("My name is Eden Tesfai")
})
router.get("/greeting", (req, res) => {
    res.send("SUPPP Eden! STUDENT ID: N01123283")
})
router.get("/add/:x/:y", (req, res) => {
    // const {x, y} = req.params;
    // const sum = Number(x) + Number(y);
    // res.send(`The sum of ${x} and ${y} is ${sum}`)

    let x = parseFloat(req.params.x)
    let y = parseFloat(req.params.y)
    res.send(`${x+y}`)
})
router.get("/calculate/:a/:b/:operation", (req, res) => {
    let a = parseFloat(req.params.a)
    let b = parseFloat(req.params.b)
    let operation = req.params.operation
    let result = 0;

    switch (operation) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/": //%2F
            if (b === 0){
                return res.send("b cannot equal to ZERO")
            }
            result = a / b;
            break;
        case "**":
            result = a ** b;
            break;

        default:
            res.send("Invalid operator")
            break;
    }
    res.send(`The result is ${result}`);
})


export default router;