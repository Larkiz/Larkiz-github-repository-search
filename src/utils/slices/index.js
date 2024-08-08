import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "./repoSlice/repo.js";

// иницилизация стора
export default configureStore({
  reducer: {
    repos: reposReducer,
  },
});
