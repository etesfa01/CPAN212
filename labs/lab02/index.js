import express from "express";
import lab_router from "./routers/lab_router.js";

const app = express();
const PORT = process.env.PORT || 8000;

//imported routes
app.use("/lab", lab_router)

app.get('/', (req, res) => {
    res.send("Welcome to the express server")
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})