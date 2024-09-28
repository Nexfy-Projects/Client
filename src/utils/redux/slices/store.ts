import { combineReducers } from "@reduxjs/toolkit";
import rootReducer from "./slice"; // スライスのパスを適宜調整

const store = combineReducers({
  reducer: rootReducer,
  // 必要に応じてミドルウェアを追加
});

export default store;
