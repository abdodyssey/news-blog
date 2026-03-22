import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-neutral-400 text-sm mb-10">Last updated: March 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you
          contact us via our contact form. This may include your name and email address.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to respond to your inquiries,
          improve our content, and understand how visitors interact with our site.
          We do not sell or share your personal data with third parties.
        </p>

        <h2>3. Cookies</h2>
        <p>
          We may use cookies to enhance your browsing experience. You can
          disable cookies through your browser settings at any time.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices of those sites and encourage
          you to review their privacy policies.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We take reasonable measures to protect your information from
          unauthorized access, disclosure, or destruction.
        </p>

        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will
          be posted on this page with an updated date.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, contact us at{' '}
          <a href="mailto:hello@newsblog.com" className="text-blue-600 dark:text-blue-400 hover:underline">
            hello@newsblog.com
          </a>
        </p>
      </div>
    </main>
  )
}