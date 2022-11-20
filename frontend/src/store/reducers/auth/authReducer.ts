import { createReducer } from "@reduxjs/toolkit";

import * as actions from "../../actions/auth/actions";
import { AuthActionTypes } from "../../actions/auth/actionTypes";
import { IAuthState } from "./types";

const initialState: IAuthState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    birthdate: null,
    isChief: false,
    position: null,
    loading: false,
    error: null,
    isAuth: false,
    accessToken: null,
    refreshToken: null,
    tasks: null,
};

export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.authLoading, (state: IAuthState, action) => {
            // В createReducer можно изменять состояние напрямую
            state.loading = true;
        })
        .addCase(actions.setAuthError, (state: IAuthState, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(actions.authSuccess, (state: IAuthState, action) => {
            return {
                ...state,
                ...action.payload,
                loading: false,
                isAuth: true,
            };
        })
        .addCase(AuthActionTypes.LOGOUT, (state: IAuthState, action) => {
            return initialState;
        });
});
