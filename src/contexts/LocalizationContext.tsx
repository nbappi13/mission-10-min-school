"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Locale, LocalizationContextType } from "@/types/ieltsCourse"

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined)

// translation dictionary
const translations = {
  en: {
    "course.title": "IELTS Course",
    "course.rating": "(82.6% of students gave a 5 rating at the end of the course)",
    "course.price": "৳1,000",
    "course.enroll": "Enroll Now",
    "course.includes": "What's in this course",
    "nav.instructors": "Course Instructors",
    "nav.features": "How the course is laid out",
    "nav.pointers": "What you will learn by doing the course",
    "nav.exclusive": "Course Exclusive Feature",
    "nav.about": "Course details",
  },
  bn: {
    "course.title": "IELTS কোর্স",
    "course.rating": "(82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)",
    "course.price": "৳১,০০০",
    "course.enroll": "এনরোল করুন",
    "course.includes": "এই কোর্সে যা থাকছে",
    "nav.instructors": "কোর্স ইন্সট্রাক্টর",
    "nav.features": "কোর্সটি যেভাবে সাজানো হয়েছে",
    "nav.pointers": "কোর্সটি করে যা শিখবেন",
    "nav.exclusive": "কোর্স এক্সক্লুসিভ ফিচার",
    "nav.about": "কোর্স সম্পর্কে বিস্তারিত",
  },
}

interface LocalizationProviderProps {
  children: React.ReactNode
  initialLocale: Locale // added initialLocale prop
}

export function LocalizationProvider({ children, initialLocale }: LocalizationProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale) 

  // load locale from localStorage on mount and update if different from initialLocale
  
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale && (savedLocale === "en" || savedLocale === "bn") && savedLocale !== locale) {
      setLocale(savedLocale)
    }
  }, [locale]) // depend on locale to re-check if it changes externally 

  // saved locale to localStorage when changed
  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  // translation function
  const t = (key: string): string => {
    return translations[locale][key as keyof (typeof translations)[typeof locale]] || key
  }

  const value: LocalizationContextType = {
    locale,
    setLocale: handleSetLocale,
    t,
  }

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>
}

export function useLocalization() {
  const context = useContext(LocalizationContext)
  if (context === undefined) {
    throw new Error("useLocalization must be used within a LocalizationProvider")
  }
  return context
}
