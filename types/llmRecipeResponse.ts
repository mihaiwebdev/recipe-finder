export interface LlmRecipe {
  name: string;
  cookingTime: number;
  ingredients: string[];
  instructions: string[];
}
export interface LlmRecipeResponse {
  recipes: LlmRecipe[];
}
