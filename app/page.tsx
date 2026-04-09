import NavBar from '@/components/ui/NavBar'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import FaqSection from '@/components/sections/FaqSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col font-sans">
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}
