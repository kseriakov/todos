import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../models/user";
import { API } from "./api";
import { APIUser } from "./apiUser";
import { ICreateWorkerData, IWorkersResponse } from "./types";

export const workerAPI = createApi({
    reducerPath: "workerAPI",
    baseQuery: fetchBaseQuery({ baseUrl: API.HOST }),
    tagTypes: ["Worker"],
    endpoints: (builder) => ({
        getMyWorkers: builder.query<IUser[], void>({
            query: () => ({
                url: `/api/v1/users/chief-workers/`,
                method: "GET",
                ...APIUser.setTokenInHeaders(),
            }),
            transformResponse: (response: IWorkersResponse) =>
                response.workers.map((w) => APIUser.destructUserProfileData(w)),

            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Worker" as const,
                              id: id,
                          })),
                      ]
                    : ["Worker"],
        }),
        createWorker: builder.mutation<unknown, ICreateWorkerData>({
            query: (data) => ({
                url: "/api/v1/users/create/worker/",
                method: "POST",
                body: data,
                ...APIUser.setTokenInHeaders(),
            }),
            invalidatesTags: ["Worker"],
        }),

        deleteWorker: builder.mutation<unknown, number>({
            query: (id) => ({
                url: `/api/v1/users/delete/worker/${id}/`,
                method: "DELETE",
                ...APIUser.setTokenInHeaders(),
            }),
            invalidatesTags: (result, error, arg) =>
                result ? [{ type: "Worker", id: arg }] : ["Worker"],
        }),
    }),
});
