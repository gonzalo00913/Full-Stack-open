import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./reducers/filterReducer";
import noteReducer from "./reducers/noteReducer";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

console.log("Estado de la Store", store.getState);
export default store;
