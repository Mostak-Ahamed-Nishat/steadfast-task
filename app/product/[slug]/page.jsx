"use client";
import { use } from "react";
import { useGetProductQuery } from "@/store/features/products/productApiSlice";

export default function ProductPage({ params }) {
    // Unwrap the params Promise using React.use()
    const resolvedParams = use(params);

    const { data: product, isLoading, error } = useGetProductQuery(resolvedParams.slug);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading product</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const { name, description, price, thumbnail } = product?.data || {};

    return <h1>Product name: {name}</h1>;
}