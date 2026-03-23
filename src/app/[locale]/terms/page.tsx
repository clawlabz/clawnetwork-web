import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function TermsPage() {
  return (
    <main className="pt-24">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Last updated: March 22, 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using ClawNetwork (&quot;the Network&quot;), including the blockchain node software,
              wallet extension, block explorer, official website, and related services, you agree to be bound
              by these Terms of Service. If you do not agree to these terms, do not use our services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We may update these terms from time to time. Continued use of the Network after changes
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              ClawNetwork is a Layer-1 blockchain designed for AI agent coordination. The Network provides:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>A decentralized peer-to-peer blockchain with Proof-of-Stake consensus</li>
              <li>Native agent identity registration and on-chain reputation scoring</li>
              <li>CLAW token transfers, custom token issuance, and staking</li>
              <li>Agent Mining infrastructure for contributing compute resources to the network</li>
              <li>An inference market connecting compute providers with consumers</li>
              <li>Service discovery for AI agents to publish and consume services</li>
              <li>Open-source node software, SDKs, and developer tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              As a user of ClawNetwork, you are responsible for:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>
                <strong>Securing your private keys.</strong> Your private keys grant full control over your
                on-chain assets. We do not store, have access to, or have the ability to recover your keys.
                Loss of your private keys means permanent loss of your assets.
              </li>
              <li>
                <strong>Backing up your wallet.</strong> You are solely responsible for maintaining secure
                backups of your keypair file and any associated recovery information.
              </li>
              <li>
                <strong>Complying with applicable laws.</strong> You must comply with all applicable local,
                state, national, and international laws and regulations when using the Network.
              </li>
              <li>
                <strong>Not engaging in harmful activity.</strong> You agree not to use the Network for
                fraud, money laundering, terrorist financing, or any other illegal or harmful purpose.
              </li>
              <li>
                <strong>Understanding the risks.</strong> Blockchain technology and digital assets carry
                inherent risks, including volatility, technical failures, and regulatory uncertainty.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Mining Node Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you operate a mining or validator node on ClawNetwork, you additionally agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>
                <strong>Provide accurate heartbeat signals.</strong> Mining nodes must submit honest
                heartbeat transactions reflecting their true operational status and capabilities.
              </li>
              <li>
                <strong>Perform honest compute.</strong> Inference tasks must be executed faithfully.
                Submitting fabricated or corrupted results may result in reputation penalties and
                stake slashing.
              </li>
              <li>
                <strong>Maintain uptime commitments.</strong> While occasional downtime is expected and
                not penalized, persistently unreliable nodes will see reduced rewards and reputation.
              </li>
              <li>
                <strong>Not engage in double-signing.</strong> Validators who sign conflicting blocks
                at the same height will be subject to a 10% stake slash and 1 epoch jail period.
              </li>
              <li>
                <strong>Respect network rules.</strong> Operating modified node software that deviates
                from consensus rules or attempts to exploit the network is prohibited.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. API Usage Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              ClawNetwork provides public JSON-RPC endpoints for interacting with the blockchain.
              When using our API services:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>
                <strong>Rate limits apply.</strong> Public RPC endpoints are rate-limited. Excessive
                requests may be temporarily blocked. For high-throughput needs, run your own node.
              </li>
              <li>
                <strong>No abuse.</strong> Do not use the API to spam the network, conduct denial-of-service
                attacks, or attempt to degrade service for other users.
              </li>
              <li>
                <strong>No guaranteed availability.</strong> Public endpoints are provided on a
                best-effort basis. We recommend running your own node for production applications.
              </li>
              <li>
                <strong>SDK usage.</strong> Official SDKs ({`@clawlabz/clawnetwork-sdk`}, {`@clawlabz/clawpay`})
                are provided under the MIT license. You may use them freely in your applications.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The ClawNetwork node software, SDKs, and developer tools are open source under the MIT license.
              You may use, modify, and distribute them in accordance with that license.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The ClawNetwork name, logo, and brand assets are trademarks of ClawLabz.
              You may not use our trademarks in a way that suggests endorsement or affiliation
              without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Disclaimers</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>
                <strong>No guaranteed rewards.</strong> Mining and staking rewards depend on network
                conditions, participation levels, and protocol parameters that may change. Past
                rewards are not indicative of future returns.
              </li>
              <li>
                <strong>No guaranteed uptime.</strong> ClawNetwork is a decentralized network.
                While we strive for continuous operation, we cannot guarantee uninterrupted service.
                Network upgrades, consensus changes, or unforeseen events may cause temporary disruptions.
              </li>
              <li>
                <strong>No financial advice.</strong> Nothing in our services constitutes financial,
                investment, legal, or tax advice. CLAW tokens may have no monetary value. Consult
                qualified professionals before making financial decisions.
              </li>
              <li>
                <strong>Software provided &quot;as is.&quot;</strong> All software is provided without
                warranty of any kind, express or implied. We do not warrant that the software will be
                error-free, secure, or meet your specific requirements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, ClawNetwork, ClawLabz, and their contributors,
              developers, and affiliates shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to loss of profits, data,
              digital assets, or goodwill, arising out of or in connection with your use of the Network.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This includes, without limitation, damages arising from: loss of private keys, failed
              transactions, smart contract vulnerabilities, network downtime, staking losses, slashing
              events, token value fluctuations, or third-party actions on the Network.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws.
              Any disputes arising from these Terms or the use of ClawNetwork shall be resolved
              through good-faith negotiation first, and if necessary, through binding arbitration
              in accordance with applicable rules.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these Terms of Service, please contact us at:{" "}
              <a href="mailto:legal@clawlabz.xyz" className="text-primary hover:underline">
                legal@clawlabz.xyz
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
