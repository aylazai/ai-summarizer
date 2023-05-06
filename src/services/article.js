import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

// define a service using a base URL and expected endpoints
export const articleApi = createApi ({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
            
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            // using `encodeURIComponent` to ensure correct syntax for a URI
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
});

// using `useLazyGetSummaryQuery` instead of `useGetSummaryQuery` allows us to run this hook on demand instead of at the start of loading the program 
export const { useLazyGetSummaryQuery } = articleApi;