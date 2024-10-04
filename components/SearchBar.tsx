"use client";
import RecipesContext from "@/store/recipeContext";
import { useContext } from "react";
import { useAutosave } from "react-autosave";
import { IoClose, IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";

const SearchBar = () => {
  const {
    mealDescription,
    isLoading,
    setMealDescription,
    setIsFavoritesVisible,
    fetchRecipes,
  } = useContext(RecipesContext);

  useAutosave({
    data: mealDescription,
    onSave: async (description) => {
      if (description.length === 0) {
        setIsFavoritesVisible(true);
        return;
      }

      if (description.length < 3) {
        toast.warning("Please describe better what you would like to eat!");
        return;
      }

      fetchRecipes(description, []);
    },
    saveOnUnmount: false,
    interval: 1000,
  });

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
