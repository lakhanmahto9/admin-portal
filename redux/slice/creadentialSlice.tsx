import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open:false,
    type:"Tutorial"
}

const openSlice = createSlice({
    name:"open",
    initialState,
    reducers:{
        openCredential(state,actions){
            state.open = true,
            state.type = actions.payload
        },
        closeCredential(state){
            state.open = false
        }
    },
})
export const { openCredential, closeCredential} = openSlice.actions;
export default openSlice.reducer