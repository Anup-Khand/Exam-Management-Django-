import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const UnVerifyStudent = createAsyncThunk(
  "items/getunverfiedStudent",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}student/unverified/`
    );
    console.log(response);
    return response?.data;
  }
);

export const verifyStudent = createAsyncThunk(
  "items/verifyStudent",
  async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}student/student/`,
      data
    );
    console.log(response);
    return response?.data?.data;
  }
);

export const updateUnverifiedStudent = createAsyncThunk(
  "unverfied/updateUnverified",
  async (updatedItem) => {
    console.log(updatedItem);
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}student/unverified/`,
      updatedItem
    );
    // console.log(response);
    return response?.data?.data;
  }
);
export const deleteUnVerifiedStudent = createAsyncThunk(
  "items/deleteunverfiedStudent",
  async (deleteId) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}student/unverified/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteId),
      }
    );
    const responseData = await response.json();
    return responseData?.data;
  }
);

const GetUnverifiedStudentSlice = createSlice({
  name: "unverifiedstudent",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UnVerifyStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UnVerifyStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(UnVerifyStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(verifyStudent.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateUnverifiedStudent.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteUnVerifiedStudent.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default GetUnverifiedStudentSlice.reducer;
