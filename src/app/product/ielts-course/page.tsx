import { getProductData } from "@/lib/getProductData"
import ProductBanner from "@/components/ProductBanner"
import SectionNavigation from "@/components/SectionNavigation"
import Instructors from "@/components/Instructors"
import Features from "@/components/Features"
import Pointers from "@/components/Pointers"
import ExclusiveFeature from "@/components/ExclusiveFeature"
import About from "@/components/About"
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

  // finding the about section
  const aboutSection = product.sections?.find((section: { type: string }) => section.type === "about")

  // prepare navigation sections
  const navigationSections = [
    ...(instructorsSection ? [{ id: "instructors", name: instructorsSection.name, type: "instructors" }] : []),
    ...(featuresSection ? [{ id: "features", name: featuresSection.name, type: "features" }] : []),
    ...(pointersSection ? [{ id: "pointers", name: pointersSection.name, type: "pointers" }] : []),
    ...(featureExplanationsSection
      ? [{ id: "exclusive-features", name: featureExplanationsSection.name, type: "feature_explanations" }]
      : []),
    ...(aboutSection ? [{ id: "about", name: aboutSection.name, type: "about" }] : []),
  ]

  return (
    <>
      <ProductBanner />

      {/* skill landing section */}
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
                        width={130}
                        height={0}
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

            {/* section navigation - positioned in left column only */}
            <div className="bg-white rounded-lg p-4">
              <SectionNavigation sections={navigationSections} />
            </div>

            {/* instructors section */}
            {instructorsSection && (
              <div id="instructors">
                <Instructors instructorsSection={instructorsSection} />
              </div>
            )}

            {/* features section */}
            {featuresSection && (
              <div id="features">
                <Features featuresSection={featuresSection} />
              </div>
            )}

            {/* pointers section */}
            {pointersSection && (
              <div id="pointers">
                <Pointers pointersSection={pointersSection} />
              </div>
            )}

            {/* feature explanations section */}
            {featureExplanationsSection && (
              <div id="exclusive-features">
                <ExclusiveFeature featureExplanationsSection={featureExplanationsSection} />
              </div>
            )}

            {/* about section */}
            {aboutSection && (
              <div id="about">
                <About aboutSection={aboutSection} />
              </div>
            )}
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

      {/* main content sections */}
      <div className="w-full px-4 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* left content area (2/3) */}
          <div className="lg:col-span-2 space-y-8"></div>

          {/* right sidebar continues to be sticky */}
          <div className="lg:col-span-1">
            <div className="h-4"></div> {/* spacer to align with content */}
          </div>
        </div>
      </div>
    </>
  )
}
