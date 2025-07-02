"use client"

import { Check, MessageCircle, Eye, } from 'lucide-react'

function SellerDetailsCard({ productData }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Sold by</h3>

            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium">
                        {productData.merchant?.shop_name?.charAt(0) || 'S'}
                    </span>
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">
                            {productData.merchant?.shop_name || 'Shop Name'}
                        </span>
                        <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="bg-gradient-to-r from-orange-400 to-purple-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                        Rising Star
                    </span>
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat Now
                </button>
                <button className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Shop
                </button>
            </div>

            {/* Seller Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <div className="text-lg font-bold text-gray-900">100%</div>
                    <div className="text-xs text-gray-600">Ship on Time</div>
                </div>
                <div>
                    <div className="text-lg font-bold text-gray-900">90%</div>
                    <div className="text-xs text-gray-600">Chat Response</div>
                </div>
                <div>
                    <div className="text-lg font-bold text-gray-900">99.8%</div>
                    <div className="text-xs text-gray-600">Shop Rating</div>
                </div>
            </div>
        </div>
    )
}

export default SellerDetailsCard