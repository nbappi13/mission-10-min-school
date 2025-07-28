"use client" // Make it a Client Component

import Image from "next/image"
import type { InstructorsProps } from "@/types/ieltsCourse"
import { useLocalization } from "@/contexts/LocalizationContext" 

export default function Instructors({ instructorsSection }: InstructorsProps) {
  const { t } = useLocalization() // using the localization hook

  // mapping section type to translation key
  const getTranslatedSectionName = (type: string): string => {
    switch (type) {
      case "instructors":
        return t("nav.instructors")
      default:
        return instructorsSection.name // fallback to original name 
    }
  }

  return (
    <div className="bg-white rounded-lg p-6">
      {/* section title - now localized */}
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
        {getTranslatedSectionName(instructorsSection.type)}
      </h2>

      {/* instructors content */}
      <div className="space-y-6">
        {instructorsSection.values.map((instructor) => (
          <div key={instructor.slug} className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* instructor image */}
            <div className="flex-shrink-0">
              <Image
                src={instructor.image || "/placeholder.svg"}
                alt={instructor.name}
                width={120}
                height={120}
                className="w-30 h-30 rounded-full object-cover"
              />
            </div>

            {/* instructor info */}
            <div className="flex-1">
              {/* instructor name */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{instructor.name}</h3>

              {/* short description */}
              <p className="text-sm text-gray-600 mb-3">{instructor.short_description}</p>

              {/* detailed description */}
              <div
                className="text-sm text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: instructor.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
