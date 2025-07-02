"use client";

import ProductCard from "@/components/Products/ProductCard";
import SkeletonProductCard from "@/components/SkeletonProductCard";
import { useGetProductsQuery } from "@/store/features/products/productApiSlice";

export default function Home() {
  const {
    data: productsResponse = {},
    isLoading,
    error,
  } = useGetProductsQuery();
  const products = productsResponse?.data || [];

  console.log("Products:", products);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) =>
            product ? <ProductCard key={product.id} product={product} /> : null
          )}
        </div>
      </div>
    </div>
  );
}
