import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../app/store";
import { fetchRecipes, deleteRecipe } from "./recipeSlice";
import EditRecipeForm from "./EditRecipeForm";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error, apiFetched } = useSelector(
    (state: RootState) => state.recipes
  );
  const [editingRecipe, setEditingRecipe] = useState<any | null>(null);

  useEffect(() => {
    if (!apiFetched) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, apiFetched]);

  if (loading)
    return (
      <p className="text-center text-gray-500 font-medium mt-10">
        Loading recipes...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-600 font-medium mt-10">{error}</p>
    );
  if (list.length === 0)
    return (
      <p className="text-center text-gray-500 font-medium mt-10">
        No recipes added yet. Start by adding your first recipe!
      </p>
    );

  const displayedRecipes = list.slice(0, 6);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {displayedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1"
          >
            <Link to={`/recipes/${recipe.id}`} className="block relative">
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 truncate">
                  {recipe.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{recipe.category}</p>
              </div>
            </Link>

            <div className="p-5 flex gap-3">
              <button
                onClick={() => setEditingRecipe(recipe)}
                className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl font-semibold text-sm transition"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteRecipe(recipe.id))}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fadeIn">
            <EditRecipeForm
              recipe={editingRecipe}
              onClose={() => setEditingRecipe(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeList;
