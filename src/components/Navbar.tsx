import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

const navLinks = [
  {
    name: 'About Us',
    href: '#',
    sublinks: [
      { name: 'What We Do', href: '/what-we-do' },
      { name: 'Our Values', href: '/our-values' },
      { name: 'Leadership', href: '/leadership' },
    ]
  },
  {
    name: 'News',
    href: '#',
    sublinks: [
      { name: 'Our Firm in the Media', href: '/perspectives' },
    ]
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = isScrolled || activeMenu !== null || mobileMenuOpen;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 w-full z-50 transition-[background-color,padding] duration-500 ${
          isSolid 
            ? 'bg-white/95 backdrop-blur-xl shadow-sm py-5' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex md:space-x-8 lg:space-x-16 items-center justify-between">
          <div className="flex items-center flex-1">
            <a href="/" onClick={() => { setActiveMenu(null); setMobileMenuOpen(false); }} className="flex items-center gap-2 group z-50 relative">
              <img 
                src={!isSolid 
                  ? "https://static.wixstatic.com/media/4d302e_ac5a98bb84b54d0098961a809703cb20~mv2.png"
                  : "https://static.wixstatic.com/media/4d302e_e35050a8d5ea4956af1fa099eeef62ab~mv2.png"
                } 
                alt="Cor Capital Logo" 
                className={`h-10 transition-all duration-500 ${!isSolid ? 'brightness-0 invert' : ''}`} 
              />
            </a>
          </div>

          <div className="hidden md:flex items-center md:space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              link.sublinks ? (
                <button
                  key={link.name}
                  onClick={() => setActiveMenu(activeMenu === link.name ? null : link.name)}
                  className={`flex items-center gap-2 md:text-sm lg:text-lg font-medium tracking-wide uppercase transition-colors duration-300 relative group overflow-hidden py-1 ${
                    isSolid ? 'text-brand-blue/80 hover:text-brand-blue' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-400 ease-out ${activeMenu === link.name ? 'rotate-180 text-brand-accent' : ''}`} />
                  <span className={`absolute bottom-0 left-0 w-full h-[1.5px] origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    activeMenu === link.name ? 'scale-x-100 bg-brand-accent' : `scale-x-0 ${isSolid ? 'bg-brand-blue/20' : 'bg-white/50'}`
                  }`} />
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 md:text-sm lg:text-lg font-medium tracking-wide uppercase transition-colors duration-300 relative group overflow-hidden py-1 ${
                    isSolid ? 'text-brand-blue/80 hover:text-brand-blue' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-blue/20 origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100 ${
                    !isSolid && 'bg-white/50'
                  }`} />
                </a>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center justify-end flex-1 relative z-50">
            <a 
              href="https://portal.navfundservices.com/navportalcore/login" 
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 text-[10px] lg:text-sm font-semibold tracking-widest uppercase border md:px-3 md:py-2 lg:px-6 lg:py-3 transition-all duration-300 ${
                isSolid 
                  ? 'border-brand-blue/20 hover:border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue/5' 
                  : 'border-white/30 hover:bg-white hover:text-brand-blue text-white'
              }`}
            >
              For Investors
            </a>
          </div>

          <div className="md:hidden flex items-center relative z-50">
            <button 
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setActiveMenu(null);
              }}
              className={`transition-colors duration-300 ${isSolid ? 'text-brand-blue' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMenu && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-0 w-screen h-screen bg-brand-blue/20 backdrop-blur-sm"
                onClick={() => setActiveMenu(null)}
              />
              
              {/* Dropdown Panel */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full left-0 w-full bg-white overflow-hidden shadow-2xl border-t border-brand-blue/5"
              >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                  <div className="grid grid-cols-4 gap-12 pt-2">
                    <div className="col-span-1 border-r border-brand-blue/10 pr-8 flex flex-col items-start">
                      <h3 className="text-4xl lg:text-5xl font-serif text-brand-blue">{activeMenu}</h3>
                      <a 
                        href={navLinks.find(l => l.name === activeMenu)?.sublinks?.[0]?.href || '#'}
                        className="mt-8 text-base font-semibold text-brand-accent tracking-wide uppercase flex items-center gap-2 group"
                      >
                        Explore All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                    
                    <div className="col-span-3">
                      <motion.div 
                        key={activeMenu}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={{
                         initial: { opacity: 0 },
                         animate: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                         exit: { opacity: 0 }
                        }}
                        className="flex flex-wrap items-center"
                      >
                         {navLinks.find(l => l.name === activeMenu)?.sublinks?.map((sub, i) => (
                           <motion.a
                             key={sub.name}
                             href={sub.href}
                             variants={{
                               initial: { opacity: 0, y: 15 },
                               animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                               exit: { opacity: 0, y: -10 }
                             }}
                             className={`text-2xl font-medium text-brand-blue/70 hover:text-brand-accent transition-colors flex items-center group px-12 py-10 first:pl-0 border-l border-brand-blue/10 first:border-l-0`}
                           >
                             <span className="relative">
                               {sub.name}
                               <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-accent origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                             </span>
                           </motion.a>
                         ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[40] bg-white pt-28 px-6 pb-12 overflow-y-auto w-full h-[100dvh]"
          >
            <div className="flex flex-col space-y-10">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                  className="flex flex-col"
                >
                  <h3 className="text-4xl font-serif text-brand-blue mb-6 tracking-tight">{link.name}</h3>
                  {link.sublinks && (
                    <div className="flex flex-col space-y-6 pl-5 border-l border-brand-blue/10">
                      {link.sublinks.map((sub) => (
                        <a key={sub.name} href={sub.href} className="text-brand-blue/70 text-xl hover:text-brand-accent transition-colors">
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-16 mb-8 border-t border-brand-blue/10 pt-10">
              <a 
                href="https://portal.navfundservices.com/navportalcore/login" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center text-sm font-semibold tracking-widest uppercase border border-brand-blue/20 px-6 py-4 text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300"
              >
                For Investors
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
