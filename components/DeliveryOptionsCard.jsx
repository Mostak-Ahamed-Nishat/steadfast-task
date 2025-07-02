import { Package, Truck } from 'lucide-react'
import React from 'react'

function DeliveryOptionsCard({ currentVariation }) {
    return (
        <div>
            <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">Delivery Options</h3>

                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-teal-600" />
                        <div>
                            <div className="font-medium">Regular</div>
                            <div className="text-sm text-gray-600">Delivery within 2-3 days</div>
                            {currentVariation?.id_delivery_fee && (
                                <div className="text-sm text-gray-500">Fee: ৳{currentVariation.id_delivery_fee}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 opacity-50">
                        <Truck className="w-5 h-5 text-gray-400" />
                        <div>
                            <div className="font-medium text-gray-400">Express</div>
                            <div className="text-sm text-red-500">Not Available</div>
                            <div className="text-sm text-gray-400">Delivery within 24 hours</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryOptionsCard