import { SideModalComponentType } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  isOpen: boolean;
  title: string | null;
  description: string | null;
  componentType: SideModalComponentType | null;
  componentProps: Record<string, unknown> | null;
};

type OpenModalPayload = {
  title?: string;
  description?: string;
  componentType: SideModalComponentType;
  componentProps: Record<string, unknown> | null;
};

const initialState: ModalState = {
  isOpen: false,
  title: null,
  description: null,
  componentType: null,
  componentProps: null,
};

const sideModalSlice = createSlice({
  name: "sideModal",
  initialState,
  reducers: {
    openSideModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.isOpen = true;
      state.title = action.payload.title || null;
      state.description = action.payload.description || null;
      state.componentType = action.payload.componentType;
      state.componentProps = action.payload.componentProps || null;
    },
    closeSideModal: state => {
      state.isOpen = false;
      state.title = null;
      state.description = null;
      state.componentType = null;
      state.componentProps = null;
    },
  },
});

export const { openSideModal, closeSideModal } = sideModalSlice.actions;
export default sideModalSlice.reducer;
