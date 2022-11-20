import {
    BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { url } from "inspector";
import { ITask } from "../models/task";
import { store } from "../store/store";
import { API } from "./api";
import { APIUser } from "./apiUser";
import { ITaskResponse, ITaskAPIData, ITaskCreateData } from "./types";

export const changeTaskDataForClient = (data: ITaskAPIData): ITask => ({
    id: data.id,
    text: data.text,
    worker: `${data.worker.first_name} ${data.worker.last_name}`,
    workerId: data.worker.id,
    date: data.date,
    isActive: data.is_active,
    isCompleted: data.is_completed,
    isClosed: data.is_closed,
});

export const taskAPI = createApi({
    reducerPath: "taskAPI",
    baseQuery: fetchBaseQuery({ baseUrl: API.HOST }),
    tagTypes: ["Task"],
    endpoints: (builder) => ({
        getChiefTasks: builder.query<
            Omit<ITaskResponse, "results"> & { results: ITask[] },
            { limit?: number; offset?: number }
        >({
            query: ({ limit = 5, offset = 0 }) => ({
                url: `/api/v1/tasks/chief/?offset=${offset}&limit=${limit}`,
                method: "GET",
                ...APIUser.setTokenInHeaders(),
            }),
            transformResponse: (response: ITaskResponse) => ({
                ...response,
                results: response.results.map((taskData) =>
                    changeTaskDataForClient(taskData)
                ),
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: "Task" as const,
                              id: id,
                          })),
                      ]
                    : ["Task"],
        }),
        getWorkerTasks: builder.query<
            Omit<ITaskResponse, "results"> & { results: ITask[] },
            { limit?: number; offset?: number; id: number | string | undefined }
        >({
            query: ({ id, limit = 5, offset = 0 }) => ({
                url: `/api/v1/tasks/worker/${id}/?offset=${offset}&limit=${limit}`,
                method: "GET",
                ...APIUser.setTokenInHeaders(),
            }),
            transformResponse: (response: ITaskResponse) => ({
                ...response,
                results: response.results.map((taskData) =>
                    changeTaskDataForClient(taskData)
                ),
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: "Task" as const,
                              id: id,
                          })),
                      ]
                    : ["Task"],
        }),
        createTask: builder.mutation<unknown, ITaskCreateData>({
            query: (data) => ({
                url: "/api/v1/tasks/chief/create/",
                body: data,
                method: "POST",
                ...APIUser.setTokenInHeaders(),
            }),
            invalidatesTags: ["Task"],
        }),
        changeTask: builder.mutation<ITask, any>({
            query: ({ id, ...data }) => ({
                url: `/api/v1/tasks/chief/${id}/`,
                method: "PATCH",
                body: data,
                ...APIUser.setTokenInHeaders(),
            }),
            transformResponse: (response: ITaskAPIData) =>
                changeTaskDataForClient(response),
            invalidatesTags: (result, error, arg) =>
                result ? [{ type: "Task", id: arg.id }] : ["Task"],
        }),
        completeTask: builder.mutation<ITask, any>({
            query: ({ id, ...data }) => ({
                url: `/api/v1/tasks/worker/${id}/`,
                method: "PATCH",
                body: data,
                ...APIUser.setTokenInHeaders(),
            }),
            transformResponse: (response: ITaskAPIData) =>
                changeTaskDataForClient(response),
            invalidatesTags: (result, error, arg) =>
                result ? [{ type: "Task", id: arg.id }] : ["Task"],
        }),
        deleteTask: builder.mutation<unknown, number>({
            query: (id) => ({
                url: `/api/v1/tasks/chief/${id}/`,
                method: "DELETE",
                ...APIUser.setTokenInHeaders(),
            }),
            invalidatesTags: (result, error, arg) =>
                result ? [{ type: "Task", id: arg }] : ["Task"],
        }),
    }),
});
