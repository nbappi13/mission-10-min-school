import { getProductData } from "@/lib/getProductData"
import ProductBanner from "@/components/ProductBanner"
import IELTSCourseContent from "@/components/IELTSCourseContent"
import { LocalizationProvider } from "@/contexts/LocalizationContext" 
import type { ProductData, Locale } from "@/types/ieltsCourse"

interface IELTSPageProps {
  params: {
    lang: Locale // get the locale from the URL
  }
}

export default async function IELTSPage({ params }: IELTSPageProps) {
  const { lang } = await params // await params before destructuring
  const productData = await getProductData(lang) // passing the locale to fetch data

  if (!productData || !productData.data) {
    return <div className="text-red-600 text-center p-6">Failed to load product data</div>
  }

  const product: ProductData = productData.data

  return (
    <LocalizationProvider initialLocale={lang}>
      {" "}
      {/* wrapping with LocalizationProvider here */}
      <ProductBanner imageUrl={product.image} /> {/* passing image URL if available */}
      {/* rendering the client component and passings the fetched product data */}
      <IELTSCourseContent product={product} />
    </LocalizationProvider>
  )
}

//  generate static params for static site generation (SSG)
//  pre-render pages for 'en' and 'bn' at build time
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "bn" }]
}
