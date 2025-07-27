interface PointerItem {
  color: string
  icon: string
  id: string
  text: string
}

interface PointersSection {
  type: string
  name: string
  description: string
  bg_color: string
  order_idx: number
  values: PointerItem[]
}

interface PointersProps {
  pointersSection: PointersSection
}

export default function Pointers({ pointersSection }: PointersProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      {/* section title */}
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">{pointersSection.name}</h2>

      {/* pointers grid - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pointersSection.values.map((pointer) => (
          <div key={pointer.id} className="flex items-start gap-3">
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

            {/* pointer text */}
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed text-sm">{pointer.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
