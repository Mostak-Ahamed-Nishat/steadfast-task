"use client";
import React, { use, useState } from 'react';
import { Star, Heart, Share2, Plus, Minus, ChevronLeft, ChevronRight, Check, MessageCircle, Eye, Package, Truck, ChevronDown, ChevronUp } from 'lucide-react'
import { useGetProductQuery } from '@/store/features/products/productApiSlice';
import DeliveryOptionsCard from '@/components/DeliveryOptionsCard';
import SellerDetailsCard from '@/components/SellerDetailsCard';
import Description from '@/components/Products/Description';
import Specification from '@/components/Products/Specification';


export default function ProductDetailsPage({ params }) {

    const resolvedParams = use(params);
    const { data: product, isLoading, error } = useGetProductQuery(resolvedParams.slug);
    const [selectedVariation, setSelectedVariation] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showDescription, setShowDescription] = useState(false);
    const [showSpecifications, setShowSpecifications] = useState(false);

    // Handle loading state
    if (isLoading) {
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
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-4 lg:p-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error loading product</h2>
                    <p className="text-gray-600">Please try again later</p>
                </div>
            </div>
        );
    }

    // Handle no product data
    if (!product?.data) {
        return (
            <div className="max-w-7xl mx-auto p-4 lg:p-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
                    <p className="text-gray-600">The product you're looking for doesn't exist</p>
                </div>
            </div>
        );
    }

    const productData = product.data;
    const variations = productData.variations || [];
    const currentVariation = variations[selectedVariation] || variations[0];

    // Extract unique attribute options
    const getUniqueAttributes = (attributeName) => {
        const attributes = variations.flatMap(variation =>
            variation.variation_attributes
                ?.filter(attr => attr.attribute.name === attributeName)
                ?.map(attr => ({
                    id: attr.attribute_option.id,
                    value: attr.attribute_option.attribute_value,
                    slug: attr.attribute_option.slug
                })) || []
        );

        return attributes.filter((attr, index, self) =>
            index === self.findIndex(a => a.id === attr.id)
        );
    };

    const availableColors = getUniqueAttributes('Color');
    const availableRams = getUniqueAttributes('Ram');
    const availableSizes = getUniqueAttributes('Size');

    // Get current variation's attributes
    const getCurrentAttribute = (attributeName) => {
        return currentVariation?.variation_attributes
            ?.find(attr => attr.attribute.name === attributeName)
            ?.attribute_option;
    };

    const currentColor = getCurrentAttribute('Color');
    const currentRam = getCurrentAttribute('Ram');
    const currentSize = getCurrentAttribute('Size');

    // Get all available images
    const getAllImages = () => {
        const images = [];

        if (productData.thumbnail) {
            images.push(productData.thumbnail);
        }

        if (productData.image?.['1']?.url) {
            images.push(productData.image['1'].url);
        }

        variations.forEach(variation => {
            if (variation.image && !images.includes(variation.image)) {
                images.push(variation.image);
            }
        });

        return images;
    };

    const allImages = getAllImages();

    // Filter variations based on selected attributes
    const getCompatibleVariations = (colorId, ramId, sizeId) => {
        return variations.filter(variation => {
            const varColor = variation.variation_attributes
                ?.find(attr => attr.attribute.name === 'Color')?.attribute_option.id;
            const varRam = variation.variation_attributes
                ?.find(attr => attr.attribute.name === 'Ram')?.attribute_option.id;
            const varSize = variation.variation_attributes
                ?.find(attr => attr.attribute.name === 'Size')?.attribute_option.id;

            return (!colorId || varColor === colorId) &&
                (!ramId || varRam === ramId) &&
                (!sizeId || varSize === sizeId);
        });
    };

    // Handle attribute selection
    const handleAttributeChange = (attributeName, attributeId) => {
        const currentColorId = attributeName === 'Color' ? attributeId : currentColor?.id;
        const currentRamId = attributeName === 'Ram' ? attributeId : currentRam?.id;
        const currentSizeId = attributeName === 'Size' ? attributeId : currentSize?.id;

        const compatibleVariations = getCompatibleVariations(currentColorId, currentRamId, currentSizeId);

        if (compatibleVariations.length > 0) {
            const newIndex = variations.findIndex(v => v.id === compatibleVariations[0].id);
            setSelectedVariation(newIndex);
        }
    };

    // Get current pricing and stock from variation or product detail
    const currentPrice = Number(currentVariation?.discount_price || productData.product_detail?.discount_price || 0);
    const originalPrice = Number(currentVariation?.regular_price || productData.product_detail?.regular_price || 0);
    const currentStock = currentVariation?.total_stock_qty || productData.total_stock_qty || 0;

    // Navigation functions for thumbnails
    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    // Quantity handlers
    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Add to cart functionality
    const addToCart = () => {
        const cartItem = {
            id: `${productData.id}_${currentVariation?.id || 'default'}`,
            productId: productData.id,
            variationId: currentVariation?.id,
            name: productData.name,
            image: allImages[0] || productData.thumbnail,
            price: currentPrice,
            originalPrice: originalPrice,
            quantity: quantity,
            color: currentColor?.attribute_value,
            ram: currentRam?.attribute_value,
            size: currentSize?.attribute_value,
            sku: currentVariation?.sku || productData.sku,
            stock: currentStock,
            addedAt: new Date().toISOString()
        };

        // Get existing cart from localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if item already exists
        const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);

        if (existingItemIndex > -1) {
            // Update quantity if item exists
            existingCart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            existingCart.push(cartItem);
        }

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(existingCart));

        // Optional: Show success message or trigger event
        alert('Item added to cart successfully!');
    };

    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Image Gallery */}
                <div className="lg:col-span-1">
                    {/* Main Image */}
                    <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={allImages[currentImageIndex] || '/api/placeholder/500/600'}
                            alt={productData.name}
                            className="w-full h-96 lg:h-[500px] object-cover"
                        />
                    </div>

                    {/* Thumbnail Gallery with Navigation */}
                    {allImages.length > 1 && (
                        <div className="relative">
                            <div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth" id="thumbnail-container">
                                {allImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? 'border-teal-500' : 'border-gray-200'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Navigation arrows for thumbnails */}
                            {allImages.length > 4 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md z-10"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md z-10"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Middle: Product Info */}
                <div className="lg:col-span-1">
                    <h1 className="text-xl lg:text-2xl font-medium text-gray-900 mb-4">
                        {productData.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-medium">{productData.rating_avg || 0}</span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(productData.rating_avg || 0)
                                        ? 'fill-orange-400 text-orange-400'
                                        : 'fill-gray-200 text-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-600">({productData.rating_count || 0})</span>
                        <div className="flex gap-2 ml-4">
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl font-bold text-teal-600">
                            ৳{currentPrice.toLocaleString()}
                        </span>
                        {originalPrice > currentPrice && (
                            <span className="text-lg text-gray-500 line-through">
                                ৳{originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Brand & Stock */}
                    <div className="flex items-center gap-4 mb-6">
                        {productData.brand && (
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Brand:</span>
                                <span className="font-medium">{productData.brand.name}</span>
                            </div>
                        )}
                        <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${currentStock > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}>
                            {currentStock > 0 ? `${currentStock} in stock` : 'Out of stock'}
                        </span>
                    </div>

                    {/* Color Selection */}
                    {availableColors.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-gray-700 mb-3">
                                Available Color: <span className="font-medium">{currentColor?.attribute_value || 'Select Color'}</span>
                            </h3>
                            <div className="flex gap-2">
                                {availableColors.map((color) => {
                                    const isSelected = currentColor?.id === color.id;
                                    const hasStock = getCompatibleVariations(color.id, currentRam?.id, currentSize?.id).some(v => v.total_stock_qty > 0);

                                    return (
                                        <button
                                            key={color.id}
                                            onClick={() => handleAttributeChange('Color', color.id)}
                                            className={`px-4 py-2 border rounded-lg font-medium ${isSelected
                                                ? 'border-teal-500 bg-teal-50 text-teal-700'
                                                : 'border-gray-300 hover:border-gray-400'
                                                } ${!hasStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={!hasStock}
                                        >
                                            {color.value}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* RAM Selection */}
                    {availableRams.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-gray-700 mb-3">
                                Select RAM: <span className="font-medium">{currentRam?.attribute_value || 'Select RAM'}</span>
                            </h3>
                            <div className="flex gap-2">
                                {availableRams.map((ram) => {
                                    const isSelected = currentRam?.id === ram.id;
                                    const hasStock = getCompatibleVariations(currentColor?.id, ram.id, currentSize?.id).some(v => v.total_stock_qty > 0);

                                    return (
                                        <button
                                            key={ram.id}
                                            onClick={() => handleAttributeChange('Ram', ram.id)}
                                            className={`px-4 py-2 border rounded-lg font-medium ${isSelected
                                                ? 'border-teal-500 bg-teal-50 text-teal-700'
                                                : 'border-gray-300 hover:border-gray-400'
                                                } ${!hasStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={!hasStock}
                                        >
                                            {ram.value}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Size Selection */}
                    {availableSizes.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-gray-700 mb-3">
                                Select Size: <span className="font-medium">{currentSize?.attribute_value || 'Select Size'}</span>
                            </h3>
                            <div className="flex gap-2">
                                {availableSizes.map((size) => {
                                    const isSelected = currentSize?.id === size.id;
                                    const hasStock = getCompatibleVariations(currentColor?.id, currentRam?.id, size.id).some(v => v.total_stock_qty > 0);

                                    return (
                                        <button
                                            key={size.id}
                                            onClick={() => handleAttributeChange('Size', size.id)}
                                            className={`px-4 py-2 border rounded-lg font-medium ${isSelected
                                                ? 'border-teal-500 bg-teal-50 text-teal-700'
                                                : 'border-gray-300 hover:border-gray-400'
                                                } ${!hasStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={!hasStock}
                                        >
                                            {size.value}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Current Variation Info */}
                    {currentVariation && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Selected Variant:</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div>SKU: {currentVariation.sku}</div>
                                <div>Stock: {currentVariation.total_stock_qty} units</div>
                                {currentVariation.variation_attributes?.map((attr, index) => (
                                    <div key={index}>
                                        {attr.attribute.name}: {attr.attribute_option.attribute_value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="mb-8">
                        <h3 className="text-gray-700 mb-3">Quantity</h3>
                        <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                            <button
                                onClick={() => handleQuantityChange('decrease')}
                                className="p-3 hover:bg-gray-50 disabled:opacity-50"
                                disabled={quantity <= 1}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-6 py-3 font-medium">{quantity.toString().padStart(2, '0')}</span>
                            <button
                                onClick={() => handleQuantityChange('increase')}
                                className="p-3 hover:bg-gray-50"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={addToCart}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-lg font-medium text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={currentStock === 0}
                    >
                        {currentStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>

                    {/* Description Section */}
                    <Description productData={productData} showDescription={showDescription} setShowDescription={setShowDescription} />

                    {/* Specifications Section */}
                    <Specification productData={productData} currentVariation={currentVariation} showSpecifications={showSpecifications} setShowSpecifications={setShowSpecifications} />
                </div>

                {/* Right: Delivery & Seller Info */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Delivery Options */}
                    <DeliveryOptionsCard currentVariation={currentVariation} />

                    {/* Seller Info */}
                    <SellerDetailsCard productData={productData} />
                </div>
            </div>
        </div>
    );
}