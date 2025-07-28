"use client"

import { useLocalization } from "@/contexts/LocalizationContext"
import type { Locale } from "@/types/ieltsCourse"

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocalization()

  const languages = [
    { code: "bn" as Locale, name: "বাংলা", flag: "🇧🇩" },
    { code: "en" as Locale, name: "English", flag: "🇺🇸" },
  ]

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
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
