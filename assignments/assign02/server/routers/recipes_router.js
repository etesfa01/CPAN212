import express from "express";
import Recipe from "../models/recipe.js";

const router = express.Router();

//4. Fetch all
router.get("/recipe", (req, res) => {
  Recipe.find()
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      res.status(500).send(err);
    });
});

//5. Add
router.post("/recipe", (req, res) => {
  const { name, description, difficulty, ingredients, steps } = req.body;

  let newRecipe = new Recipe({
    name,
    description,
    difficulty,
    ingredients,
    steps,
  });

  newRecipe
    .save()
    .then(() => {
      res.json({ message: "Recipe successfully added!" });
    })
    .catch((error) => {
      res.status(400).send(err);
    });
});

//6. fetch by ID
router.get("/recipe/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        return res.status(400).send({ message: "Recipe not found" });
      }
      res.json(recipe);
    })
    .catch((error) => {
      res.status(500).send(err);
    });
});

//7. update by ID
router.put("/recipe/:id", (req, res) => {
  const { name, description, difficulty, ingredients, steps } = req.body;

  Recipe.findByIdAndUpdate(
    req.params.id,
    { name, description, difficulty, ingredients, steps },
    { new: true }
  )
    .then((updatedRecipe) => {
      if (!updatedRecipe) {
        return res.status(404).send({ message: "Recipe not found" });
      }
      res.json(updatedRecipe);
    })
    .catch((error) => res.status(500).send({ error: error.message }));
});

//8. delete
router.delete("/recipe/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((deletedRecipe) => {
      if (!deletedRecipe) {
        return res.status(404).send({ message: "Recipe not found" });
      }
      res.json({ message: "Recipe successfully deleted!" });
    })
    .catch((error) => res.status(500).send(err));
});

export default router;
