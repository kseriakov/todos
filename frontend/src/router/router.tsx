import Login from "../pages/Login";
import Main from "../pages/Main";
import IRoute from "./types";
import {
    CheifLinksNavbar,
    GeneralLinksNavbar,
    UserLinksNavbar,
} from "../enums/navbar";
import Workers from "../pages/Workers";
import Tasks from "../pages/Tasks";

export enum RoutePath {
    LOGIN = "/login",
    WORKERS = "/workers",
    TASKS = "/tasks",
    MAIN = "/",
    REDIRECT = "*",
}

export const RouteForNavbar = new Map([
    [GeneralLinksNavbar.LOGIN as string, RoutePath.LOGIN],
    [GeneralLinksNavbar.LOGOUT as string, RoutePath.MAIN],
    [CheifLinksNavbar.TASKS_ON_CONTROL as string, RoutePath.MAIN],
    [CheifLinksNavbar.MY_WORKES as string, RoutePath.WORKERS],
    [UserLinksNavbar.TASKS as string, RoutePath.TASKS],
]);

export const publicRoutes: IRoute[] = [
    { path: RoutePath.LOGIN, element: <Login /> },
    { path: RoutePath.REDIRECT, element: <Login /> },
];

export const privateUserRoutes: IRoute[] = [
    { path: RoutePath.MAIN, element: <Main /> },
    { path: RoutePath.REDIRECT, element: <Main /> },
];

export const privateChiefRoutes: IRoute[] = [
    { path: RoutePath.MAIN, element: <Main /> },
    { path: RoutePath.WORKERS, element: <Workers /> },
    { path: RoutePath.REDIRECT, element: <Main /> },
];

export const generalRoutes: IRoute[] = [
    { path: RoutePath.TASKS, element: <Tasks /> },
];
