"use client";
import { RecipesContextType } from "@/models/recipesContextType";
import { Recipe } from "@/models/recipeResponse";
import { createContext, ReactNode, useState } from "react";

const initialRecipesCtxState: RecipesContextType = {
  recipes: [],
  recipe: undefined,
  isLoading: false,
  isFavoritesVisible: true,
  mealDescription: "",
  setMealDescription: () => {},
  setIsFavoritesVisible: () => {},
  setIsLoading: () => {},
  setRecipes: () => {},
  setRecipe: () => {},
};

const RecipesContext = createContext<RecipesContextType>(
  initialRecipesCtxState
);

export const RecipesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [mealDescription, setMealDescription] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(true);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        isLoading,
        isFavoritesVisible,
        recipe,
        mealDescription,
        setMealDescription,
        setRecipe,
        setIsFavoritesVisible,
        setIsLoading,
        setRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContext;
