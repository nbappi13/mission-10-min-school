import Image from "next/image";

interface TrailerVideo {
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url?: string;
}

interface CtaText {
  name: string;
  value: string;
}

interface SkillLandingProps {
  title: string;
  description: string;
  trailerVideo?: TrailerVideo;
  ctaText: CtaText;
}

export default function SkillLanding({
  title,
  description,
  trailerVideo,
  
}: SkillLandingProps) {
  // convert YouTube video ID to embed URL
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <section className="w-full px-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* left column: title, description, and cta */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            {/* expermt */}
            <div className="mb-2">
              <button className="flex flex-row flex-wrap gap-2 text-white">
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
                  (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
                </span>
              </button>
            </div>

            <div
              className="text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* CTA Section */}
          
        </div>

        {/* right column: video trailer */}
        <div className="space-y-4">
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

          {trailerVideo && (
            <p className="text-sm text-gray-600 text-center">Course Preview</p>
          )}
        </div>
      </div>
    </section>
  );
}
