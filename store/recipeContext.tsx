"use client";
import { RecipesContextType } from "@/types/recipesContextType";
import { RecipeType, RecipeResponse } from "@/types/recipeResponse";
import { createContext, ReactNode, useState } from "react";
import { ErrorResponse } from "@/types/errorResponse";
import { toast } from "react-toastify";

const initialRecipesCtxState = new RecipesContextType(
  [],
  [],
  undefined,
  false,
  true,
  "",
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {}
);

const RecipesContext = createContext<RecipesContextType>(
  initialRecipesCtxState
);

export const RecipesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [mealDescription, setMealDescription] = useState("");
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeType[]>([]);
  const [recipe, setRecipe] = useState<RecipeType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(true);

  const fetchRecipes = async (description: string) => {
    setIsLoading(true);
    setIsFavoritesVisible(false);

    try {
      const response = await fetch(
        `/api/recipes/search?description=${encodeURIComponent(description)}`
      );

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.errorMessage);
      }

      const data: RecipeResponse = await response.json();

      setRecipes(data.recipes);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to fetch recipes. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = async (recipe: RecipeType) => {
    setFavoriteRecipes((value) => [...value, recipe]);
    try {
      const response = await fetch(`/api/recipes/favorites`, {
        method: "POST",
        body: JSON.stringify({ recipe }),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to add to favorites. Please try again.");
      }
    }
  };

  const removeFromFavorites = async (recipeID: string) => {
    setFavoriteRecipes((value) => [
      ...value.filter((recipe) => recipe.id !== recipeID),
    ]);

    try {
      const response = await fetch(`/api/recipes/favorites`, {
        method: "DELETE",
        body: JSON.stringify({ recipeID }),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to add to favorites. Please try again.");
      }
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        isLoading,
        isFavoritesVisible,
        recipe,
        favoriteRecipes,
        mealDescription,
        setMealDescription,
        setRecipe,
        setFavoriteRecipes,
        setIsFavoritesVisible,
        setIsLoading,
        setRecipes,
        fetchRecipes,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContext;
