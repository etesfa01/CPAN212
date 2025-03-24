import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    description: {
        type: String, 
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    steps: {
        type: [String],
        required: true,
    },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;