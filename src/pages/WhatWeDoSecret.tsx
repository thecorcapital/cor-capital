import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

export function WhatWeDoSecret() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const strategies = [
    {
      title: 'Long/Short Equity',
      description: 'Our long/short equity strategy is our largest asset allocation. Cor Capital uses a multi-managed approach. Where teams have the autonomy to pursue their individual investing style with the firm’s commitment to help their long-term success.',
    },
    {
      title: 'Global Macro',
      description: 'We aim to generate uncorrelated returns by making discretionary investments in both developed and emerging markets, across various asset classes such as fixed income, FX, liquid credit, commodities, and derivatives.',
    },
    {
      title: 'Real Estate',
      description: 'We invest in real estate for a variety of strategic reasons, including but not limited to generating consistent cash flow, diversifying investment portfolios, leveraging tax benefits, capitalizing on property appreciation, and utilizing real estate as an effective hedge against inflation.',
    },
    {
      title: 'Hedge / Arbitrage',
      description: 'We also allocate to hedge/arbitrage positions, which include strategies such as event arbitrage, related securities arbitrage, convertible arbitrage, volatility arbitrage, and fixed-income arbitrage. These strategies are aimed at capitalizing on small discrepancies between similar or related instruments, typically on an opportunistic basis, while also supporting the broader goal of managing portfolio risk.',
    }
  ];

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-blue selection:bg-brand-accent selection:text-white">
      <SEOHead 
        title="What We Do | Investment Strategies & Asset Allocation | Cor Capital"
        description="Explore Cor Capital's core hedge fund investment strategies: Long/Short Equity, Global Macro, Real Estate, and Arbitrage, managed with disciplined risk management."
        canonicalPath="/what-we-do"
        schema={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "Cor Capital Multi-Strategy Investment Portfolio",
          "provider": {
            "@type": "FinancialService",
            "name": "Cor Capital Management LLC"
          },
          "description": "Fundamental and systematic investment strategies encompassing Long/Short Equity, Global Macro, Real Estate, and Hedge/Arbitrage."
        }}
      />
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="relative pt-40 pb-20 bg-brand-blue text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://static.wixstatic.com/media/4d302e_8070725d51014da5968319b8eb03af31~mv2.png" 
              alt="Cor Capital Professional Environment" 
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
                <span className="text-brand-accent uppercase tracking-widest text-xs font-semibold">What We Do</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                Driven By <br/> Excellence.
              </h1>
              <p className="text-lg text-white/80 font-light leading-relaxed">
                Cor Capital, founded by Michael A. Corvin, is an alternative investment firm focused on delivering strong long-term returns through fundamental and systematic strategies across diverse asset classes, with a disciplined approach to risk management and long-term value creation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Strategies Section */}
        <section className="py-24 bg-brand-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl font-serif text-brand-blue mb-4">Investment Strategies</h2>
              <div className="w-12 h-1 bg-brand-accent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {strategies.map((strategy, i) => (
                <motion.div
                  key={strategy.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative flex flex-col justify-between bg-white border border-brand-blue/10 p-10 md:p-14 hover:border-brand-accent/50 transition-all duration-500 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] rounded-sm"
                >
                  <div>
                    <h3 className="text-3xl font-serif tracking-tight mb-6 text-brand-blue group-hover:text-brand-accent transition-colors">
                      {strategy.title}
                    </h3>
                    <p className="text-brand-blue/70 leading-relaxed font-light text-lg">
                      {strategy.description}
                    </p>
                  </div>
                  
                  {/* Subtle decorative elements for a modern slick look */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="mt-10 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
