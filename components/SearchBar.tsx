"use client";
import { ErrorResponse } from "@/models/errorResponse";
import { RecipeResponse } from "@/models/recipeResponse";
import RecipesContext from "@/store/recipeContext";
import { useContext, useState } from "react";
import { useAutosave } from "react-autosave";
import { IoClose, IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";

const SearchBar = () => {
  const [isFirstChange, setIsFirstChange] = useState(true);
  const {
    mealDescription,
    isLoading,
    setMealDescription,
    setIsLoading,
    setRecipes,
    setIsFavoritesVisible,
  } = useContext(RecipesContext);

  useAutosave({
    data: mealDescription,
    onSave: async (description) => {
      if (isFirstChange) {
        setIsFirstChange(false);
        return;
      }

      if (description.length < 3) {
        toast.warning("Please describe better what you would like to eat!");
        return;
      }

      fetchRecipes(description);
    },
    saveOnUnmount: false,
    interval: 1500,
  });

  const fetchRecipes = async (description: string) => {
    setIsLoading(true);
    setIsFavoritesVisible(false);

    try {
      const response = await fetch(
        `/api/recipes/search?description=${encodeURIComponent(description)}`
      );

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.errorMessage);
      }

      const data: RecipeResponse = await response.json();

      setRecipes(data.recipes);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to fetch recipes. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearInput = () => {
    if (!isLoading) {
      setIsFavoritesVisible(true);
      setMealDescription("");
    }
  };

  return (
    <div className="w-full relative">
      <input
        onChange={(e) => setMealDescription(e.target.value)}
        type="text"
        name="search"
        id="search"
        value={mealDescription}
        placeholder="What do you feel like eating?"
        className={`w-full rounded-full py-2 px-4 border border-gray-200 ${
          isLoading && "bg-gray-100"
        }`}
        disabled={isLoading}
      />
      <div className="absolute top-3 right-4 text-xl ">
        {mealDescription.length < 1 ? (
          <IoSearch />
        ) : (
          <IoClose
            className={`cursor-pointer ${isLoading && "cursor-default"}`}
            onClick={clearInput}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
