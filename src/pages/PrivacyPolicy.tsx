
import React from 'react';
import { Layout } from '@/components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="layout-container py-8 sm:py-12">
        <article className="prose prose-zinc lg:prose-lg max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Privacy Policy for Luggage Size Checker</h1>
          <p className="text-zinc-500 mb-6">Effective Date: 11 March 2025</p>
          
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Welcome to Size My Bag (the "Website"). Your privacy is important to us, and we are committed to protecting any personal data you provide while using our services. This Privacy Policy explains how we collect, use, and protect your information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-lg leading-relaxed">
              We may collect the following types of data when you use our Website:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> If you contact us or subscribe to updates, we may collect your name, email address, and other contact details.</li>
              <li><strong>Usage Data:</strong> We automatically collect data such as your IP address, browser type, device type, and pages visited to improve our service.</li>
              <li><strong>Cookies:</strong> We use cookies to enhance user experience and analyze traffic. You can disable cookies in your browser settings.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-lg leading-relaxed">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our Website functionality</li>
              <li>Respond to inquiries and customer support requests</li>
              <li>Analyze user activity to optimize user experience</li>
              <li>Display relevant advertisements and affiliate links</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
            <p className="text-lg leading-relaxed">
              We do not sell or rent your personal data. However, we may share information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Third-party services (e.g., analytics, hosting, advertising) that assist in Website operations.</li>
              <li><strong>Legal Authorities:</strong> If required by law or in response to valid legal requests.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Links & Services</h2>
            <p className="text-lg leading-relaxed">
              Our Website may contain links to external sites (e.g., airline websites, affiliate partners). We are not responsible for their privacy practices. Please review their policies before providing personal data.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="text-lg leading-relaxed">
              We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is completely secure.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
            <p className="text-lg leading-relaxed">
              Depending on your jurisdiction, you may have rights regarding your data, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access, update, or delete your data</li>
              <li>The right to opt-out of data collection (e.g., disabling cookies)</li>
              <li>The right to file a complaint with a regulatory authority</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
            <p className="text-lg leading-relaxed">
              We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated "Last Updated" date.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p className="text-lg leading-relaxed">
              If you have any questions regarding this Privacy Policy, you can contact us at:<br />
              deb@startumproject.com
            </p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
