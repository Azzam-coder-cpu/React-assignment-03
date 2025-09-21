// src/features/recipes/EditRecipeForm.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { type Recipe, updateRecipe } from "./recipeSlice";
import { type AppDispatch } from "../../app/store";

interface EditRecipeFormProps {
  recipe: Recipe;
  onClose: () => void;
}

const EditRecipeForm = ({ recipe, onClose }: EditRecipeFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(", "));
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [image, setImage] = useState(recipe.image || "");
  const [category, setCategory] = useState(recipe.category || "Main Course");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch the update action
    dispatch(
      updateRecipe({
        ...recipe,
        name,
        ingredients: ingredients.split(",").map((i) => i.trim()),
        instructions,
        image,
        category,
      })
    );
    onClose(); // close modal
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-white p-4 rounded-lg shadow border space-y-2"
    >
      <h2 className="text-lg font-semibold text-gray-800 text-center">
        ✏️ Edit Recipe
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Recipe Name"
        className="w-full border px-2 py-1 text-sm rounded focus:ring focus:ring-green-300"
      />

      <input
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (comma separated)"
        className="w-full border px-2 py-1 text-sm rounded focus:ring focus:ring-green-300"
      />

      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
        rows={3}
        className="w-full border px-2 py-1 text-sm rounded focus:ring focus:ring-green-300"
      />

      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
        className="w-full border px-2 py-1 text-sm rounded focus:ring focus:ring-green-300"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border px-2 py-1 text-sm rounded focus:ring focus:ring-green-300"
      >
        <option>Main Course</option>
        <option>Snack</option>
        <option>Dessert</option>
        <option>Drink</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white text-sm py-1.5 rounded hover:bg-green-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-300 text-sm py-1.5 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;
