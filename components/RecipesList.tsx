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
        {[...Array(5)].map((_, idx) => (
          <RecipeLoader key={idx}></RecipeLoader>
        ))}
      </div>
    );
  }
  return (
    <div>
      {recipes.map((recipe: Recipe, idx: number) => (
        <div key={idx}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
};

export default RecipesList;
