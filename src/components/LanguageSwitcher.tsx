"use client"

import { useLocalization } from "@/contexts/LocalizationContext"
import type { Locale } from "@/types/ieltsCourse"
import { useRouter, usePathname } from "next/navigation" 

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocalization()
  const router = useRouter()
  const pathname = usePathname()

  const languages = [
    { code: "bn" as Locale, name: "বাংলা", flag: "🇧🇩" },
    { code: "en" as Locale, name: "English", flag: "🇺🇸" },
  ]

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale) // updated context state and localStorage
    // construct new path with the selected locale
    const segments = pathname.split("/")
    segments[1] = newLocale 
    const newPath = segments.join("/")
    router.push(newPath) // navigate to the new URL, triggering a server render
  }

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)} // used new handler
          className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
            locale === lang.code ? "bg-green-100 text-green-700 font-medium" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <span>{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  )
}
