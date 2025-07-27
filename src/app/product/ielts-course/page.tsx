import { getProductData } from "@/lib/getProductData"
import ProductBanner from "@/components/ProductBanner"
import Instructors from "@/components/Instructors"
import Features from "@/components/Features"
import Pointers from "@/components/Pointers"
import ExclusiveFeature from "@/components/ExclusiveFeature"
import Image from "next/image"

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

  // finding the instructors section
  const instructorsSection = product.sections?.find((section: { type: string }) => section.type === "instructors")

  // finding the features section
  const featuresSection = product.sections?.find((section: { type: string }) => section.type === "features")

  // finding the pointers section
  const pointersSection = product.sections?.find((section: { type: string }) => section.type === "pointers")

  // finding the feature explanations section
  const featureExplanationsSection = product.sections?.find(
    (section: { type: string }) => section.type === "feature_explanations",
  )

  return (
    <>
      <ProductBanner />

      {/* main content area with sticky sidebar */}
      <div className="w-full px-4 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* left content area (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* skill landing left content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.title}</h1>

                {/* rating section */}
                <div className="mb-2">
                  <div className="flex flex-row flex-wrap gap-2 items-center">
                    <span className="inline-block">
                      <Image
                        src="https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png"
                        alt="Rating badge showing 82.6% 5-star ratings"
                        width={130} // have to set up later
                        height={0} // future removal and use class for height
                        className="md:w-[130px] w-[100px] h-auto"
                      />
                    </span>
                    <span className="inline-block text-sm md:text-base text-black">
                      (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
                    </span>
                  </div>
                </div>

                <div
                  className="text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>

            {/* instructors section */}
            {instructorsSection && <Instructors instructorsSection={instructorsSection} />}

            {/* features section */}
            {featuresSection && <Features featuresSection={featuresSection} />}

            {/* pointers section */}
            {pointersSection && <Pointers pointersSection={pointersSection} />}

            {/* feature explanations section */}
            {featureExplanationsSection && <ExclusiveFeature featureExplanationsSection={featureExplanationsSection} />}

            {/* future sections */}
          </div>

          {/* right sidebar (1/3) - sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* video trailer */}
              {trailerVideo ? (
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerVideo.resource_value}`}
                    title="Course Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No trailer available</p>
                </div>
              )}

              {/* cta section */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-green-600">৳১,০০০</div>
                  <button className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
                    {product.cta_text.name}
                  </button>
                </div>
              </div>

              {/* checklist section */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">এই কোর্সে যা থাকছে</h3>
                <div className="space-y-3">
                  {product.checklist.map((item: { id: string; icon: string; text: string }) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.icon || "/placeholder.svg"}
                          alt=""
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                      </div>
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
