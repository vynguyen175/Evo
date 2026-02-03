"use client";

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Container>
      <div className="pt-20 md:pt-24 pb-12 md:pb-16 text-center border-b border-neutral-200">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900">
          Get in Touch
        </h1>
      </div>

      <div className="py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Contact Form */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-8">
              Send us a message
            </h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded">
                <p className="font-medium">Thank you for reaching out!</p>
                <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-neutral-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-neutral-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-neutral-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="shipping">Shipping</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors resize-y"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm tracking-widest uppercase text-neutral-500 mb-3">
                  Customer Service
                </h3>
                <p className="text-neutral-900 mb-2">Monday - Friday: 9AM - 6PM EST</p>
                <p className="text-neutral-900 mb-2">Saturday - Sunday: 10AM - 4PM EST</p>
                <a href="mailto:hello@evostore.com" className="text-neutral-900 underline hover:text-neutral-600 transition-colors">
                  hello@evostore.com
                </a>
              </div>

              <div>
                <h3 className="text-sm tracking-widest uppercase text-neutral-500 mb-3">
                  Address
                </h3>
                <p className="text-neutral-900">
                  ÉVO LP<br />
                  30 Alentejo St<br />
                  Vancouver, BC<br />
                  Canada
                </p>
              </div>

              <div>
                <h3 className="text-sm tracking-widest uppercase text-neutral-500 mb-3">
                  Phone
                </h3>
                <a href="tel:+18005550123" className="text-neutral-900 hover:text-neutral-600 transition-colors">
                  1-800-555-0123
                </a>
              </div>

              <div>
                <h3 className="text-sm tracking-widest uppercase text-neutral-500 mb-3">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a href="#" className="text-neutral-900 hover:text-neutral-600 transition-colors" aria-label="Instagram">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-neutral-900 hover:text-neutral-600 transition-colors" aria-label="TikTok">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.1z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-neutral-900 hover:text-neutral-600 transition-colors" aria-label="Pinterest">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="pb-20 md:pb-32 border-t border-neutral-200 pt-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600">Quick answers to common questions</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <details className="group border-b border-neutral-200 pb-4">
            <summary className="flex justify-between items-center cursor-pointer py-4 text-neutral-900 font-medium">
              <span>What is your return policy?</span>
              <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-neutral-600 pt-2 leading-relaxed">
              We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and in their original condition with tags attached.
            </p>
          </details>

          <details className="group border-b border-neutral-200 pb-4">
            <summary className="flex justify-between items-center cursor-pointer py-4 text-neutral-900 font-medium">
              <span>How long does shipping take?</span>
              <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-neutral-600 pt-2 leading-relaxed">
              Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available at checkout. Free standard shipping on orders over $200.
            </p>
          </details>

          <details className="group border-b border-neutral-200 pb-4">
            <summary className="flex justify-between items-center cursor-pointer py-4 text-neutral-900 font-medium">
              <span>Do you ship internationally?</span>
              <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-neutral-600 pt-2 leading-relaxed">
              Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Customs duties and taxes are the responsibility of the recipient.
            </p>
          </details>

          <details className="group border-b border-neutral-200 pb-4">
            <summary className="flex justify-between items-center cursor-pointer py-4 text-neutral-900 font-medium">
              <span>How do I find my size?</span>
              <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-neutral-600 pt-2 leading-relaxed">
              Please refer to our size guide available on each product page. If you're between sizes, we recommend sizing up for a more relaxed fit or sizing down for a fitted look.
            </p>
          </details>
        </div>
      </section>
    </Container>
  );
}
