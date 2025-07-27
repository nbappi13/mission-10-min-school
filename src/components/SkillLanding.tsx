import Image from "next/image"

interface TrailerVideo {
  name: string
  resource_type: string
  resource_value: string
  thumbnail_url?: string
}

interface CtaText {
  name: string
  value: string
}

interface ChecklistItem {
  color: string
  icon: string
  id: string
  list_page_visibility: boolean
  text: string
}

interface SkillLandingProps {
  title: string
  description: string
  trailerVideo?: TrailerVideo
  ctaText: CtaText
  checklist: ChecklistItem[]
}

export default function SkillLanding({ title, description, trailerVideo, ctaText, checklist }: SkillLandingProps) {
  // convert YouTube video ID to embed URL
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <section className="w-full px-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* left column: title, description */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{title}</h1>

            {/* Rating section */}
            <div className="mb-2">
              <div className="flex flex-row flex-wrap gap-2 items-center">
                <span className="inline-block">
                  <Image
                    src="https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png"
                    alt="Rating badge showing 82.6% 5-star ratings"
                    width={130}
                    height={24}
                    className="md:w-[130px] w-[100px] h-auto"
                  />
                </span>
                <span className="inline-block text-sm md:text-base text-black">
                  (82.6% of students gave a 5 rating at the end of the course)
                </span>
              </div>
            </div>

            <div
              className="text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>

        {/* right column: video trailer, CTA, and checklist */}
        <div className="space-y-4">
          {/* Video Trailer */}
          {trailerVideo ? (
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={getYouTubeEmbedUrl(trailerVideo.resource_value)}
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

          {/* CTA Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="space-y-4">
              <div className="text-2xl font-bold text-green-600">৳ 1000</div>
              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
                {ctaText.name}
              </button>
            </div>
          </div>

          {/* checklist Section - show all items */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s in this course</h3>
            <div className="space-y-3">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Image src={item.icon || "/placeholder.svg"} alt="" width={20} height={20} className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
