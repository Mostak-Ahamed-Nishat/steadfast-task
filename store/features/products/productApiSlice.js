import { apiSlice } from "@/store/api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get All The Products
    getProducts: builder.query({
      query: () => `/shop/products`,
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
