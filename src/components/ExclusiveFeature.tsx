"use client" 

import Image from "next/image"
import type { FeatureExplanationsProps } from "@/types/ieltsCourse"
import { useLocalization } from "@/contexts/LocalizationContext" 

export default function ExclusiveFeature({ featureExplanationsSection }: FeatureExplanationsProps) {
  const { t } = useLocalization() // Use the localization hook

  // map section type to translation key
  const getTranslatedSectionName = (type: string): string => {
    switch (type) {
      case "feature_explanations":
        return t("nav.exclusive")
      default:
        return featureExplanationsSection.name // fallback to original name
    }
  }

  return (
    <div className="bg-white rounded-lg p-6">
      {/* section title - now localized */}
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
        {getTranslatedSectionName(featureExplanationsSection.type)}
      </h2>

      {/* feature explanations */}
      <div className="space-y-8">
        {featureExplanationsSection.values.map((feature) => (
          <div key={feature.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* left side - content */}
            <div className="space-y-4">
              {/* feature title */}
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>

              {/* checklist */}
              <div className="space-y-3">
                {feature.checklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* checkmark icon */}
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* checklist item text */}
                    <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* right side - image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                <Image
                  src={feature.file_url || "/placeholder.svg"}
                  alt={feature.title}
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
