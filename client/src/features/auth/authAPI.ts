import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios ,AxiosError}  from "axios";

export const fetchUser = createAsyncThunk('auth/users',async (axios:Axios, { dispatch, requestId, getState, rejectWithValue, signal, extra })=>{
  try {
    const response = await axios.get('/auth/users/me/');
    return response.data
  } catch (error) {
    const err = error as AxiosError;
    rejectWithValue(err.response?.data)
  }
})