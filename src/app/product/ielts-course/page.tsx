import { getProductData } from "@/lib/getProductData"
import ProductBanner from "@/components/ProductBanner"
import SectionNavigation from "@/components/SectionNavigation"
import Instructors from "@/components/Instructors"
import Features from "@/components/Features"
import Pointers from "@/components/Pointers"
import ExclusiveFeature from "@/components/ExclusiveFeature"
import About from "@/components/About"
import Image from "next/image"
import MediaGallery from "@/components/MediaGallery"
import type {
  ProductData,
  InstructorsSection,
  FeaturesSection,
  PointersSection,
  FeatureExplanationsSection,
  AboutSection,
  ChecklistItem,
} from "@/types/ieltsCourse"

export default async function IELTSPage() {
  const productData = await getProductData()

  if (!productData || !productData.data) {
    return <div className="text-red-600 text-center p-6">Failed to load product data</div>
  }

  const product: ProductData = productData.data

  const instructorsSection = product.sections?.find(
    (section): section is InstructorsSection => section.type === "instructors",
  )
  const featuresSection = product.sections?.find((section): section is FeaturesSection => section.type === "features")
  const pointersSection = product.sections?.find((section): section is PointersSection => section.type === "pointers")
  const featureExplanationsSection = product.sections?.find(
    (section): section is FeatureExplanationsSection => section.type === "feature_explanations",
  )
  const aboutSection = product.sections?.find((section): section is AboutSection => section.type === "about")

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

      <div className="w-full px-4 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.title}</h1>

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

            <div className="bg-white rounded-lg p-4">
              <SectionNavigation sections={navigationSections} />
            </div>

            {instructorsSection && (
              <div id="instructors">
                <Instructors instructorsSection={instructorsSection} />
              </div>
            )}

            {featuresSection && (
              <div id="features">
                <Features featuresSection={featuresSection} />
              </div>
            )}

            {pointersSection && (
              <div id="pointers">
                <Pointers pointersSection={pointersSection} />
              </div>
            )}

            {featureExplanationsSection && (
              <div id="exclusive-features">
                <ExclusiveFeature featureExplanationsSection={featureExplanationsSection} />
              </div>
            )}

            {aboutSection && (
              <div id="about">
                <About aboutSection={aboutSection} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-4">
            {/* media gallery - not sticky */}
            <MediaGallery media={product.media || []} />

            {/* only cta and checklist are sticky */}
            <div className="sticky top-4 space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-green-600">৳১,০০০</div>
                  <button className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
                    {product.cta_text.name}
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">এই কোর্সে যা থাকছে</h3>
                <div className="space-y-3">
                  {product.checklist.map((item: ChecklistItem) => (
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
