import Recipes from "@/components/Recipes";
import SearchBar from "@/components/SearchBar";

export default async function Home() {
  return (
    <div className="w-full px-6 block mx-auto py-16 sm:w-96 sm:px-0">
      <SearchBar />

      <Recipes />
    </div>
  );
}
