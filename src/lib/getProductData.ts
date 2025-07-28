// function to fetch product data from the API
import type { Locale } from "@/types/ieltsCourse" 

export async function getProductData(lang: Locale) {
  // accepted lang parameter
  try {
    const res = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`, // used lang parameter
      {
        headers: {
          "X-TENMS-SOURCE-PLATFORM": "web", // required custom header
        },
        next: { revalidate: 60 }, // enabled ISR: cache revalidates every 60 seconds
      },
    )

    if (!res.ok) {
      throw new Error("Failed to fetch product data")
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching product data:", error)
    return null
  }
}
