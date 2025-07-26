// src/app/product/ielts-course/page.tsx
import React from "react";

// fetch data on the server
async function getProductData() {
  try {
    const res = await fetch(
      "https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en",
      {
        headers: {
          "X-TENMS-SOURCE-PLATFORM": "web",
        },
        next: { revalidate: 60 }, // enabled ISR with 60s revalidation
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

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
    <main className="p-8 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700">{product.title}</h1>
      <p className="text-gray-700">{product.shortDescription}</p>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold text-lg">Product Details:</h2>
        <pre className="text-sm whitespace-pre-wrap text-gray-600">
          {JSON.stringify(product, null, 2)}
        </pre>
      </div>
    </main>
  );
}
