import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

export function OurValues() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      title: 'Innovation',
      description: 'We embrace innovation as a core driver of competitive advantage. By leveraging technology, data, and creative thinking, we stay ahead of market trends and deliver smarter investment solutions.'
    },
    {
      title: 'Resilience',
      description: 'We are built to withstand volatility and thrive in uncertainty. Through adaptability, determination, and sound risk management, we remain strong and focused regardless of market conditions.'
    },
    {
      title: 'Discipline',
      description: 'Our strategies are grounded in rigorous analysis and a methodical approach to decision-making. We maintain focus, stay true to our principles, and avoid short-term distractions in pursuit of long-term success.'
    },
    {
      title: 'Trust',
      description: 'We build and maintain trust through consistent performance, open communication, and ethical conduct. Trust is earned over time, and we work every day to strengthen it.'
    },
    {
      title: 'Excellence',
      description: 'We pursue the highest standards in everything we do, from investment performance to client service. Our commitment to excellence drives us to consistently deliver outstanding results and outperform expectations.'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-blue selection:bg-brand-accent selection:text-white">
      <SEOHead 
        title="Our Values & Mission | Innovation, Resilience & Trust | Cor Capital"
        description="Discover the mission and core values of Cor Capital: Innovation, Resilience, Discipline, Trust, and Excellence in alternative asset management."
        canonicalPath="/our-values"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "Cor Capital Values and Mission",
          "description": "Our mission is to lead the hedge fund industry by delivering exceptional returns through disciplined strategies while investing in communities and creating lasting value."
        }}
      />
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="relative pt-40 pb-20 md:pb-32 bg-brand-blue text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://static.wixstatic.com/media/4d302e_7c1f2eff2d834a568b365e355a4d2b5c~mv2.png" 
              alt="Cor Capital Values" 
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
                <span className="text-brand-accent uppercase tracking-widest text-xs font-semibold">Our Values</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                Making Lasting <br/> Impact.
              </h1>
              <p className="text-lg text-white/80 font-light leading-relaxed">
                Our Mission and Values establish the guiding principles and high standards that we hold ourselves and one another accountable to, shaping the culture and integrity of our firm.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement Section */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xl uppercase tracking-widest text-brand-accent font-semibold mb-8">Our Mission</h2>
              <p className="text-2xl md:text-4xl font-serif text-brand-blue leading-relaxed md:leading-normal">
                "Our mission is to lead the hedge fund industry by delivering exceptional returns through disciplined strategies, while also investing in the communities we serve and creating lasting value for both our investors and future generations."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-24 bg-brand-light border-t border-brand-blue/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-blue mb-6">Core Values</h2>
                <div className="w-12 h-1 bg-brand-accent"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 auto-rows-fr">
              {values.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative flex flex-col justify-between bg-white border border-brand-blue/10 p-10 md:p-14 hover:border-brand-accent/50 transition-all duration-500 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] rounded-sm h-full"
                >
                  <div className="text-6xl font-serif text-brand-blue/5 mb-4 tracking-tight absolute top-6 right-8 select-none transition-colors duration-500 group-hover:text-brand-blue/10">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif tracking-tight mb-6 text-brand-blue group-hover:text-brand-accent transition-colors relative z-10">
                      {val.title}
                    </h3>
                    <p className="text-brand-blue/70 leading-relaxed font-light text-lg relative z-10">
                      {val.description}
                    </p>
                  </div>
                  
                  {/* Subtle decorative elements for a modern slick look */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="mt-10 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 relative z-10">
                    <span className="w-8 h-[1px] bg-brand-accent"></span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
