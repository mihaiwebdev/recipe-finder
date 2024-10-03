import { Recipe } from "./recipeResponse";

export interface RecipesContextType {
  recipes: Recipe[];
  recipe: Recipe | undefined;
  isLoading: boolean;
  isFavoritesVisible: boolean;
  mealDescription: string;
  setMealDescription: (description: string) => void;
  setRecipe: (recipe: Recipe) => void;
  setIsFavoritesVisible: (isFavoritesVisible: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setRecipes: (recipes: Recipe[]) => void;
}
