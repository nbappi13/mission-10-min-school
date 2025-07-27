"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SectionNavItem {
  id: string
  name: string
  type: string
}

interface SectionNavigationProps {
  sections: SectionNavItem[]
}

export default function SectionNavigation({ sections }: SectionNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveSection(sectionId)
    }
  }

  // scroll navigation left/right
  const scrollNavigation = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  // check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  // observe sections for active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  // check scroll position on mount and scroll
  useEffect(() => {
    checkScrollPosition()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollPosition)
      return () => container.removeEventListener("scroll", checkScrollPosition)
    }
  }, [])

  return (
    <div className="relative flex items-center">
      {/* left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scrollNavigation("left")}
          className="absolute left-0 z-10 bg-green-500 shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
          style={{ transform: "translateX(-50%)" }}
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
      )}

      {/* navigation content */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide relative flex flex-nowrap gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory w-full"
      >
        <ul className="flex border-b flex-nowrap w-full">
          {sections.map((section) => (
            <li
              key={section.id}
              className={`text-nowrap p-2 text-base ${
                activeSection === section.id ? "text-green-600 border-b-2 border-green-600" : "text-gray-600"
              }`}
            >
              <button onClick={() => scrollToSection(section.id)} className="hover:text-green-600 transition-colors">
                {section.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scrollNavigation("right")}
          className="absolute right-0 z-10 bg-green-500 shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
          style={{ transform: "translateX(50%)" }}
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
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
