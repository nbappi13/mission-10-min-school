"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { AboutProps } from "@/types/ieltsCourse"
import { useLocalization } from "@/contexts/LocalizationContext" 

export default function About({ aboutSection }: AboutProps) {
  const [openItems, setOpenItems] = useState<string[]>([])
  const { t } = useLocalization() // use the localization hook

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  // map section type to translation key
  const getTranslatedSectionName = (type: string): string => {
    switch (type) {
      case "about":
        return t("nav.about")
      default:
        return aboutSection.name // Fallback to original name
    }
  }

  return (
    <div className="bg-white rounded-lg p-6">
      {/* section title - now localized */}
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
        {getTranslatedSectionName(aboutSection.type)}
      </h2>

      {/* accordion items */}
      <div className="space-y-4">
        {aboutSection.values.map((item) => {
          const isOpen = openItems.includes(item.id)

          return (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* accordion header */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div
                  className="text-lg font-semibold text-gray-900 flex-1"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                <div className="ml-4 flex-shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>

              {/* accordion content */}
              {isOpen && (
                <div className="px-6 py-4 bg-white">
                  <div
                    className="text-gray-700 prose prose-sm max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
