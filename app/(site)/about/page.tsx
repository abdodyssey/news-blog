import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about NewsBlog',
}

export default function AboutPage() {
  return (
    <main className="max-w-[680px] mx-auto px-6 lg:px-8 py-20 pb-32 min-h-screen">
      <h1 className="text-5xl md:text-7xl font-serif font-black mb-12 text-center text-balance text-foreground animate-fade-in">
        About Us
      </h1>

      <div className="prose prose-stone dark:prose-invert prose-lg 
        prose-p:text-[19px] prose-p:leading-[1.8] prose-p:font-sans prose-p:text-stone-800 dark:prose-p:text-stone-300 prose-p:mb-8
        prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground prose-headings:mt-16 prose-headings:mb-6
        prose-a:text-accent prose-a:decoration-accent/40 hover:prose-a:decoration-accent prose-a:underline-offset-4 prose-a:font-semibold
        max-w-none animate-fade-in" style={{ animationDelay: '100ms' }}>
        
        <p className="lead text-2xl md:text-[34px] font-serif text-muted font-light !leading-[1.4] mb-12 text-center text-balance border-none">
          NewsBlog is a modern reporting platform built to deliver
          high-quality insights across technology, business, and culture.
        </p>

        <h2 className="text-3xl font-serif font-bold text-foreground">Our Mission</h2>
        <p>
          We believe great journalism and thoughtful writing can change
          perspectives. Every article we publish is crafted with meticulous care,
          uncompromising accuracy, and a commitment to putting the reader first.
        </p>

        <h2 className="text-3xl font-serif font-bold text-foreground">Our Team</h2>
        <p>
          We are a globally distributed team of writers, editors, and engineers passionate
          about the intersection of technology and storytelling. Based across
          multiple time zones, we work asynchronously to bring you the best coverage.
        </p>

        <div className="my-20 flex justify-center">
          <div className="w-12 h-1 bg-accent" />
        </div>

        <div className="text-center font-sans not-prose">
          <h2 className="font-serif text-4xl font-bold mb-6 text-foreground">Contact Editorial</h2>
          <p className="font-serif text-xl text-muted font-light mb-8 italic">
            Have a story tip or want to contribute to our publication? Reach out to our editors.
          </p>
          <a href="mailto:hello@newsblog.com" className="inline-block px-8 py-4 bg-accent text-[10px] font-sans font-bold uppercase tracking-widest text-white hover:bg-[#A00F18] transition-colors rounded-sm shadow-md">
            Email the Desk
          </a>
        </div>
      </div>
    </main>
  )
}