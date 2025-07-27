import Image from "next/image"

type ProductBannerProps = {
  imageUrl?: string | null
}

export default function ProductBanner({ imageUrl }: ProductBannerProps) {
  // using the fallback image since API doesn't provide banner bg image
  const bannerImage = imageUrl || "https://cdn.10minuteschool.com/images/dasktop_banner_1753270611489.png?w=1800"

  return (
    <div className="relative w-full">
      <Image
        src={bannerImage || "/placeholder.svg"}
        alt="IELTS Course Banner"
        width={1800}
        height={400}
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  )
}
