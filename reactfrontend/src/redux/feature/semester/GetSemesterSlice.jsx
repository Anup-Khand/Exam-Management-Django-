import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSem = createAsyncThunk("semester/fetchSem", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}semester/semester/`
  );
  return response?.data;
});

export const addSemester = createAsyncThunk(
  "semester/PostSem",
  async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}semester/semester/`,
      data
    );
    console.log(response);
    return response?.data?.data;
  }
);
export const updateSemester = createAsyncThunk(
  "semester/updateSem",
  async (data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}semester/semester/`,
      data
    );
    console.log(response);
    return response?.data?.data;
  }
);
export const deleteSemester = createAsyncThunk(
  "semester/deleteSem",
  async (deleteData) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}semester/semester/`,
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

const SemesterSlice = createSlice({
  name: "semester",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSemester.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateSemester.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteSemester.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default SemesterSlice.reducer;
