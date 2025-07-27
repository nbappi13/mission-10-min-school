"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import type { MediaGalleryProps } from "@/types/ieltsCourse"

export default function MediaGallery({ media }: MediaGalleryProps) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number>(0)

  // filter preview gallery items
  const previewGalleryItems = media.filter((item) => item.name === "preview_gallery")

  // get current selected media
  const selectedMedia = previewGalleryItems[selectedMediaIndex] || null

  // get youtube embed url
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`
  }

  // navigate to previous media
  const goToPrevious = () => {
    setSelectedMediaIndex((prev) => (prev > 0 ? prev - 1 : previewGalleryItems.length - 1))
  }

  // navigate to next media
  const goToNext = () => {
    setSelectedMediaIndex((prev) => (prev < previewGalleryItems.length - 1 ? prev + 1 : 0))
  }

  // select specific media
  const selectMedia = (index: number) => {
    setSelectedMediaIndex(index)
  }

  if (previewGalleryItems.length === 0) {
    return (
      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No media available</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* main media display with navigation arrows */}
      <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden group">
        {selectedMedia ? (
          selectedMedia.resource_type === "video" ? (
            <iframe
              className="w-full h-full"
              src={getYouTubeEmbedUrl(selectedMedia.resource_value)}
              title="Course Media"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Image
              src={selectedMedia.resource_value || "/placeholder.svg"}
              alt="Course Media"
              width={400}
              height={225}
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">No media available</p>
          </div>
        )}

        {/* navigation arrows - only show if more than 1 item */}
        {previewGalleryItems.length > 1 && (
          <>
            {/* left arrow */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* right arrow */}
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* media counter */}
        {previewGalleryItems.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {selectedMediaIndex + 1} / {previewGalleryItems.length}
          </div>
        )}
      </div>

      {/* media thumbnails - smaller and in one line */}
      {previewGalleryItems.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {previewGalleryItems.map((item, index) => (
            <button
              key={index}
              onClick={() => selectMedia(index)}
              className={`relative flex-shrink-0 w-16 h-10 rounded overflow-hidden border-2 transition-colors ${
                selectedMediaIndex === index ? "border-green-500" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* thumbnail image - smaller size */}
              <Image
                src={item.thumbnail_url || (item.resource_type === "image" ? item.resource_value : "/placeholder.svg")}
                alt="Media thumbnail"
                width={64}
                height={40}
                className="w-full h-full object-cover"
              />

              {/* play icon for videos - smaller */}
              {item.resource_type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="bg-white bg-opacity-90 rounded-full p-1">
                    <Play className="w-2 h-2 text-gray-800" fill="currentColor" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
