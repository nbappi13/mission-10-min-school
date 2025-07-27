import Image from "next/image"
import type { FeaturesProps } from "@/types/ieltsCourse"

export default function Features({ featuresSection }: FeaturesProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      {/* section title */}
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">{featuresSection.name}</h2>

      {/* features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuresSection.values.map((feature) => (
          <div key={feature.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            {/* feature icon */}
            <div className="flex-shrink-0">
              <Image
                src={feature.icon || "/placeholder.svg"}
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            </div>

            {/* feature content */}
            <div className="flex-1">
              {/* feature title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>

              {/* feature description */}
              <p className="text-sm text-gray-600 leading-relaxed">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
