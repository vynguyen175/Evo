import Link from 'next/link';
import Container from './ui/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    aritzia: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Impact', href: '#' },
      { label: 'Investor Relations', href: '#' },
      { label: 'Media Room', href: '#' },
      { label: 'Store Locator', href: '#' },
      { label: 'Fabric Care', href: '#' },
      { label: 'Accessibility', href: '#' },
      { label: 'Gift Cards', href: '#' },
      { label: 'Find a List', href: '#' },
      { label: 'Our Services', href: '#' },
    ],
    help: [
      { label: 'Contact Us', href: '#' },
      { label: 'Size Guide', href: '#' },
      { label: 'Shipping', href: '#' },
      { label: 'Returns & Exchanges', href: '#' },
      { label: 'Payment & Security', href: '#' },
      { label: 'Order Tracking', href: '#' },
      { label: 'Promotion Details', href: '#' },
      { label: 'Special Orders', href: '#' },
      { label: 'Statement Regarding Modern Slavery', href: '#' },
      { label: 'Give Website Feedback', href: '#' },
      { label: 'Klarna', href: '#' },
    ],
  };

  return (
    <footer className="bg-white text-neutral-900 mt-24 md:mt-32 border-t border-neutral-200">
      <Container>
        <div className="py-24 md:py-32">
          {/* Newsletter Section */}
          <div className="mb-20 pb-16 border-b border-neutral-200">
            <div className="max-w-2xl">
              <h2 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6 text-neutral-900">
                Join the ÉVO list
              </h2>
              <p className="text-neutral-600 text-sm font-light mb-6">
                Early notice on drops, events, and the pieces we're excited about.
              </p>
              <form className="flex gap-0 mb-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 px-5 py-3 text-sm bg-neutral-50 text-neutral-900 placeholder-neutral-400 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-3 text-sm bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  →
                </button>
              </form>
              <p className="text-[12px] text-neutral-600 leading-relaxed">
                Emails come from ÉVO LP | 30 Alentejo St | Unsubscribe anytime | <Link href="#" className="underline hover:text-neutral-900">Privacy Policy</Link>
              </p>
            </div>
          </div>

          {/* Research Community Section */}
          <div className="mb-20 pb-16 border-b border-neutral-200">
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6 text-neutral-900">
              ÉVO Insider Community
            </h3>
            <p className="text-neutral-600 text-sm font-light mb-6 max-w-2xl">
              Share your takes, shape the next collections, and get occasional ÉVO gift cards as a thank you.
            </p>
            <Link href="#" className="text-neutral-900 text-sm underline hover:text-neutral-600 transition-colors">
              Become an ÉVO Insider
            </Link>
          </div>

          {/* Main Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 mb-20">
            {/* Social & App */}
            <div>
              <div className="flex items-center gap-5 mb-12">
                <a href="#" aria-label="TikTok" className="text-neutral-900 hover:text-neutral-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.1z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="text-neutral-900 hover:text-neutral-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Pinterest" className="text-neutral-900 hover:text-neutral-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className="text-neutral-900 hover:text-neutral-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
              <a href="#" className="block">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 40'%3E%3Ctext x='10' y='25' font-family='Arial' font-size='12' fill='%23000'%3EApp Store%3C/text%3E%3C/svg%3E"
                  alt="Download on the App Store"
                  className="h-10 opacity-70 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

            {/* ÉVO Links */}
            <div>
              <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-900 mb-8">
                ÉVO
              </h3>
              <ul className="space-y-5">
                {footerLinks.aritzia.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Help Links */}
            <div>
              <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-900 mb-8">
                Get Help
              </h3>
              <ul className="space-y-5">
                {footerLinks.help.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-xs text-neutral-500">
            <p>© {currentYear} ÉVO. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <Link href="#" className="hover:text-neutral-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-neutral-900 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-neutral-900 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
