import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants.js";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
    }),
    tokenUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/token-profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    deactivateUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/deactivate/${id}`,
        method: "PUT",
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserUsingToken: builder.query({
      query: (token) => ({
        url: `${USERS_URL}/token-user/${token}`,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    generateLink: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/generate-link`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useDeactivateUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
  useGenerateLinkMutation,
  useGetUserUsingTokenQuery,
  useTokenUserProfileMutation,
} = userApiSlice;
