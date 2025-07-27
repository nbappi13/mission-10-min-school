import { getProductData } from "@/lib/getProductData"
import ProductBanner from "@/components/ProductBanner"
import SkillLanding from "@/components/SkillLanding"

export default async function IELTSPage() {
  const productData = await getProductData()

  if (!productData || !productData.data) {
    return <div className="text-red-600 text-center p-6">Failed to load product data</div>
  }

  const product = productData.data

  // finding the trailer video from media array
  const trailerVideo = product.media?.find(
    (media: { name: string; resource_type: string }) =>
      media.name === "preview_gallery" && media.resource_type === "video",
  )

  return (
    <>
      <ProductBanner />

      <SkillLanding
        title={product.title}
        description={product.description}
        trailerVideo={trailerVideo}
        ctaText={product.cta_text}
      />

      <main className="p-8 space-y-6 max-w-6xl mx-auto">{/* Other sections */}</main>
    </>
  )
}
