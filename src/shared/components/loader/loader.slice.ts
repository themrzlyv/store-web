import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  isLoading: boolean;
};

const initialState: ModalState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: "loaderSlice",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
