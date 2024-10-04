import { RecipeType } from "./recipeResponse";

export class RecipesContextType {
  constructor(
    public recipes: RecipeType[],
    public favoriteRecipes: RecipeType[],
    public recipe: RecipeType | undefined,
    public isLoading: boolean,
    public isFavoritesVisible: boolean,
    public mealDescription: string,
    public setMealDescription: (description: string) => void,
    public setRecipe: (recipe: RecipeType) => void,
    public setIsFavoritesVisible: (isFavoritesVisible: boolean) => void,
    public setIsLoading: (isLoading: boolean) => void,
    public setRecipes: (recipes: RecipeType[]) => void,
    public setFavoriteRecipes: (recipes: RecipeType[]) => void,
    public fetchRecipes: (description: string, excludedMeals: string[]) => void,
    public addToFavorites: (recipe: RecipeType) => void,
    public removeFromFavorites: (recipeID: string) => void
  ) {}
}
