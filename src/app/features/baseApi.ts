import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://mfwkweb-api.clarovideo.net/services/epg/" }),
  endpoints: () => ({}),
});