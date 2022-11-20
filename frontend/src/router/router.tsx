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
import { NotFound } from "../pages/NotFound";

export enum RoutePath {
    LOGIN = "/login",
    WORKERS = "/workers",
    WORKER_TASKS = "/worker",
    ALL_TASKS = "/",
    REDIRECT = "*",
}

export const RouteForNavbar = new Map([
    [GeneralLinksNavbar.LOGIN as string, RoutePath.LOGIN],
    [GeneralLinksNavbar.LOGOUT, RoutePath.LOGIN],
    [CheifLinksNavbar.TASKS_ON_CONTROL, RoutePath.ALL_TASKS],
    [CheifLinksNavbar.MY_WORKES, RoutePath.WORKERS],
    [UserLinksNavbar.TASKS, RoutePath.ALL_TASKS],
]);

export const publicRoutes: IRoute[] = [
    { path: RoutePath.LOGIN, element: <Login /> },
    { path: RoutePath.REDIRECT, element: <NotFound /> },
];

export const privateChiefRoutes: IRoute[] = [
    { path: RoutePath.ALL_TASKS, element: <AllTasks /> },
    { path: RoutePath.WORKERS, element: <Workers /> },
    { path: RoutePath.WORKER_TASKS + "/:id", element: <WorkerTasks /> },
    { path: RoutePath.REDIRECT, element: <NotFound /> },
];

export const privateUserRoutes = (workerId: number | null): IRoute[] => [
    {
        path: RoutePath.ALL_TASKS,
        element: <WorkerTasks workerId={workerId} />,
    },
    { path: RoutePath.REDIRECT, element: <NotFound /> },
];
