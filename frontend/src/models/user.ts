import { ITask } from "./task";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string | null;
    position: string;
    isChief: boolean;
    tasks: number[];
}
