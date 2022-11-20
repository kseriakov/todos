import { IAuthState } from "../../reducers/auth/types";
import { AuthActionTypes } from "./actionTypes";

export type IAuthSuccessPayload = Omit<
    IAuthState,
    "loading" | "error" | "isAuth"
>;

// export interface IAuthSuccess {
//     type: AuthActionTypes.SUCCESS;
//     payload: IAuthSuccessPayload;
// }

// export interface IAuthError {
//     type: AuthActionTypes.ERROR;
//     payload: IAuthState["error"];
// }

// export interface IAuthLoading {
//     type: AuthActionTypes.LOADING;
// }

// export type IAuthActions = IAuthSuccess | IAuthLoading | IAuthError;

