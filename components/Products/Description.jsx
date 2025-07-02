import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'

function Description({ productData, showDescription, setShowDescription }) {
    return (
        <div>        <div className="mt-8 border-t pt-6">
            <button
                onClick={() => setShowDescription(!showDescription)}
                className="flex items-center justify-between w-full text-left"
            >
                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                {showDescription ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>
            {showDescription && (
                <div className="mt-4 text-gray-600">
                    <p>{productData.description || 'No description available.'}</p>
                </div>
            )}
        </div>
        </div>
    )
}

export default Description