import { getProductData } from "@/lib/getProductData"
import ProductBanner from "@/components/ProductBanner"
import IELTSCourseContent from "@/components/IELTSCourseContent"
import { LocalizationProvider } from "@/contexts/LocalizationContext"
import type { ProductData, Locale } from "@/types/ieltsCourse"
import type { Metadata } from "next"

interface IELTSPageProps {
  params: {
    lang: Locale
  }
}

// dynamic metadata generation
export async function generateMetadata({ params }: IELTSPageProps): Promise<Metadata> {
  const { lang } = await params
  const productData = await getProductData(lang)

  if (!productData || !productData.data || !productData.data.seo) {
    return {
      title: "IELTS Course - 10 Minute School",
      description: "Complete IELTS preparation course with expert instructors",
    }
  }

  const seo = productData.data.seo

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    
    openGraph: {
      title: seo.title,
      description: seo.description,
      
    },
    twitter: {
      title: seo.title,
      description: seo.description,
    
    },
  }
}

export default async function IELTSPage({ params }: IELTSPageProps) {
  const { lang } = await params
  const productData = await getProductData(lang)

  if (!productData || !productData.data) {
    return <div className="text-red-600 text-center p-6">Failed to load product data</div>
  }

  const product: ProductData = productData.data

  return (
    <LocalizationProvider initialLocale={lang}>
      <ProductBanner imageUrl={product.image} />
      <IELTSCourseContent product={product} />
    </LocalizationProvider>
  )
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "bn" }]
}
