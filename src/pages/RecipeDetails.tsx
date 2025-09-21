// src/pages/RecipeDetails.tsx
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const recipe = useSelector((state: RootState) =>
    state.recipes.list.find((r) => r.id.toString() === id)
  );

  if (!recipe) {
    return <p className="text-center text-red-500">❌ Recipe not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg mt-6">
      {recipe.image && (
        <img src={recipe.image} alt={recipe.name} className="w-full h-60 object-cover rounded-lg" />
      )}
      <h1 className="text-2xl font-bold mt-4">{recipe.name}</h1>
      <p className="italic text-gray-600">{recipe.category}</p>
      <h3 className="mt-4 font-bold">Ingredients:</h3>
      <ul className="list-disc pl-6">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h3 className="mt-4 font-bold">Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetails;
