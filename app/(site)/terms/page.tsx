import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
}

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-neutral-400 text-sm mb-10">Last updated: March 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using NewsBlog, you accept and agree to be bound
          by these Terms of Service. If you do not agree, please do not use
          this website.
        </p>

        <h2>2. Content</h2>
        <p>
          All content published on NewsBlog is for informational purposes only.
          We strive for accuracy but make no guarantees regarding the completeness
          or reliability of any information.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          All content on this site, including articles, images, and logos, is
          the property of NewsBlog unless otherwise stated. You may not reproduce
          or distribute our content without written permission.
        </p>

        <h2>4. User Conduct</h2>
        <p>
          You agree not to use this site for any unlawful purpose or in any
          way that could damage, disable, or impair the site or interfere with
          other users' enjoyment.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          NewsBlog shall not be liable for any indirect, incidental, or
          consequential damages arising from your use of, or inability to
          use, this website.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued
          use of the site after changes constitutes acceptance of the new terms.
        </p>

        <h2>7. Contact</h2>
        <p>
          For questions about these Terms, contact us at{' '}
          <a href="mailto:hello@newsblog.com" className="text-blue-600 dark:text-blue-400 hover:underline">
            hello@newsblog.com
          </a>
        </p>
      </div>
    </main>
  )
}