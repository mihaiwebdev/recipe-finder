"use client";
import RecipesContext from "@/store/recipeContext";
import { RecipeType } from "@/types/recipeResponse";
import { useContext } from "react";
import RecipeCard from "./RecipeCard";
import RecipeLoader from "./RecipeLoader";

interface RecipeListProps {
  recipes: RecipeType[];
}
const RecipesList: React.FC<RecipeListProps> = ({ recipes }) => {
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
      {recipes.map((recipe: RecipeType, idx: number) => (
        <div key={idx}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </section>
  );
};

export default RecipesList;
