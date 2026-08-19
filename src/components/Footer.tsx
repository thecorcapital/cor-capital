
export function Footer() {
  return (
    <footer role="contentinfo" className="bg-[#050C17] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/10 pb-16">
          <div className="lg:col-span-1">
            <a href="/" title="Cor Capital Home">
              <img 
                src="https://static.wixstatic.com/media/4d302e_ac5a98bb84b54d0098961a809703cb20~mv2.png" 
                alt="Cor Capital Management Logo" 
                className="h-10 mb-6 brightness-0 invert hover:opacity-80 transition-opacity" 
              />
            </a>
            <p className="text-white/60 text-sm max-w-xs leading-relaxed">
              A global asset management firm that invests in multiple asset classes and strategies worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-6 font-semibold">The Firm</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><a href="/our-values" className="hover:text-white transition-colors">Our Values</a></li>
              <li><a href="/leadership" className="hover:text-white transition-colors">Leadership</a></li>
              <li><a href="/perspectives" className="hover:text-white transition-colors">Our Firm in the Media</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-6 font-semibold">Our Focus</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><a href="/what-we-do" className="hover:text-white transition-colors">What We Do</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-6 font-semibold">Our Office</h4>
            <div className="text-sm text-white/70 space-y-4">
              <p>
                Cor Capital Management LLC<br />
                San Antonio, Texas
              </p>

            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Cor Capital Management LLC. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a 
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=7ed26027-089a-432f-b86e-62bc79bad319" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=9adf4e42-2048-4a99-aae6-d9c7985cc76c" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </a>
            <a 
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=442a4e45-6f04-4751-9021-d93572b3c020" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
