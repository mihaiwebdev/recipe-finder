export interface Recipe {
  name: string;
  cookingTime: number;
  mealImage: string;
  ingredients: string[];
  instructions: string[];
}

export interface RecipeResponse {
  recipes: Recipe[];
}
