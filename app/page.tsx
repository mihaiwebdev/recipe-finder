import Recipes from "@/components/Recipes";
import SearchBar from "@/components/SearchBar";
import Recipe from "@/models/Recipe";
import connectDB from "@/util/db";

export default async function Home() {
  await connectDB();
  const favoriteRecipes = await Recipe.find({}).lean();

  return (
    <div className="w-full px-6 block mx-auto py-16 sm:w-96 sm:px-0">
      <SearchBar />

      <Recipes favoriteRecipesStr={JSON.stringify(favoriteRecipes)} />
    </div>
  );
}
