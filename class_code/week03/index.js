import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8000;

//CRUD -> Servier is setup is set to do thse things
// METHOD -> GET(READ), POST(CREATE), PUT(UPDATE), DELETE

//FUNCTION part is do something 
//thunder client, POSTMAN
app.get('/', (req, res) => {
    res.send("GET")
})
app.post('/', (req, res) => {
    res.send("POST")
})
app.put('/', (req, res) => {
    res.send("PUT")
})
app.delete('/', (req, res) => {
    res.send("DELETE")
})


//https://www.youtube.com/watch?v=gLIHhTMN7qw&ab_channel=PrayerPray
//DOMAIN   /RESULTS ?   v=gLIHhTMN7qw&ab_channel=         query=PrayerPray
app.get("/item/:itemID", (req,res) => {
    console.log(req.url)
    console.log(req.headers)
    console.log(req.query)
    console.log(req.params)
    console.log(req.body)
    res.send("You came to the /search route")
})


app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
});