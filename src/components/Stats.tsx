import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const stats = [
  { value: 'Values', label: 'Our Values', description: 'Our core philosophy and dedicated approach to sustainable growth.', href: '/our-values' },
  { value: 'Action', label: 'What We Do', description: 'Learn about the strategies and asset classes that make up our business.', href: '/what-we-do' },
  { value: 'People', label: 'Leadership', description: 'Meet the team responsible for shaping our firm.', href: '/leadership' },
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section className="py-24 bg-brand-light relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 relative z-10">
          {stats.map((stat, index) => (
            <motion.a
              href={stat.href}
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col relative group cursor-pointer block"
            >
              <div className="text-5xl md:text-6xl font-serif text-brand-blue mb-4 tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                {stat.value}
              </div>
              <h3 className="text-lg font-semibold text-brand-blue mb-3 font-sans">
                {stat.label}
              </h3>
              <p className="text-brand-blue/60 text-sm leading-relaxed font-sans">
                {stat.description}
              </p>
              
              <div className="hidden md:block absolute right-[-24px] lg:right-[-48px] top-4 bottom-4 w-[1px] bg-brand-blue/10 last:hidden" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
