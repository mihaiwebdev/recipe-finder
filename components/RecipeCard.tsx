"use client";
import { Recipe } from "@/models/recipeResponse";
import RecipesContext from "@/store/recipeContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { setRecipe } = useContext(RecipesContext);

  const addRecipe = () => {
    setRecipe(recipe);
    localStorage.setItem("recipeDetails", JSON.stringify(recipe));
  };

  return (
    <Link
      href="recipe-details"
      onClick={addRecipe}
      className="w-full bg-gray-100 mb-4 cursor-pointer drop-shadow-lg rounded-xl flex"
    >
      <img
        className="rounded-s-xl w-[88px] h-[88px] object-cover"
        alt="Recipe Image"
        src="https://images.pexels.com/photos/19224336/pexels-photo-19224336/free-photo-of-market-stalls-in-street-of-palermo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <div className="ms-3 py-1">
        <h2 className="font-bold text-md">{recipe.name}</h2>
        <p className="mt-1">{recipe.cookingTime} min.</p>
      </div>

      {isFavorite ? (
        <FaHeart className="ms-auto my-auto me-4 text-xl text-purple-900" />
      ) : (
        <FaRegHeart className="ms-auto my-auto me-4 text-xl text-gray-500" />
      )}
    </Link>
  );
};

export default RecipeCard;
