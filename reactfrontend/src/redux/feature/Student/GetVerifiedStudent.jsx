import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const VerifiedStudent = createAsyncThunk(
  "items/unverfiedStudent",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}student/student/`
    );
    console.log(response);
    return response?.data;
  }
);

export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (newItem) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}student/student/`,
      newItem
    );
    console.log(response);
    return response?.data?.data;
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async (updatedItem) => {
    console.log(updatedItem);
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}student/student/`,
      updatedItem
    );
    // console.log(response);
    return response?.data?.data;
  }
);

export const deleteVerifiedStudent = createAsyncThunk(
  "items/deleteunverfiedStudent",
  async (deleteId) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}student/student/`,
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

const GetverifiedStudentSlice = createSlice({
  name: "verifiedstudent",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(VerifiedStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifiedStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(VerifiedStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteVerifiedStudent.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default GetverifiedStudentSlice.reducer;
