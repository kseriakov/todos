import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "./api";
import { ICreateChiefData } from "./types";

export const chiefAPI = createApi({
    reducerPath: "chiefAPI",
    baseQuery: fetchBaseQuery({ baseUrl: API.HOST }),
    tagTypes: ["Chief"],
    endpoints: (builder) => ({
        createChief: builder.mutation<unknown, ICreateChiefData>({
            query: (data) => ({
                url: "/api/v1/users/create/chief/",
                method: "POST",
                body: data,
            }),
        }),
    }),
});
