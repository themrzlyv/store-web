import { authApi } from "@/modules/auth/infra/auth.api";
import { bioApi } from "@/modules/bio/infra/bio.api";
import { postApi } from "@/modules/blog/infra/post.api";
import { experienceApi } from "@/modules/experiences/infra/experience.api";
import { projectApi } from "@/modules/projects/infra/project.api";
import { userApi } from "@/modules/user/infra/user.api";
import sideModalReducer from "@/shared/components/side-modal/side-modal.slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    sideModal: sideModalReducer,

    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [experienceApi.reducerPath]: experienceApi.reducer,
    [bioApi.reducerPath]: bioApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      postApi.middleware,
      projectApi.middleware,
      experienceApi.middleware,
      bioApi.middleware,
    ]),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
