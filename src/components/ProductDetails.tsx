// src/components/ProductDetails.tsx
import React from "react";
import { Data } from "@/types/ieltsCourse"; 

// component accepts a 'product' prop of type 'Data'
export default function ProductDetails({ product }: { product: Data }) {
  return (
    <main className="p-8 space-y-6 max-w-2xl mx-auto">
      {/*  show product title */}
      <h1 className="text-3xl font-bold text-blue-700">{product.title}</h1>

      {/*  show product description */}
      <p className="text-gray-700">{product.description}</p>

       
    </main>
  );
}
