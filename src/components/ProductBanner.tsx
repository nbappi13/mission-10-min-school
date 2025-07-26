// src/components/ProductBanner.tsx
"use client";

import Image from "next/image";

type ProductBannerProps = {
  imageUrl?: string | null;
};

export default function ProductBanner({ imageUrl }: ProductBannerProps) {
  //  fallback if imageUrl is empty
  const fallbackImage =
    "https://cdn.10minuteschool.com/images/dasktop_banner_1753270611489.png?w=1800";

  if (!imageUrl) {
    imageUrl = fallbackImage;
  }

  return (
    <div className="relative w-screen h-[150px] mx-auto">
      <Image
        src={imageUrl}
        alt="IELTS Course Banner"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
