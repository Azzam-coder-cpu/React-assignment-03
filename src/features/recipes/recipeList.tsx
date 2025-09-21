import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../app/store";
import { fetchRecipes, deleteRecipe } from "./recipeSlice";
import EditRecipeForm from "./EditRecipeForm";

const RecipeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error, apiFetched } = useSelector(
    (state: RootState) => state.recipes
  );
  const [editingRecipe, setEditingRecipe] = useState<any | null>(null);

  // Fetch API recipes only once
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

  // Display up to 6 items (API + local)
  const displayedRecipes = list.slice(0, 6);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {displayedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition"
          >
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {recipe.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{recipe.category}</p>

              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">Ingredients:</p>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="font-medium mt-2">Instructions:</p>
                <p>{recipe.instructions}</p>
              </div>

              <div className="mt-auto flex gap-2 pt-4">
                <button
                  onClick={() => setEditingRecipe(recipe)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteRecipe(recipe.id))}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
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
