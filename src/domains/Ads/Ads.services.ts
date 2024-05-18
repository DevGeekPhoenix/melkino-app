import { adsUrl, createAdsUrl, deleteAdsUrl, editAdsUrl } from '@/constants/urls'
import { AdsType } from '@/types/api/Ads'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ManageAdsFormTypes } from '../shared/ManageAdsModal/ManageAdsModal.types'

export const adsApi = createApi({
  reducerPath: 'adsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getAdsById: builder.query<AdsType, { id: string }>({
      query: ({ id }) => ({
        url: adsUrl + `?id=${id}`,
        method: 'GET',
      }),
      transformResponse(response: { data: AdsType }) {
        return response.data
      },
    }),
    editAdsById: builder.mutation<{ message: string }, ManageAdsFormTypes & { id: string }>({
      query: (data) => ({
        url: editAdsUrl,
        method: 'PATCH',
        body: data,
      }),
      transformResponse(response: { message: string }) {
        return response
      },
    }),
    deleteAdsById: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: deleteAdsUrl + `?id=${id}`,
        method: 'DELETE',
      }),
      transformResponse(response: { message: string }) {
        return response
      },
    }),
    createAds: builder.mutation<{ message: string }, Omit<AdsType, 'id'>>({
      query: (data) => ({
        url: createAdsUrl,
        method: 'POST',
        body: data,
      }),
      transformResponse(response: { message: string }) {
        return response
      },
    }),
  }),
})

export const { useGetAdsByIdQuery, useEditAdsByIdMutation, useDeleteAdsByIdMutation, useCreateAdsMutation } = adsApi
