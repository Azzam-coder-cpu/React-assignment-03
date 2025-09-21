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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ingredients || !instructions) return;

    const newRecipe: Recipe = {
      id: Date.now(),
      name,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions,
      image,
      category,
    };

    dispatch(addRecipe(newRecipe));

    // Reset form
    setName(""); setIngredients(""); setInstructions(""); setImage(""); setCategory("Main Course");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-4 rounded-lg shadow border space-y-2">
      <h2 className="text-lg font-semibold text-gray-800 text-center">Add Recipe</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full border px-2 py-1 text-sm rounded focus:ring focus:ring-blue-300" />
      <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" className="w-full border px-2 py-1 text-sm rounded focus:ring focus:ring-blue-300" />
      <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" rows={2} className="w-full border px-2 py-1 text-sm rounded focus:ring focus:ring-blue-300" />
      <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" className="w-full border px-2 py-1 text-sm rounded focus:ring focus:ring-blue-300" />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border px-2 py-1 text-sm rounded focus:ring focus:ring-blue-300">
        <option>Main Course</option>
        <option>Snack</option>
        <option>Dessert</option>
        <option>Drink</option>
      </select>

      <button type="submit" className="w-full bg-blue-600 text-white text-sm py-1.5 rounded hover:bg-blue-700">Save</button>
    </form>
  );
};

export default AddRecipeForm;
