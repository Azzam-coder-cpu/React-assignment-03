import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../app/store";
import { deleteRecipe, type Recipe } from "../features/recipes/recipeSlice";
import EditRecipeForm from "../features/recipes/EditRecipeForm";
import { useState } from "react";

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);

  const recipe = useSelector((state: RootState) =>
    state.recipes.list.find((r) => r.id.toString() === id)
  );

  if (!recipe) {
    return (
      <p className="text-center text-red-600 font-medium mt-10">
        Recipe not found
      </p>
    );
  }

  const handleDelete = () => {
    dispatch(deleteRecipe(recipe.id));
    navigate("/"); // redirect to home
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-2xl mt-10 border border-gray-200">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold text-gray-800">{recipe.name}</h1>
      <p className="text-gray-500 mt-1">{recipe.category}</p>

      <h3 className="mt-6 font-semibold text-lg">Ingredients</h3>
      <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h3 className="mt-6 font-semibold text-lg">Instructions</h3>
      <p className="text-gray-700 mt-2 leading-relaxed">{recipe.instructions}</p>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit Recipe
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Recipe
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
            <EditRecipeForm
              recipe={recipe as Recipe}
              onClose={() => setEditing(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
