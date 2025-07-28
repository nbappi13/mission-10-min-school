"use client"

import Image from "next/image"
import { useLocalization } from "@/contexts/LocalizationContext"
import SectionNavigation from "@/components/SectionNavigation"
import Instructors from "@/components/Instructors"
import Features from "@/components/Features"
import Pointers from "@/components/Pointers"
import ExclusiveFeature from "@/components/ExclusiveFeature"
import About from "@/components/About"
import MediaGallery from "@/components/MediaGallery"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import type {
  ProductData,
  InstructorsSection,
  FeaturesSection,
  PointersSection,
  FeatureExplanationsSection,
  AboutSection,
  ChecklistItem,
  SectionNavItem,
} from "@/types/ieltsCourse"

interface IELTSCourseContentProps {
  product: ProductData
}

export default function IELTSCourseContent({ product }: IELTSCourseContentProps) {
  const { t } = useLocalization()

  const instructorsSection = product.sections?.find(
    (section): section is InstructorsSection => section.type === "instructors",
  )
  const featuresSection = product.sections?.find((section): section is FeaturesSection => section.type === "features")
  const pointersSection = product.sections?.find((section): section is PointersSection => section.type === "pointers")
  const featureExplanationsSection = product.sections?.find(
    (section): section is FeatureExplanationsSection => section.type === "feature_explanations",
  )
  const aboutSection = product.sections?.find((section): section is AboutSection => section.type === "about")

  // Helper to get translated section names for navigation
  const getTranslatedSectionName = (type: string): string => {
    switch (type) {
      case "instructors":
        return t("nav.instructors")
      case "features":
        return t("nav.features")
      case "pointers":
        return t("nav.pointers")
      case "feature_explanations":
        return t("nav.exclusive")
      case "about":
        return t("nav.about")
      default:
        // fallback to original name if no specific translation key is found
        
        if (type === "instructors" && instructorsSection) return instructorsSection.name
        if (type === "features" && featuresSection) return featuresSection.name
        if (type === "pointers" && pointersSection) return pointersSection.name
        if (type === "feature_explanations" && featureExplanationsSection) return featureExplanationsSection.name
        if (type === "about" && aboutSection) return aboutSection.name
        return type
    }
  }

  const navigationSections: SectionNavItem[] = [
    ...(instructorsSection
      ? [{ id: "instructors", name: getTranslatedSectionName(instructorsSection.type), type: "instructors" }]
      : []),
    ...(featuresSection
      ? [{ id: "features", name: getTranslatedSectionName(featuresSection.type), type: "features" }]
      : []),
    ...(pointersSection
      ? [{ id: "pointers", name: getTranslatedSectionName(pointersSection.type), type: "pointers" }]
      : []),
    ...(featureExplanationsSection
      ? [
          {
            id: "exclusive-features",
            name: getTranslatedSectionName(featureExplanationsSection.type),
            type: "feature_explanations",
          },
        ]
      : []),
    ...(aboutSection ? [{ id: "about", name: getTranslatedSectionName(aboutSection.type), type: "about" }] : []),
  ]

  return (
    <>
      {/* language switcher */}
      <div className="w-full px-4 py-4 bg-gray-50">
        <div className="max-w-6xl mx-auto flex justify-end">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="w-full px-4 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                {/* localized product title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{t("course.title")}</h1>

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
                    {/* Localized rating text */}
                    <span className="inline-block text-sm md:text-base text-black">{t("course.rating")}</span>
                  </div>
                </div>

                
                <div
                  className="text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>

            <SectionNavigation sections={navigationSections} />

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
            <div className="sticky top-20 space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="space-y-4">
                  {/* localized price */}
                  <div className="text-2xl font-bold text-green-600">{t("course.price")}</div>
                  {/* Localized CTA button text */}
                  <button className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
                    {t("course.enroll")}
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                {/* localized checklist title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("course.includes")}</h3>
                <div className="space-y-3">
                  {/* checklist items are assumed to be localized by API or not needing client-side translation */}
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
