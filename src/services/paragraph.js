import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_PARAGRAPH_KEY;

export const paragraphAPI = createApi({
  reducerPath: "paragraphApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", '5e0b9d00c2mshb958411c10e70fdp1898f3jsnb81626a81aab');
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.paragraphUrl)}&length=3`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = paragraphAPI;
