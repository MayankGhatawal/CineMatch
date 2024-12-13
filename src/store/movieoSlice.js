import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData : [],
    imageURL : ""
}

export const movieoSlice = createSlice({
    name : 'cinematch',
    initialState,
    reducers : {
        setBannerData : (state,action)=>{
            state.bannerData = action.payload
        },
        setImageURL : (state,action) =>{
            state.imageURL = action.payload
        }
    }
})

export const { setBannerData, setImageURL } = movieoSlice.actions


export default movieoSlice.reducer
