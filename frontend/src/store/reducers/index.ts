import { combineReducers } from "redux";

import { taskAPI } from "../../services/taskAPI";
import { workerAPI } from "../../services/workerAPI";

import { authReducer } from "./auth/authReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    [taskAPI.reducerPath]: taskAPI.reducer,
    [workerAPI.reducerPath]: workerAPI.reducer,
});
