import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

interface Leader {
  name: string;
  titles: string[];
  bio: string[];
  img: string;
}

export function Leadership() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedLeader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedLeader]);

  const leaders = [
    {
      name: 'Michael A. Corvin',
      titles: ['Founder', 'Chief Executive Officer', 'Chief Investment Officer'],
      bio: [
        'Michael Corvin is the Founder and Chief Investment Officer of Cor Capital. With nearly a decade of experience investing across both public and private markets, Michael has developed a deep understanding of capital allocation, value creation, and market inefficiencies. His hands-on approach to investing and passion for uncovering overlooked opportunities inspired the creation of Cor Capital, where he leads the firm’s investment strategy and long-term vision.',
        'Michael studied Accounting and Finance at Fitchburg State University, where he also competed as a member of the track and field team. His background in finance and athletics instilled in him the discipline, analytical rigor, and competitive drive that continue to shape his leadership and investment philosophy today.'
      ],
      img: 'https://static.wixstatic.com/media/4d302e_b60e710e670a4f98b057461df57cfa51~mv2.jpg/v1/fill/w_800,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/M%20Corvin%20Headshot.jpg'
    },
    {
      name: 'Michael Moorhouse',
      titles: ['Strategic Advisor'],
      bio: [
        'Michael Moorhouse serves as a Strategic Advisor, drawing upon four decades of executive leadership spanning the mortgage finance, banking, and financial technology sectors. His extensive career is marked by numerous C-suite positions where he has guided institutions through critical periods of growth, market volatility, and technological transformation.',
        'His expertise lies in developing innovative strategies that integrate data-driven systems to create momentum and competitive advantage. He has a proven track record of architecting robust operational frameworks and coaching executive teams to navigate complex economic cycles and achieve sustained growth.'
      ],
      img: 'https://static.wixstatic.com/media/4d302e_e5fe678a33dd49f486bffa14681aa3dd~mv2.jpeg/v1/fill/w_800,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1738100710697.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-brand-blue selection:bg-brand-accent selection:text-white pb-0">
      <SEOHead 
        title="Leadership & Management Committee | Michael A. Corvin | Cor Capital"
        description="Meet Cor Capital's executive leadership and management committee, led by Founder, CEO & CIO Michael A. Corvin and Strategic Advisor Michael Moorhouse."
        canonicalPath="/leadership"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Cor Capital Leadership Team",
          "itemListElement": [
            {
              "@type": "Person",
              "position": 1,
              "name": "Michael A. Corvin",
              "jobTitle": "Founder, Chief Executive Officer & Chief Investment Officer",
              "worksFor": {
                "@type": "Organization",
                "name": "Cor Capital Management LLC"
              },
              "image": "https://static.wixstatic.com/media/4d302e_b60e710e670a4f98b057461df57cfa51~mv2.jpg/v1/fill/w_800,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/M%20Corvin%20Headshot.jpg"
            },
            {
              "@type": "Person",
              "position": 2,
              "name": "Michael Moorhouse",
              "jobTitle": "Strategic Advisor",
              "worksFor": {
                "@type": "Organization",
                "name": "Cor Capital Management LLC"
              },
              "image": "https://static.wixstatic.com/media/4d302e_e5fe678a33dd49f486bffa14681aa3dd~mv2.jpeg/v1/fill/w_800,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1738100710697.jpeg"
            }
          ]
        }}
      />
      <Navbar />
      <main>
        {/* Standard Hero Section */}
        <section className="relative pt-40 pb-20 md:pb-32 bg-brand-blue text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
              alt="Office building" 
              className="w-full h-full object-cover grayscale opacity-30 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-blue/60" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-brand-accent"></span>
                <span className="text-brand-accent uppercase tracking-widest text-xs font-semibold">Leadership</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                Our Management<br />Committee.
              </h1>
              <p className="text-lg text-white/80 font-light leading-relaxed">
                Our management team applies their deep industry expertise to advancing our business and developing our people.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Minimalist Grid Section */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {leaders.map((leader, i) => (
                <motion.button
                  key={leader.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group flex flex-col items-start text-left w-full focus:outline-none"
                  onClick={() => setSelectedLeader(leader)}
                >
                  <div className="w-full h-[3px] bg-brand-blue/10 group-hover:bg-brand-accent transition-colors duration-300 mb-6" />
                  
                  <div className="w-full aspect-[4/5] bg-[#ececec] overflow-hidden mb-8 relative">
                    <img 
                      src={leader.img} 
                      alt={leader.name}
                      className="w-full h-full object-cover filter grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 flex justify-end">
                      <div className="bg-white text-brand-blue p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-serif text-brand-blue mb-3 transition-colors group-hover:text-brand-accent">
                    {leader.name}
                  </h3>
                  <div className="flex flex-col gap-1 w-full">
                    {leader.titles.map((title, index) => (
                      <p key={index} className="text-brand-blue/60 text-sm tracking-widest uppercase font-semibold">
                        {title}
                      </p>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Point72 Style Expansive Side Drawer Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedLeader(null)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.8 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-3xl bg-white shadow-2xl flex flex-col overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-10 w-full flex justify-end p-6 pointer-events-none">
                <button 
                  onClick={() => setSelectedLeader(null)}
                  className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-brand-light hover:bg-[#ececec] text-brand-blue rounded-full transition-colors"
                  aria-label="Close bio"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="px-8 md:px-16 lg:px-24 pb-24 -mt-6">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-sm overflow-hidden mb-12 bg-brand-light">
                    <img 
                      src={selectedLeader.img} 
                      alt={selectedLeader.name}
                      className="w-full h-full object-cover filter grayscale"
                      referrerPolicy="no-referrer"
                    />
                </div>
                
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-blue leading-tight mb-4">
                  {selectedLeader.name}
                </h3>
                
                <div className="flex flex-col gap-2 mb-12 pb-12 border-b border-black/10">
                  {selectedLeader.titles.map((title: string, index: number) => (
                    <p key={index} className="text-brand-blue/80 uppercase tracking-[0.2em] text-sm md:text-base font-semibold">
                      {title}
                    </p>
                  ))}
                </div>
                
                <div className="space-y-8 text-brand-blue/80 font-sans leading-relaxed text-lg lg:text-xl font-light">
                  {selectedLeader.bio.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
