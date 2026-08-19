import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { Strategies } from '../components/Strategies';
import { Culture } from '../components/Culture';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

export function HomePage() {
  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-blue selection:bg-brand-accent selection:text-white">
      <SEOHead 
        title="Cor Capital | Global Asset Management & Alternative Investment Hedge Fund"
        description="Cor Capital Management LLC is an alternative asset management firm and multi-strategy hedge fund founded by Michael A. Corvin, focused on long/short equity, global macro, real estate, and arbitrage strategies."
        canonicalPath="/"
      />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Strategies />
        <Culture />
      </main>
      <Footer />
    </div>
  );
}

