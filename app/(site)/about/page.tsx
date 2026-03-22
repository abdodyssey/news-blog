import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about NewsBlog',
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">About NewsBlog</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <p>
          NewsBlog is a modern news and blog platform built to deliver
          high-quality content across technology, business, and lifestyle.
          Our mission is to keep you informed, inspired, and ahead of the curve.
        </p>

        <h2>Our Mission</h2>
        <p>
          We believe great journalism and thoughtful writing can change
          perspectives. Every article we publish is crafted with care,
          accuracy, and a commitment to the reader first.
        </p>

        <h2>Our Team</h2>
        <p>
          We are a small team of writers, editors, and developers passionate
          about the intersection of technology and storytelling. Based across
          multiple time zones, we work remotely and asynchronously.
        </p>

        <h2>Contact Us</h2>
        <p>
          Have a story tip or want to contribute? Reach out to us at{' '}
          <a href="mailto:hello@newsblog.com" className="text-blue-600 dark:text-blue-400 hover:underline">
            hello@newsblog.com
          </a>
        </p>
      </div>
    </main>
  )
}