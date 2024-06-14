import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchYear = createAsyncThunk("items/fetchYear", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}year/year/`
  );
  return response?.data;
});

export const addYear = createAsyncThunk("items/addYear", async (addItems) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}year/year/`,
    addItems
  );
  return response?.data?.data;
});

export const updateYear = createAsyncThunk(
  "items/updateYear",
  async (updatedItems) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}year/year/`,
      updatedItems
    );
    return response?.data?.data;
  }
);

export const deleteYear = createAsyncThunk("items/deleteYear", async (deleteData) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}year/year/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteData),
    }
  );
  const responseData = await response.json();
  return responseData?.data;
});

const GetYearSlice = createSlice({
  name: "getyear",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYear.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addYear.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateYear.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteYear.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default GetYearSlice.reducer;
