import { BenefitsSection } from '@/components/landing/benefits-section'
import { CommunitySection } from '@/components/landing/community-section'
import { Footer } from '@/components/landing/footer'
import { Hero } from '@/components/landing/hero'
import { Navbar } from '@/components/landing/navbar'
import { PlatformsSection } from '@/components/landing/platforms-section'
import { RegistrationForm } from '@/components/landing/registration-form'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CommunitySection />
        <PlatformsSection />
        <BenefitsSection />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  )
}
