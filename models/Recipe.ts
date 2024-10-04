import { Schema, model, models } from "mongoose";

const RecipeSchema = new Schema({
  id: String,
  name: String,
  cookingTime: Number,
  mealImage: String,
  isFavorite: Boolean,
  ingredients: [String],
  instructions: [String],
});

const Recipe = models.Recipe || model("Recipe", RecipeSchema);

export default Recipe;
