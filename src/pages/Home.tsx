import RecipeList from "../features/recipes/recipeList";
import AddRecipeForm from "../features/recipes/AddRecipeForm";

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🍳 Recipe Book</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
};

export default Home;
