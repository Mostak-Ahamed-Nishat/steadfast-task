"use client"

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { useState } from "react"

export default function ProductCard({ product }) {
    const [imageError, setImageError] = useState(false)

    const imageUrl = product.thumbnail || "/placeholder.svg"

    return (
        <Link
            href={`/product/${product.slug}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
            <div className="aspect-square bg-gray-200 relative">
                {!imageError ? (
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <div className="text-gray-400 text-center">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                            </svg>
                            <span className="text-xs">No Image</span>
                        </div>
                    </div>
                )}

                {/* Badges positioned in top right corner */}
                {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {product.badges.map((badge) => (
                            <span
                                key={badge.id}
                                className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium shadow-md"
                            >
                                {badge.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center space-x-1 mb-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.round(product.rating_avg) ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.rating_count})</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-teal-600">
                        ৳{Number(product.discount_price).toFixed(2)}
                    </span>
                    {Number(product.regular_price) > Number(product.discount_price) && (
                        <span className="text-sm text-gray-500 line-through">
                            ৳{Number(product.regular_price).toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}