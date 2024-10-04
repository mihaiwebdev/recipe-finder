export interface RecipeType {
  _id?: string;
  id: string;
  name: string;
  cookingTime: number;
  mealImage: string;
  ingredients: string[];
  instructions: string[];
  isFavorite?: boolean;
}

export interface RecipeResponse {
  recipes: RecipeType[];
}
