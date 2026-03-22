'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate with email service (Resend, Formspree, etc)
    setSubmitted(true)
  }

  return (
    <main className="max-w-[680px] mx-auto px-6 lg:px-8 py-20 pb-32 min-h-screen animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 text-foreground leading-[1.1]">Contact Us</h1>
        <p className="text-xl md:text-2xl text-muted font-serif italic text-balance font-light">
          Inquiries, story tips, or press passes? We&apos;d love to hear from you.
        </p>
      </div>

      {submitted ? (
        <div className="border-l-4 border-accent bg-stone-50 dark:bg-stone-900/50 p-10 text-center text-foreground font-serif text-xl md:text-2xl leading-relaxed rounded-r-sm">
          Thank you for reaching out. A member of our editorial staff will be in touch shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 font-sans pt-6 border-t-2 border-foreground">
          <div className="flex flex-col gap-3 group">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted group-focus-within:text-accent transition-colors">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-card-bg border border-border px-4 py-4 text-lg font-serif text-foreground placeholder-stone-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all rounded-sm shadow-sm"
              placeholder="Your full name"
            />
          </div>

          <div className="flex flex-col gap-3 group">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted group-focus-within:text-accent transition-colors">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-card-bg border border-border px-4 py-4 text-lg font-serif text-foreground placeholder-stone-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all rounded-sm shadow-sm"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col gap-3 group">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted group-focus-within:text-accent transition-colors">Message</label>
            <textarea
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-card-bg border border-border px-4 py-4 text-lg font-serif text-foreground placeholder-stone-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none rounded-sm shadow-sm"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            className="mt-6 self-start px-10 py-4 bg-accent text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#A00F18] transition-all duration-300 rounded-sm hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      )}
    </main>
  )
}