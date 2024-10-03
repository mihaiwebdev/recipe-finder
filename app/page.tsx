"use client";
import RecipesList from "@/components/RecipesList";
import SearchBar from "@/components/SearchBar";
import RecipesContext from "@/store/recipeContext";
import { useContext } from "react";

export default function Home() {
  const { isFavoritesVisible, recipes } = useContext(RecipesContext);

  return (
    <div className="w-full px-6 block mx-auto my-16 sm:w-96 sm:px-0">
      <SearchBar />

      <div className="mt-16">
        {isFavoritesVisible ? (
          <h1 className="font-extrabold text-3xl mb-3">Favorites</h1>
        ) : (
          <h1 className="font-extrabold text-3xl mb-3">Suggested recipes</h1>
        )}

        {isFavoritesVisible && recipes.length < 1 && (
          <p>Right now, you don&apos;t have any favorite recipe.</p>
        )}

        <RecipesList recipes={recipes} />
      </div>
    </div>
  );
}
