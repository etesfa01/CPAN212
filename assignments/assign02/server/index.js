import express from 'express';
import cors from'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Recipe from './models/recipe.js';
import recipes_router from './routers/recipes_router.js';

//variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8001;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes
app.get("/", (req, res) => {
    Recipe.find().then((results) => {
        res.json(results);
    });
});

app.use("/", recipes_router);

//start up
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DB is connected");
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});