import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../app/store";
import { deleteRecipe, type Recipe } from "../features/recipes/recipeSlice";
import EditRecipeForm from "../features/recipes/EditRecipeForm";
import { useState } from "react";

function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);

  const recipes = useSelector((state: RootState) => state.recipes.list);
  const item = recipes.find((r) => r.id.toString() === id);

  if (!item) {
    return (
      <p className="text-center text-red-600 font-medium mt-10">
        Recipe not found
      </p>
    );
  }

  const handleDelete = () => {
    dispatch(deleteRecipe(item.id));
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl mt-12 overflow-hidden border border-gray-200">
      {item.image && (
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <h1 className="absolute bottom-4 left-6 text-3xl font-bold text-white drop-shadow-lg">
            {item.name}
          </h1>
        </div>
      )}

      <div className="p-8">
        {item.category && (
          <p className="text-gray-500 font-medium mb-4">{item.category}</p>
        )}

        {item.ingredients && (
          <>
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
              {item.ingredients.map((ing: string, i: number) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </>
        )}

        {item.instructions && (
          <>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <p className="text-gray-700 leading-relaxed">{item.instructions}</p>
          </>
        )}

        <div className="mt-8 flex gap-4 flex-wrap">
          <button
            onClick={() => setEditing(true)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-2xl font-semibold transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-2xl font-semibold transition"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-2xl font-semibold transition"
          >
            Back
          </button>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fadeIn">
            <EditRecipeForm recipe={item as Recipe} onClose={() => setEditing(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
