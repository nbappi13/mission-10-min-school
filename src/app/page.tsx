import { redirect } from "next/navigation"

export default function HomePage() {
  redirect("/en/product/ielts-course") // Redirect to a default locale
}
