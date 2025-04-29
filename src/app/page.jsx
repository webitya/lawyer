import HomePageHero from "./HomePage/HomePageHero/HomePageHero"
import HomePageFeatures from "./HomePage/HomePageFeatures/HomePageFeatures"
import HomePageCTA from "./HomePage/HomePageCTA/HomePageCTA"
import HomePageTestimonials from "./HomePage/HomePageTestimonials/HomePageTestimonials"
import HomePageFAQ from "./HomePage/HomePageFAQ/HomePageFAQ"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HomePageHero />
      <HomePageFeatures />
      <HomePageTestimonials />
      <HomePageFAQ />
      <HomePageCTA />
      <h1>Aditya</h1>
    </div>
  )
}
