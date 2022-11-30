import { AxiosError } from "axios";
import { createAction } from "@reduxjs/toolkit";

import { APIUser } from "../../../services/apiUser";
import { AuthActionTypes } from "./actionTypes";
import { IAuthSuccessPayload } from "./types";
import { AppDispatch, RootState } from "../../store";
import { IUserAPIProfileData } from "../../../services/types";
import { IAuthState } from "../../reducers/auth/types";
import { IUser } from "../../../models/user";

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

                const profileDate = await getMyProfileData(accessToken);
                dispatch(
                    authSuccess({ ...profileDate, accessToken, refreshToken })
                );
            } else {
                dispatch(authError(response.status));
            }
        } catch (err: AxiosError | any) {
            console.log(err.response.status);
            dispatch(authError(err.response.status));
        }
    };

export const getMyProfileData = async (accessToken: string): Promise<IUser> => {
    const response = await APIUser.getMyProfileData<IUserAPIProfileData>(
        accessToken
    );

    if (response.status === 200) {
        const profileData = APIUser.destructUserProfileData(response.data);
        return profileData;
    } else {
        throw new Response("", {
            status: response.status,
            statusText: response.statusText,
        });
    }
};

export const refreshTokens = async (): Promise<{
    access?: string;
    refresh?: string;
}> => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        return {};
    }

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
        }
    }
    return {};
};

export const updateTokensOnInterval =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        const update = setInterval(async () => {
            if (getState().auth.isAuth) {
                const { refresh, access } = await refreshTokens();
                dispatch(
                    updateAuthState({
                        accessToken: access,
                        refreshToken: refresh,
                    })
                );
            } else {
                clearInterval(update);
                dispatch(logout());
            }
        }, 1000 * 60 * 10);
    };

export const updateAuthState =
    (data: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(authSuccess({ ...getState(), ...data }));
    };

export const checkAuthStatus = () => async (dispatch: AppDispatch) => {
    dispatch(authLoading());

    try {
        const { access: accessToken, refresh: refreshToken } =
            await refreshTokens();

        if (!accessToken || !refreshToken) {
            return dispatch(
                authError("Error in request does not catch, not tokens")
            );
        }

        const profileData = await getMyProfileData(accessToken);

        dispatch(
            updateAuthState({ ...profileData, accessToken, refreshToken })
        );

        dispatch(updateTokensOnInterval());
    } catch (err: AxiosError | any) {
        dispatch(logout());

        if (err instanceof AxiosError) {
            dispatch(authError(err?.response?.status as number));
        } else {
            dispatch(authError(err.message));
        }
    }
};
