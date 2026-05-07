'use client';

import { ConstructionScrollSequence } from '../components/ConstructionScrollSequence';
import { ExpertiseSection } from '../components/sections/ExpertiseSection';
import { TrustSection } from '../components/sections/TrustSection';
import { PartnersMarquee } from '../components/sections/PartnersMarquee';
import { FeaturedProjectsSection } from '../components/sections/FeaturedProjectsSection';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <ConstructionScrollSequence 
        frameCount={45} 
        imagePrefix="/images/ezgif-frame-" 
        imageExtension=".jpg" 
        onStartProjectClick={() => {
          router.push('/contact');
        }}
        onViewProjectsClick={() => {
          const el = document.getElementById('projects');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      <ExpertiseSection />
      <TrustSection />
      <PartnersMarquee />
      <FeaturedProjectsSection />
    </>
  );
}
