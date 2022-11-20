import axios from "axios";
import { IUser } from "../models/user";
import { API } from "./api";
import { IUserAPIProfileData } from "./types";

export class APIUser {
    static REGISTER = `${API.HOST}/api/v1/users/`;
    static LOGIN = `${API.HOST}/api/v1/auth/jwt/create/`;
    static VERIFY_TOKEN = `${API.HOST}/api/v1/auth/jwt/verify/`;
    static REFRESH_ACCESS_TOKEN = `${API.HOST}/api/v1/auth/jwt/refresh/`;
    static MY_PROFILE = `${API.HOST}/api/v1/auth/users/me/`;

    static async postLogin(email: string, password: string) {
        return await axios.post(this.LOGIN, { email, password });
    }

    static async getMyProfileData<IUserProfileData>(accessToken: string) {
        return await axios.get<IUserProfileData>(
            this.MY_PROFILE,
            this.setTokenInHeaders(accessToken)
        );
    }

    static destructUserProfileData(profileData: IUserAPIProfileData): IUser {
        return {
            id: profileData.id,
            email: profileData.email,
            firstName: profileData.first_name,
            lastName: profileData.last_name,
            isChief: profileData.is_chief,
            birthdate: profileData.birthdate,
            position: profileData.position,
            tasks: profileData.tasks,
        };
    }

    static setTokenInHeaders(token: string | null = null) {
        if (!token) {
            return {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            };
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    static async verifyToken(token: string): Promise<boolean> {
        const response = await axios.post(this.VERIFY_TOKEN, { token });
        return response.status === 200;
    }

    static async refreshAccessToken(refreshToken: string) {
        const response = await axios.post(this.REFRESH_ACCESS_TOKEN, {
            refresh: refreshToken,
        });
        return response.status === 200 ? response.data : undefined;
    }
}
