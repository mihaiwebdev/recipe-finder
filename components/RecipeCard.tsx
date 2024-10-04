"use client";
import RecipesContext from "@/store/recipeContext";
import { RecipeType } from "@/types/recipeResponse";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface RecipeProps {
  recipe: RecipeType;
}

const RecipeCard: React.FC<RecipeProps> = ({ recipe }) => {
  const { setRecipe, addToFavorites, removeFromFavorites } =
    useContext(RecipesContext);

  const setRecipeDetails = () => {
    setRecipe(recipe);
    localStorage.setItem("recipeDetails", JSON.stringify(recipe));
  };

  const addToFavorite = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    recipe.isFavorite = true;
    addToFavorites(recipe);
  };

  const removeFromFavorite = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    recipe.isFavorite = false;
    removeFromFavorites(recipe.id);
  };

  return (
    <Link
      href="recipe-details"
      onClick={setRecipeDetails}
      className="w-full bg-gray-100 mb-4 cursor-pointer drop-shadow-lg rounded-xl flex hover:scale-95 transition-transform"
    >
      <Image
        className="rounded-s-xl object-cover"
        width={88}
        height={88}
        alt="Meal Image"
        src={recipe.mealImage}
      />

      <div className="ms-3 py-1 w-2/3">
        <h2 className="font-bold text-md">{recipe.name}</h2>
        <p className="mt-1">{recipe.cookingTime} min.</p>
      </div>

      {recipe.isFavorite ? (
        <FaHeart
          onClick={removeFromFavorite}
          className="ms-auto my-auto me-4 text-xl text-appPurple"
        />
      ) : (
        <FaRegHeart
          onClick={addToFavorite}
          className="ms-auto my-auto me-4 text-xl text-gray-500"
        />
      )}
    </Link>
  );
};

export default RecipeCard;
