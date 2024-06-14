import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const PostUnVerifyStudent = createAsyncThunk(
  "items/postunverfiedStudent",
    async (data) => {
      console.log(data)
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}student/unverified/`,
      data
    );
    console.log(response);
    return response?.data;
  }
);

const PostUnverifiedStudentSlice = createSlice({
  name: "postunverifiedstudent",
  initialState: {
    postitems: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostUnVerifyStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PostUnVerifyStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.postitems = action.payload;
      })
      .addCase(PostUnVerifyStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default PostUnverifiedStudentSlice.reducer;
