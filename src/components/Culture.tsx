import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export function Culture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section className="bg-brand-blue text-white overflow-hidden" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image side */}
        <div className="relative min-h-[60vh] lg:min-h-screen group overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={isInView ? { scale: 1 } : { scale: 1.1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img 
              src="https://static.wixstatic.com/media/4d302e_7c1f2eff2d834a568b365e355a4d2b5c~mv2.png" 
              alt="Cor Capital Values" 
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue to-transparent md:bg-gradient-to-r" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-sm font-mono tracking-widest text-brand-accent uppercase hidden lg:block">
              Innovation through Collaboration
            </p>
          </div>
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-center px-8 py-20 lg:p-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-brand-accent"></span>
              <span className="text-brand-accent uppercase tracking-[0.2em] text-xs font-semibold">Careers & Culture</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.1] mb-12">
              Our <br/> Values.
            </h2>
            
            <div className="space-y-6">
              {[
                { title: 'Innovation', text: 'Leveraging technology, data, and creative thinking to stay ahead.' },
                { title: 'Resilience', text: 'Adaptability and sound risk management in all market conditions.' },
                { title: 'Discipline', text: 'Rigorous analysis and methodical approaches to decision-making.' },
                { title: 'Trust & Excellence', text: 'Pursuing the highest standards to deliver exceptional returns.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start border-t border-white/10 pt-6">
                  <span className="text-brand-accent font-serif italic text-xl mt-1">0{i + 1}</span>
                  <div>
                    <h4 className="text-xl font-serif mb-1">{item.title}</h4>
                    <p className="text-white/60 text-sm font-sans">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="/our-values" className="mt-12 inline-block w-full sm:w-auto text-center bg-white text-brand-blue px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-brand-accent hover:text-white">
              View Our Values
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
