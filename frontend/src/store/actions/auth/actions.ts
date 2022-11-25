import axios, { AxiosError } from "axios";
import { createAction } from "@reduxjs/toolkit";

import { APIUser } from "../../../services/apiUser";
import { AuthActionTypes } from "./actionTypes";
import { IAuthSuccessPayload } from "./types";
import { AppDispatch, RootState } from "../../store";
import { IUserAPIProfileData } from "../../../services/types";
import { IAuthState } from "../../reducers/auth/types";

export const authLoading = createAction(AuthActionTypes.LOADING);

export const setAuthError = createAction<
    IAuthState["error"],
    AuthActionTypes.ERROR
>(AuthActionTypes.ERROR);

export const authSuccess = createAction(
    AuthActionTypes.SUCCESS,
    (payload: IAuthSuccessPayload) => ({
        payload: payload,
    })
);

export const authError =
    (error: IAuthState["error"]) => async (dispatch: AppDispatch) => {
        setTimeout(() => {
            dispatch(setAuthError(null));
        }, 5000);

        dispatch(setAuthError(error));
    };

export const logout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    return {
        type: AuthActionTypes.LOGOUT,
    };
};

export const login =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(authLoading());

        try {
            const response = await APIUser.postLogin(email, password);

            if (response.status === 200) {
                const accessToken = response.data["access"] as string;
                const refreshToken = response.data["refresh"] as string;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);

                await dispatch(getMyProfileData());
            } else {
                dispatch(authError(response.status));
            }
        } catch (err: AxiosError | any) {
            dispatch(authError(err.response.status));
        }
    };

export const getMyProfileData = () => async (dispatch: AppDispatch) => {
    dispatch(authLoading());

    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return dispatch(authError("Yon do not have accessToken"));
    }

    try {
        const response = await APIUser.getMyProfileData<IUserAPIProfileData>(
            accessToken
        );

        if (response.status === 200) {
            const profileData = APIUser.destructUserProfileData(response.data);
            dispatch(
                authSuccess({
                    ...profileData,
                    accessToken,
                    refreshToken,
                })
            );
        } else {
            dispatch(authError(response.status));
        }
    } catch (err: AxiosError | any) {
        if (err instanceof AxiosError) {
            dispatch(authError(err?.response?.status as number));
        } else {
            dispatch(authError(err.message));
        }
    }
};

export const refreshTokens =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        // dispatch(authLoading());

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            return {}; //dispatch(logout());
        }

        try {
            if (await APIUser.verifyToken(refreshToken)) {
                const { access, refresh } = await APIUser.refreshAccessToken(
                    refreshToken
                );

                if (access && refresh) {
                    localStorage.setItem("accessToken", access);
                    localStorage.setItem("refreshToken", refresh);

                    return {
                        access,
                        refresh,
                    };
                    // dispatch(
                    //     authSuccess({
                    //         ...getState().auth,
                    //         accessToken: access,
                    //         refreshToken: refresh,
                    //     })
                    // );
                }
            }
        } catch (err: AxiosError | any) {
            // dispatch(logout());

            if (err instanceof AxiosError) {
                dispatch(authError(err?.response?.status as number));
            } else {
                dispatch(authError(err.message));
            }
        }
    };

export const checkAuthStatus =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        const { accessToken, refreshToken } = refreshTokens();

        await dispatch(refreshTokens());
        await dispatch(getMyProfileData());

        if (getState().auth.isAuth) {
            setInterval(() => {
                dispatch(refreshTokens());
            }, 1000 * 60 * 5);
        }
    };
