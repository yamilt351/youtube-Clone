import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchError: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.currentVideo.like.includes(action.payload)) {
        state.currentVideo.like.push(action.payload);
        state.currentVideo.dislike.splice(
          state.currentVideo.dislike.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo.dislike.includes(action.payload)) {
        state.currentVideo.dislike.push(action.payload);
        state.currentVideo.like.splice(
          state.currentVideo.like.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError,dislike,like } = videoSlice.actions;

export default videoSlice.reducer;
