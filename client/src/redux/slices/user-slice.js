import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const LoginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const UserSlice = createSlice({
    name : "user",
    reducers: {},
    initialState : {
        error : null , loading : false ,  user: null
    },
    extraReducers : (builder) => {
        builder
        .addCase(RegisterUser.pending , (state) => {
            state.loading = true ; 
        })
        .addCase(RegisterUser.fulfilled , (state, action) => {
            state.loading = false ;
            state.user = action.payload ;
        })
        .addCase(RegisterUser.rejected , (state, action) => {
            state.loading = false ;
            state.error = action.payload ;
        })
        .addCase(LoginUser.pending , (state) => {
            state.loading = true ; 
        })
        .addCase(LoginUser.fulfilled , (state, action) => {
            state.loading = false ;
            state.user = action.payload ;
        })
        .addCase(LoginUser.rejected , (state, action) => {
            state.loading = false ;
            state.error = action.payload ;
        })
    }
});


export default UserSlice.reducer;