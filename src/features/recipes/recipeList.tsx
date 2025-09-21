// src/features/recipes/RecipeList.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../app/store";
import { fetchRecipes, deleteRecipe } from "./recipeSlice";

const RecipeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (loading) return <p className="text-center">⏳ Loading recipes...</p>;
  if (error) return <p className="text-center text-red-500">❌ {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {list.map((recipe) => (
        <div key={recipe.id} className="bg-white rounded-xl shadow p-4">
          {recipe.image && (
            <img src={recipe.image} alt={recipe.name} className="w-full h-40 object-cover rounded-lg" />
          )}
          <h2 className="text-xl font-bold mt-2">{recipe.name}</h2>
          {/* <p className="text-sm italic text-gray-600">{recipe.cuisine}</p> */}

          <button
            onClick={() => dispatch(deleteRecipe(recipe.id))}
            className="mt-3 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
