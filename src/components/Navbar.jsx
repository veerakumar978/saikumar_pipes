import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Brands', href: '#brands' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      // Update active nav item based on current scroll position
      const sectionIds = ['#home', '#about', '#products', '#brands', '#contact'];
      const scrollPosition = window.scrollY + 140;
      let current = '#home';

      for (const id of sectionIds) {
        const el = document.querySelector(id);
        if (el && el.offsetTop <= scrollPosition) {
          current = id;
        }
      }
      setActiveHref(current);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setActiveHref(href);
    setMobileOpen(false);

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E5EDF5] transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_6px_24px_-8px_rgba(18,59,104,0.12)]' : 'shadow-none'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[70px] lg:h-[76px] items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2785CE] rounded-md"
            aria-label="SAAIKUMAR Valves & Cocks — Home"
          >
            <img
              src="/logo.png"
              alt="SAAIKUMAR Valves & Cocks"
              width={1498}
              height={436}
              className="h-8 min-[360px]:h-9 sm:h-10 lg:h-11 w-auto max-w-[160px] min-[360px]:max-w-[175px] sm:max-w-[200px] object-contain select-none"
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative md:px-2.5 lg:px-3.5 py-2 text-[0.9375rem] font-medium rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] ${
                    isActive
                      ? 'text-[#123B68]'
                      : 'text-[#263746] hover:text-[#2785CE] hover:bg-[#F0F7FF]/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-x-2.5 lg:inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-[#2785CE]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center shrink-0">
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center justify-center rounded-lg bg-[#2785CE] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(39,133,206,0.28)] hover:bg-[#1E6EAD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] transition-colors duration-150"
            >
              Contact Us
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-lg border border-[#E5EDF5] text-[#123B68] hover:bg-[#F0F7FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2785CE] transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-[#E5EDF5] bg-white shadow-[0_12px_28px_-12px_rgba(18,59,104,0.14)]"
          >
            <div className="mx-auto max-w-7xl px-4 pt-3 pb-5 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-3 text-[0.95rem] font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F0F7FF] text-[#123B68] font-semibold'
                        : 'text-[#263746] hover:bg-[#F0F7FF]/70 hover:text-[#2785CE]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2785CE]" aria-hidden="true" />
                    )}
                  </a>
                );
              })}

              <div className="pt-3 border-t border-[#E5EDF5]">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex w-full items-center justify-center rounded-lg bg-[#2785CE] px-5 py-3 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(39,133,206,0.25)] hover:bg-[#1E6EAD] transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
