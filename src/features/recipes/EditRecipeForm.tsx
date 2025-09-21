// src/features/recipes/EditRecipeForm.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { type Recipe, updateRecipe } from "./recipeSlice";
import { type AppDispatch } from "../../app/store";

interface EditRecipeFormProps {
  recipe: Recipe;
  onClose: () => void; // callback to close the edit form
}

const EditRecipeForm = ({ recipe, onClose }: EditRecipeFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(", "));
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [image, setImage] = useState(recipe.image || "");
  const [category, setCategory] = useState(recipe.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedRecipe: Recipe = {
      ...recipe,
      name,
      ingredients: ingredients.split(",").map((ing) => ing.trim()),
      instructions,
      image,
      category,
    };

    dispatch(updateRecipe(updatedRecipe));
    onClose(); // ✅ close form after saving
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-center">✏️ Edit Recipe</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option>Main Course</option>
        <option>Snack</option>
        <option>Dessert</option>
        <option>Drink</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;
