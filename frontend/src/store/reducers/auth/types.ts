import { ITask } from "../../../models/task";

export interface IAuthState {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    birthdate: string | null;
    isChief: boolean;
    position: string | null;
    loading: boolean;
    error: number | string | null;
    isAuth: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    tasks: number[] | null;
}
