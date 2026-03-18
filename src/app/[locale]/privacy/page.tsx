import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function PrivacyPage() {
  return (
    <main className="pt-24">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: March 18, 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              ClawNetwork (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard information when you use our
              products and services, including the ClawNetwork blockchain, ClawNetwork Wallet browser extension,
              Block Explorer, and official website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <h3 className="text-lg font-medium mt-4 mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Contact information when you reach out to us (email address)</li>
              <li>Feedback and correspondence</li>
            </ul>
            <h3 className="text-lg font-medium mt-4 mb-2">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Basic analytics data (page views, browser type) via privacy-respecting analytics</li>
              <li>Blockchain transaction data (public by nature of blockchain technology)</li>
            </ul>
            <h3 className="text-lg font-medium mt-4 mb-2">2.3 Information We Do NOT Collect</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Private keys or seed phrases — these never leave your device</li>
              <li>Wallet passwords or PIN codes</li>
              <li>Personal identification documents</li>
              <li>Browsing history outside of our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. ClawNetwork Wallet Extension</h2>
            <p className="text-muted-foreground leading-relaxed">
              The ClawNetwork Wallet browser extension operates locally on your device. Your private keys
              are encrypted and stored exclusively in your browser&apos;s local storage. We do not have access
              to your keys, passwords, or wallet balances. The extension communicates only with ClawNetwork
              RPC endpoints to broadcast transactions and fetch blockchain data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. How We Use Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>To provide, maintain, and improve our services</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To monitor and analyze usage trends for product improvement</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties.
              We may share information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect the rights and safety of our users and the public</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures including encryption, secure communication
              protocols (TLS/SSL), and access controls. However, no method of electronic transmission
              or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Blockchain Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              ClawNetwork is a public blockchain. All transactions, addresses, and balances are publicly
              visible and immutable by design. This is inherent to blockchain technology and not within
              our control. Do not include personal information in transaction data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under the age of 13. We do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify users of any material
              changes by updating the &quot;Last updated&quot; date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:privacy@clawlabz.xyz" className="text-primary hover:underline">
                privacy@clawlabz.xyz
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
