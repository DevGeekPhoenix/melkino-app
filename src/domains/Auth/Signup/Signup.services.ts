import { registerUrl } from '@/constants/urls'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RegisterTypes } from './Signup.types'

export const signupApi = createApi({
  reducerPath: 'signupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<any, RegisterTypes>({
      query: (data) => ({
        url: registerUrl,
        method: 'POST',
        body: data,
      }),
      transformResponse(response) {
        return response
      },
    }),
  }),
})

export const { useRegisterMutation } = signupApi
