import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router";

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
import { Register } from "../pages/Register";
import { RootLayout } from "../components/RootLayout";


export enum RoutePath {
    REGISTER = "register",
    LOGIN = "login",
    WORKERS = "workers",
    WORKER_TASKS = "worker",
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
    { index: true, element: <Login /> },
    { path: RoutePath.REGISTER, element: <Register /> },
    { path: RoutePath.REDIRECT, element: <Login /> },
];

export const privateChiefRoutes: IRoute[] = [
    { element: <AllTasks />, index: true },
    { path: RoutePath.WORKERS, element: <Workers /> },
    { path: RoutePath.WORKER_TASKS + "/:id", element: <WorkerTasks /> },
    { path: RoutePath.REDIRECT, element: <NotFound /> },
];

export const privateUserRoutes = (workerId: number | null): IRoute[] => [
    { index: true, element: <WorkerTasks workerId={workerId} /> },
    { path: RoutePath.REDIRECT, element: <NotFound /> },
];

export const indexRouter = (
    isAuth: boolean,
    isChief: boolean,
    id: number | null
): RemixRouter => {
    const routes = isAuth
        ? isChief
            ? privateChiefRoutes
            : privateUserRoutes(id)
        : publicRoutes;

    return createBrowserRouter([
        { path: "/", element: <RootLayout />, children: routes },
    ]);
};
