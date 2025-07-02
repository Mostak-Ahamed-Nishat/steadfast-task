import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'

function Specification({ productData, currentVariation, showSpecifications, setShowSpecifications, currentColor, currentRam, currentSize }) {
    return (
        <div>  <div className="mt-6 border-t pt-6">
            <button
                onClick={() => setShowSpecifications(!showSpecifications)}
                className="flex items-center justify-between w-full text-left"
            >
                <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
                {showSpecifications ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>
            {showSpecifications && (
                <div className="mt-4 text-gray-600">
                    <div className="space-y-2">
                        {productData.brand && (
                            <div className="flex justify-between">
                                <span className="font-medium">Brand:</span>
                                <span>{productData.brand.name}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="font-medium">SKU:</span>
                            <span>{currentVariation?.sku || productData.sku}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Barcode:</span>
                            <span>{currentVariation?.barcode || productData.barcode}</span>
                        </div>
                        {currentColor && (
                            <div className="flex justify-between">
                                <span className="font-medium">Color:</span>
                                <span>{currentColor.attribute_value}</span>
                            </div>
                        )}
                        {currentRam && (
                            <div className="flex justify-between">
                                <span className="font-medium">RAM:</span>
                                <span>{currentRam.attribute_value}</span>
                            </div>
                        )}
                        {currentSize && (
                            <div className="flex justify-between">
                                <span className="font-medium">Size:</span>
                                <span>{currentSize.attribute_value}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div></div>
    )
}

export default Specification