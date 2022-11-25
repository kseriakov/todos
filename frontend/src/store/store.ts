import { configureStore } from "@reduxjs/toolkit";
import { chiefAPI } from "../services/chiefAPI";
import { taskAPI } from "../services/taskAPI";
import { workerAPI } from "../services/workerAPI";

import { rootReducer } from "./reducers";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            taskAPI.middleware,
            workerAPI.middleware,
            chiefAPI.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
