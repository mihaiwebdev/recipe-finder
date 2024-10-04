"use client";
import RecipesList from "@/components/RecipesList";
import RecipesContext from "@/store/recipeContext";
import { useContext } from "react";

const Recipes = () => {
  const {
    isFavoritesVisible,
    isFavoritesLoading,
    recipes,
    favoriteRecipes,
    isLoading,
    mealDescription,
    fetchRecipes,
  } = useContext(RecipesContext);

  const handleFetchRecipes = () => {
    const excludedRecipes = recipes.map((recipe) => recipe.name);
    fetchRecipes(mealDescription, excludedRecipes);
  };

  return (
    <div className="mt-16">
      {isFavoritesVisible ? (
        <h1 className="font-extrabold text-3xl mb-4">Favorites</h1>
      ) : (
        <h1 className="font-extrabold text-3xl mb-4">Suggested recipes</h1>
      )}

      {isFavoritesLoading && (
        <p className="mb-2 animate-bounce">Fetching favorite recipes...</p>
      )}
      {isFavoritesVisible &&
        !isFavoritesLoading &&
        favoriteRecipes.length < 1 && (
          <p>Right now, you don&apos;t have any favorite recipe.</p>
        )}

      {isFavoritesVisible ? (
        <RecipesList recipes={favoriteRecipes} />
      ) : (
        <RecipesList recipes={recipes} />
      )}
      {recipes && !isFavoritesVisible && !isLoading && (
        <button
          onClick={handleFetchRecipes}
          className="bg-appPurple text-white px-8 mx-auto block mt-10 rounded-lg py-3 hover:scale-95 transition-transform"
        >
          I don&apos;t like these
        </button>
      )}
    </div>
  );
};

export default Recipes;
