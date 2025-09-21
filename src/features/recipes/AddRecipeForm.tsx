// src/features/recipes/AddRecipeForm.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe, type Recipe } from "./recipeSlice";
import { type AppDispatch } from "../../app/store";

const AddRecipeForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Main Course");

  const generateId = () => {
    return Date.now(); // unique number
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !ingredients || !instructions) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    const newRecipe: Recipe = {
      id: generateId(),
      name,
      ingredients: ingredients.split(",").map((ing) => ing.trim()),
      instructions,
      image,
      category,
    };

    dispatch(addRecipe(newRecipe));

    // reset form
    setName("");
    setIngredients("");
    setInstructions("");
    setImage("");
    setCategory("Main Course");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">➕ Add New Recipe</h2>

      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />

      <textarea
        placeholder="Cooking Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        type="text"
        placeholder="Image URL (optional)"
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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
