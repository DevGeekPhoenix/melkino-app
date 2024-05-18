import { adsUrl } from '@/constants/urls'
import { AdsType } from '@/types/api/Ads'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeApi = createApi({
  reducerPath: 'homeApi',
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_GATEWAY_URL
        : process.env.NEXT_PUBLIC_API_GATEWAY_LOCAL,
  }),
  endpoints: (builder) => ({
    getAds: builder.query<AdsType[], null>({
      query: () => ({
        url: adsUrl,
        method: 'GET',
      }),
      transformResponse(response: { data: AdsType[] }) {
        return response.data
      },
    }),
  }),
})

export const { useGetAdsQuery } = homeApi
