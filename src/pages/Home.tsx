import RecipeList from "../features/recipes/recipeList";
import AddRecipeForm from "../features/recipes/AddRecipeForm";

const Home = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Recipe Book
      </h1>
      <div className="max-w-5xl mx-auto space-y-8">
        <AddRecipeForm />
        <RecipeList />
      </div>
    </div>
  );
};

export default Home;
