import React from 'react'

export default function SkeletonDetailsCard() {
    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-gray-200 animate-pulse h-96 lg:h-[500px] rounded-lg mb-4"></div>
                    <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-20 h-20 bg-gray-200 animate-pulse rounded-lg"></div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
                        <div className="h-10 bg-gray-200 animate-pulse rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
