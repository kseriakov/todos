import Login from "../pages/Login";
import IRoute from "./types";
import {
    CheifLinksNavbar,
    GeneralLinksNavbar,
    UserLinksNavbar,
} from "../enums/navbar";
import Workers from "../pages/Workers";
import AllTasks from "../pages/AllTasks";
import WorkerTasks from "../pages/WorkerTasks";

export enum RoutePath {
    LOGIN = "/login",
    WORKERS = "/workers",
    TASKS = "/tasks",
    ALL_TASKS = "/",
    REDIRECT = "*",
}

export const RouteForNavbar = new Map([
    [GeneralLinksNavbar.LOGIN as string, RoutePath.LOGIN],
    [GeneralLinksNavbar.LOGOUT, RoutePath.ALL_TASKS],
    [CheifLinksNavbar.TASKS_ON_CONTROL, RoutePath.ALL_TASKS],
    [CheifLinksNavbar.MY_WORKES, RoutePath.WORKERS],
    [UserLinksNavbar.TASKS + "/:id", RoutePath.TASKS],
]);

export const publicRoutes: IRoute[] = [
    { path: RoutePath.LOGIN, element: <Login /> },
    { path: RoutePath.REDIRECT, element: <Login /> },
];

export const privateChiefRoutes: IRoute[] = [
    { path: RoutePath.ALL_TASKS, element: <AllTasks /> },
    { path: RoutePath.WORKERS, element: <Workers /> },
    { path: RoutePath.TASKS + "/:id", element: <WorkerTasks /> },
    { path: RoutePath.REDIRECT, element: <AllTasks /> },
];

export const privateUserRoutes: IRoute[] = [
    { path: RoutePath.TASKS, element: <WorkerTasks /> },
    { path: RoutePath.REDIRECT, element: <WorkerTasks /> },
];
