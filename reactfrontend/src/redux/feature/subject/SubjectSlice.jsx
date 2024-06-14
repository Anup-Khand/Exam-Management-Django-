import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubject = createAsyncThunk(
  "subject/fetchSubject",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}subject/subject/`
    );
    console.log(response);
    return response?.data;
  }
);

export const addSubject = createAsyncThunk(
  "subject/addSubject",
  async (uploadData) => {
    console.log(uploadData);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}subject/subject/`,
      uploadData
    );
    console.log(response);
    return response?.data?.data;
  }
);

export const updateSubject = createAsyncThunk(
  "subject/updateSubject",
  async (updatedItem) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}subject/subject/`,
      updatedItem
    );
    // console.log(response);
    return response?.data?.data;
  }
);

export const deleteSubject = createAsyncThunk(
  "subject/deleteSubject",
  async (deleteData) => {
    console.log(deleteData);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}subject/subject/`,
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

const SubjectSlice = createSlice({
  name: "subject",

  initialState: {
    items: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.sub_code === action.payload.sub_code
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.sub_code !== action.payload
        );
      });
  },
});

export default SubjectSlice.reducer;
