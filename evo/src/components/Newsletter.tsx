"use client";

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, provider: 'email' }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        setMessage('Successfully subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setMessage('Google Sign-In coming soon!');
    setStatus('error');
    // TODO: Implement Google OAuth
  };

  return (
    <section className="w-full bg-neutral-900 text-white py-20 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl mx-auto text-center">
          {/* Heading */}
          <div className="mb-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-3 block">
              Stay Connected
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Join Our Community
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              Be the first to know about new arrivals, exclusive offers, and style inspiration.
            </p>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-white placeholder-neutral-500 focus:outline-none focus:border-white/50 focus:bg-white/[0.15] transition-all disabled:opacity-50 text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3.5 bg-white text-neutral-900 font-medium text-sm tracking-wide hover:bg-neutral-100 active:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8 max-w-lg mx-auto">
            <div className="flex-1 h-px bg-white/30"></div>
            <span className="text-xs text-neutral-400 uppercase tracking-widest px-2">Or</span>
            <div className="flex-1 h-px bg-white/30"></div>
          </div>

          {/* Google Sign In Button */}
          <div className="text-center">
            <button
              onClick={handleGoogleSignIn}
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors font-medium text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mt-6 p-4 text-sm rounded text-center max-w-lg mx-auto ${
                status === 'success'
                  ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                  : 'bg-red-500/10 border border-red-500/30 text-red-300'
              }`}
            >
              {message}
            </div>
          )}

          {/* Privacy Note */}
          <p className="mt-8 text-xs text-neutral-500 leading-relaxed text-center max-w-lg mx-auto">
            By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
