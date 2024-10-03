"use client";

import RecipesContext from "@/store/recipeContext";
import { notFound } from "next/navigation";
import { useContext } from "react";

const RecipeDetailsPage = () => {
  const { recipe } = useContext(RecipesContext);

  if (!recipe) {
    notFound();
  }

  return <div>{recipe?.name}</div>;
};

export default RecipeDetailsPage;
