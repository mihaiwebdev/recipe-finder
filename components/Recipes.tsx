"use client";
import RecipesList from "@/components/RecipesList";
import RecipesContext from "@/store/recipeContext";
import { RecipeType } from "@/types/recipeResponse";
import { useContext, useEffect, useRef, useState } from "react";

interface RecipesProps {
  favoriteRecipesStr: string;
}

const Recipes: React.FC<RecipesProps> = ({ favoriteRecipesStr }) => {
  const {
    isFavoritesVisible,
    recipes,
    favoriteRecipes,
    isLoading,
    mealDescription,
    fetchRecipes,
    setFavoriteRecipes,
  } = useContext(RecipesContext);
  const [displayedRecipes, setDisplayedRecipes] = useState<RecipeType[]>([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && favoriteRecipes.length === 0) {
      const serializedRecipes: RecipeType[] = JSON.parse(favoriteRecipesStr);
      setFavoriteRecipes(serializedRecipes);
      initializedRef.current = true;
    }
  }, [setFavoriteRecipes, favoriteRecipesStr, favoriteRecipes]);

  useEffect(() => {
    if (isFavoritesVisible) {
      setDisplayedRecipes(favoriteRecipes);
    } else {
      setDisplayedRecipes(recipes);
    }
  }, [setDisplayedRecipes, isFavoritesVisible, recipes, favoriteRecipes]);

  return (
    <div className="mt-16">
      {isFavoritesVisible ? (
        <h1 className="font-extrabold text-3xl mb-4">Favorites</h1>
      ) : (
        <h1 className="font-extrabold text-3xl mb-4">Suggested recipes</h1>
      )}

      {isFavoritesVisible && favoriteRecipes.length < 1 && (
        <p>Right now, you don&apos;t have any favorite recipe.</p>
      )}

      <RecipesList recipes={displayedRecipes} />
      {recipes && !isFavoritesVisible && !isLoading && (
        <button
          onClick={() => fetchRecipes(mealDescription)}
          className="bg-appPurple text-white px-8 mx-auto block mt-10 rounded-lg py-3 hover:scale-95 transition-transform"
        >
          I don&apos;t like these
        </button>
      )}
    </div>
  );
};

export default Recipes;
