import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-blue flex items-center">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Corporate skyscraper" 
            className="w-full h-full object-cover grayscale opacity-50 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-brand-accent uppercase tracking-[0.2em] font-semibold text-sm mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand-accent"></span>
              Global Asset Management
            </p>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl text-white font-serif tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Delivering <br className="hidden md:block"/> 
            <span className="italic font-light text-white/90">value.</span>
          </motion.h1>

          <motion.p 
            className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Discover how we empower our people, uplift communities, and deliver value to our investors.
          </motion.p>
        </div>
      </div>


    </section>
  );
}
