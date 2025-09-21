import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  apiFetched: boolean;
}

const initialState: RecipeState = {
  list: [],
  loading: false,
  error: null,
  apiFetched: false,
};

// Fetch only 6 API recipes
export const fetchRecipes = createAsyncThunk("recipes/fetchAll", async () => {
  const response = await axios.get("https://dummyjson.com/recipes");
  return (response.data.recipes as Recipe[]).slice(0, 6);
});

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.list.unshift(action.payload); // new recipes on top
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.list.findIndex(r => r.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteRecipe: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(r => r.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.apiFetched) {
          // Add API recipes only once
          state.list = [...state.list, ...action.payload];
          state.apiFetched = true;
        }
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recipes";
      });
  },
});

export const { addRecipe, updateRecipe, deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
