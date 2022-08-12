import { createSlice } from '@reduxjs/toolkit';
export interface CoreState {
  loading : boolean,
  error : null | 'string'
}

const initialState: CoreState = {
  loading : true,
  error: null
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setLoading:(state,action)=>{
        state.loading = action.payload
    },
    setError:(state,action)=>{
        state.error = action.payload
    }
  }
});

export const {setLoading,setError} = coreSlice.actions;


export default coreSlice.reducer;
