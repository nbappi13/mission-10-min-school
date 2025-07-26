// src/app/product/ielts-course/page.tsx
import React from "react";
import { getProductData } from "@/lib/getProductData";
import ProductBanner from "@/components/ProductBanner";

export default async function IELTSPage() {
  const productData = await getProductData();

  if (!productData || !productData.data) {
    return (
      <div className="text-red-600 text-center p-6">
        Failed to load product data.
      </div>
    );
  }

  const product = productData.data;

  return (
    <>
      
      <ProductBanner imageUrl={product.bannerImageUrl} />

      <main className="p-8 space-y-6 max-w-2xl mx-auto">
        {/* other product content will go here */}
      </main>
    </>
  );
}
