// src/lib/getProductData.ts

// function to fetch product data from the API
export async function getProductData() {
  try {
    const res = await fetch(
      "https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en",
      {
        headers: {
          "X-TENMS-SOURCE-PLATFORM": "web", // required custom header
        },
        next: { revalidate: 60 }, // enabled ISR: cache revalidates every 60 seconds
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}
