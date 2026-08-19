import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ExternalLink, Calendar, ChevronRight, Share2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const PERSPECTIVES = [];

export function Perspectives() {
  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title="Our Firm in the Media | Press & Industry Insights | Cor Capital"
        description="Stay informed with the latest news, announcements, press coverage, and insights from Cor Capital Management LLC."
        canonicalPath="/perspectives"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Cor Capital in the Media",
          "description": "Press releases, news coverage, and market insights from Cor Capital Management LLC."
        }}
      />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 bg-brand-blue text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2000&auto=format&fit=crop" 
              alt="Cor Capital Perspectives" 
              className="w-full h-full object-cover grayscale opacity-20 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 backdrop-blur-sm">
                Latest Updates
              </span>
              <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8">
                Our Firm in the Media
              </h1>
              <p className="text-xl text-brand-light-gray max-w-2xl leading-relaxed">
                Stay informed with the latest news, announcements, and press coverage from Cor Capital.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gray-50 min-h-[40vh]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {PERSPECTIVES.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg italic">Articles coming soon.</p>
              </div>
            ) : (
              <>
                {/* Featured Post */}
                <div className="mb-16">
                  {PERSPECTIVES.filter(p => p.featured).map(post => (
                    <motion.div 
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group relative grid grid-cols-1 lg:grid-cols-2 bg-white overflow-hidden shadow-xl"
                    >
                      <div className="relative h-96 lg:h-auto overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 lg:p-16 flex flex-col justify-center">
                        <div className="flex items-center text-xs text-brand-accent font-bold uppercase tracking-widest mb-4">
                          {post.category}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-medium text-brand-blue mb-6 leading-tight">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <button className="flex items-center text-brand-blue font-bold uppercase text-xs tracking-widest hover:text-brand-accent transition-colors group/btn">
                            Read Story <ChevronRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                          <div className="flex items-center text-gray-400 space-x-1">
                            <Calendar size={14} />
                            <span className="text-[10px] uppercase font-bold tracking-tighter">{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )) || null}
                </div>

                {/* Grid Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PERSPECTIVES.filter(p => !p.featured).map((post, idx) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white flex flex-col h-full group shadow-md hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em] px-2 py-1 bg-brand-accent/5 rounded">
                            {post.category}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight flex items-center">
                            <Calendar size={12} className="mr-1" /> {post.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-medium text-brand-blue mb-4 leading-snug grow group-hover:text-brand-accent transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                          <button className="flex items-center text-brand-blue font-bold uppercase text-[10px] tracking-widest group/more">
                            Full Article <ChevronRight size={12} className="ml-1 group-hover/more:translate-x-1 transition-transform" />
                          </button>
                          <button className="text-gray-300 hover:text-brand-accent transition-colors">
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )) || null}
                </div>

                {/* Load More Button */}
                <div className="mt-20 flex justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-transparent border-2 border-brand-blue text-brand-blue text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-blue hover:text-white transition-all duration-300 shadow-lg"
                  >
                    Load More Updates
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Perspectives;
