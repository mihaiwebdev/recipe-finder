"use client";
import { Recipe, RecipeResponse } from "@/models/recipeResponse";
import RecipesContext from "@/store/recipeContext";
import { useContext } from "react";
import RecipeCard from "./RecipeCard";
import RecipeLoader from "./RecipeLoader";

const RecipesList = ({ recipes }: RecipeResponse) => {
  const { isLoading } = useContext(RecipesContext);

  if (isLoading) {
    return (
      <div>
        <p className="mb-2">Searching for the best recipes...</p>
        {[...Array(5)].map((_, idx) => (
          <RecipeLoader key={idx}></RecipeLoader>
        ))}
      </div>
    );
  }
  return (
    <section id="recipe-list">
      {recipes.map((recipe: Recipe, idx: number) => (
        <div key={idx}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </section>
  );
};

export default RecipesList;
