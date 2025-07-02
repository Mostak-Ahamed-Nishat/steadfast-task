import { apiSlice } from "@/store/api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get All The Products
    getProducts: builder.query({
      query: () => `/shop/products`,
      providesTags: ["Products"],
    }),
    //Get Single Product
    getProduct: builder.query({
      query: (slug) => `/product/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Products", id: slug }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
