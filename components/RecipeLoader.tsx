const RecipeLoader = () => {
  return (
    <div className="w-full bg-gray-100 mb-4 cursor-pointer drop-shadow-xl rounded-xl flex animate-pulse">
      <div className="w-[88px] h-[88px] bg-gray-300 rounded-s-xl" />
      <div className="ms-3 py-1 flex-grow">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-300 rounded w-1/4" />
      </div>
      <div className="ms-auto my-auto me-4 w-5 h-5 bg-gray-300 rounded-full" />
    </div>
  );
};

export default RecipeLoader;
