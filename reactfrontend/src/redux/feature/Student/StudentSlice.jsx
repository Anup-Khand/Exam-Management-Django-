import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import GetUnverifiedStudent from "./GetUnverifiedStudent";

export const VerifyStudent = createAsyncThunk(
  "items/DeleteStudent",
  async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}student/student/`,
      data
    );
    return response?.data;
  }
);

const StudentSlice = createSlice({
  name: "student",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(VerifyStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(VerifyStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default StudentSlice.reducer;
