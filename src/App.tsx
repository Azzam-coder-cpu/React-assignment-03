// src/App.tsx
import AddRecipeForm from "./features/recipes/AddRecipeForm";
import RecipeList from "./features/recipes/recipeList"; // ✅ make sure filename is consistent
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6">
        📖 My Recipe Book
      </h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
