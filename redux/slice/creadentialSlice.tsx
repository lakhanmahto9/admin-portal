import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open:false
}

const openSlice = createSlice({
    name:"open",
    initialState,
    reducers:{
        openCredential(state){
            state.open = true
        },
        closeCredential(state){
            state.open = false
        }
    },
})
export const { openCredential, closeCredential} = openSlice.actions;
export default openSlice.reducer