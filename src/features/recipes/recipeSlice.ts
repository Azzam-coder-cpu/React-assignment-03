// src/features/recipes/recipeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// src/features/recipes/recipeSlice.ts
export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  category?: string;
}


interface RecipeState {
  list: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  list: [],
  loading: false,
  error: null,
};

// ✅ Fetch all recipes
export const fetchRecipes = createAsyncThunk("recipes/fetchAll", async () => {
  const response = await axios.get("https://dummyjson.com/recipes");
  return response.data.recipes as Recipe[];
});

// ✅ Add recipe
export const addRecipe = createAsyncThunk(
  "recipes/add",
  async (newRecipe: Omit<Recipe, "id">) => {
    const response = await axios.post("https://dummyjson.com/recipes/add", newRecipe);
    return response.data as Recipe;
  }
);

// ✅ Update recipe
export const updateRecipe = createAsyncThunk(
  "recipes/update",
  async (updatedRecipe: Recipe) => {
    const response = await axios.put(
      `https://dummyjson.com/recipes/${updatedRecipe.id}`,
      updatedRecipe
    );
    return response.data as Recipe;
  }
);

// ✅ Delete recipe
export const deleteRecipe = createAsyncThunk(
  "recipes/delete",
  async (id: number) => {
    await axios.delete(`https://dummyjson.com/recipes/${id}`);
    return id;
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch recipes";
    });

    // Add
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });

    // Update
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      const index = state.list.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    });

    // Delete
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      state.list = state.list.filter((r) => r.id !== action.payload);
    });
  },
});

export default recipeSlice.reducer;
