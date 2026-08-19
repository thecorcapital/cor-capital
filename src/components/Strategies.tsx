import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const strategies = [
  {
    title: 'Long/Short Equity',
    description: 'Our long/short equity strategy is our largest asset allocation. Cor Capital uses a multi-managed approach.',
    color: 'bg-[#EDEDEB]',
    highlight: 'text-brand-blue'
  },
  {
    title: 'Global Macro',
    description: 'We aim to generate uncorrelated returns by making discretionary investments in developed and emerging markets.',
    color: 'bg-brand-blue text-white',
    highlight: 'text-brand-accent'
  },
  {
    title: 'Real Estate',
    description: 'We invest in real estate for a variety of strategic reasons, including generating consistent cash flow and utilizing it as an effective hedge.',
    color: 'bg-[#183654] text-white', // lighter navy
    highlight: 'text-brand-accent'
  },
  {
    title: 'Hedge / Arbitrage',
    description: 'We allocate to hedge/arbitrage positions aimed at capitalizing on small discrepancies between similar or related instruments.',
    color: 'bg-white border border-brand-blue/10',
    highlight: 'text-brand-blue'
  }
];

export function Strategies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section className="py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brand-blue mb-6">What We Do</h2>
            <p className="text-lg text-brand-blue/70">
              Learn about the strategies and asset classes that make up our business.
            </p>
          </motion.div>
          <motion.a 
            href="/what-we-do"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group flex items-center justify-between gap-4 text-sm font-semibold tracking-wide uppercase border-b border-brand-blue/30 pb-2 text-brand-blue hover:border-brand-blue transition-colors w-max"
          >
            View All Strategies
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategies.map((strategy, index) => (
            <motion.a
              href="/what-we-do"
              key={strategy.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
              className={`p-10 lg:p-14 min-h-[360px] flex flex-col items-start ${strategy.color} rounded-[32px] group cursor-pointer transition-transform duration-500 hover:scale-[1.02] block`}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-mono tracking-widest opacity-60">0{index + 1}</span>
                <span className={`w-8 h-[1px] ${strategy.color.includes('text-white') || strategy.color.includes('#183654') ? 'bg-white/30' : 'bg-brand-blue/20'}`}></span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif mb-6 pr-4">{strategy.title}</h3>
              <p className={`text-sm opacity-80 leading-relaxed font-sans max-w-lg mb-12`}>
                {strategy.description}
              </p>
              
              <div className={`mt-auto w-12 h-12 shrink-0 rounded-full border ${strategy.color.includes('text-white') || strategy.color.includes('#183654') ? 'border-white/20' : 'border-brand-blue/20'} flex items-center justify-center transition-all duration-300 group-hover:bg-brand-accent group-hover:border-transparent group-hover:text-white`}>
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
