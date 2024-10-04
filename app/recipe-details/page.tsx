"use client";

import RecipesContext from "@/store/recipeContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RecipeDetailsPage = () => {
  const { recipe, setRecipe, addToFavorites, removeFromFavorites } =
    useContext(RecipesContext);
  const router = useRouter();

  useEffect(() => {
    if (!recipe) {
      const recipeFromLS = localStorage.getItem("recipeDetails");

      if (!recipeFromLS) {
        router.push("/");
      } else {
        setRecipe(JSON.parse(recipeFromLS));
      }
    }
  }, [recipe, setRecipe, router]);

  const addToFavorite = () => {
    if (!recipe) {
      return;
    }
    recipe.isFavorite = true;
    localStorage.setItem("recipeDetails", JSON.stringify(recipe));
    addToFavorites(recipe);
  };

  const removeFromFavorite = () => {
    if (!recipe) {
      return;
    }
    recipe.isFavorite = false;
    localStorage.setItem("recipeDetails", JSON.stringify(recipe));
    removeFromFavorites(recipe.id);
  };

  if (!recipe) {
    return (
      <div className="mt-16 w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className="px-6 flex flex-col py-16 max-w-[864px] mx-auto h-screen overflow-hidden  lg:flex-row lg:justify-between lg:px-0">
      <div className="w-full sm:w-3/4 mx-auto lg:w-[400px] lg:mx-0">
        <img
          src="https://images.pexels.com/photos/8725380/pexels-photo-8725380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="w-full mx-auto rounded-md"
        />

        <div className="mt-10 flex items-center justify-center ">
          <div>
            <h2 className="font-bold text-md">{recipe.name}</h2>
            <p className="mt-1">{recipe.cookingTime} min.</p>
          </div>

          {recipe.isFavorite ? (
            <FaHeart
              onClick={() => removeFromFavorite()}
              className="ms-auto my-auto me-4 text-xl text-appPurple cursor-pointer"
            />
          ) : (
            <FaRegHeart
              onClick={() => addToFavorite()}
              className="ms-auto my-auto me-4 text-xl text-gray-500 cursor-pointer"
            />
          )}
        </div>
      </div>

      <div className="w-full overflow-auto mx-auto mt-12 sm:w-3/4  lg:mt-0 lg:w-[400px] lg:mx-0">
        <div>
          <p>Ingredients:</p>
          <ul className="list-disc ps-5">
            {recipe.ingredients.map((instruction, idx) => (
              <li key={idx}>{instruction}</li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <p>Instructions:</p>
          <ol className="list-decimal  ps-5">
            {recipe.instructions.map((instruction, idx) => (
              <li className="mb-2" key={idx}>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default RecipeDetailsPage;
