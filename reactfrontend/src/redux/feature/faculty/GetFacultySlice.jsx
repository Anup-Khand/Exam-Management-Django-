import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk("items/fetchfaculty", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}faculty/faculty/`
  );
  // console.log(response);
  return response?.data;
});

export const addFaculty = createAsyncThunk("items/addItem", async (newItem) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}faculty/faculty/`,
    newItem
  );
  console.log(response);
  return response?.data?.data;
});

export const updateFaculty = createAsyncThunk(
  "items/updateFaculty",
  async (updatedItem) => {
    console.log(updatedItem);
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}faculty/faculty/`,
      updatedItem
    );
    // console.log(response);
    return response?.data?.data;
  }
);

export const deleteFaculty = createAsyncThunk(
  "items/deleteFaculty",
  async (deleteData) => {
    console.log(deleteData);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}faculty/faculty/`,
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
  }
);

const GetFacultySlice = createSlice({
  name: "getfaculty",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addFaculty.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateFaculty.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteFaculty.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default GetFacultySlice.reducer;
