
import React from 'react';
import { Layout } from '@/components/Layout';

const TermsAndConditions = () => {
  return (
    <Layout>
      <div className="layout-container py-8 sm:py-12">
        <article className="prose prose-zinc lg:prose-lg max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Terms and Conditions for Size My Bag</h1>
          <p className="text-zinc-500 mb-6">Effective Date: 11 March 2025</p>
          
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Welcome to Size My Bag (the "Website"). By using this Website, you agree to the following Terms and Conditions. If you do not agree, please do not use the Website.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of the Website</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may use this Website for personal, non-commercial purposes.</li>
              <li>You must be at least 18 years old or have permission from a legal guardian to use this service.</li>
              <li>We reserve the right to restrict or terminate access for users who violate these Terms.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Accuracy of Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We strive to provide up-to-date airline baggage policies, but we do not guarantee accuracy.</li>
              <li>Always verify baggage policies on official airline websites before booking flights.</li>
              <li>We are not responsible for errors, outdated information, or incorrect baggage fees.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Affiliate Links & Advertisements</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Some links on the Website may be affiliate links, meaning we earn a commission if you make a purchase through them.</li>
              <li>Advertisements displayed on the Website may be from third-party networks, and we are not responsible for their content.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitation of Liability</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Website is provided "as is" without warranties of any kind.</li>
              <li>We are not liable for any financial loss, missed flights, or additional baggage fees incurred due to reliance on Website information.</li>
              <li>We are not responsible for any third-party links, including airline websites or affiliate partners.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All content, including text, graphics, and website design, is owned by Size My Bag or used with permission.</li>
              <li>You may not copy, modify, distribute, or reproduce any content without explicit permission.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to the Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We reserve the right to modify these Terms at any time.</li>
              <li>Any updates will be posted on this page with an updated "Effective Date."</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>These Terms are governed by the laws of [Insert Jurisdiction].</li>
              <li>Any disputes shall be resolved in the courts of [Insert Jurisdiction].</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Information</h2>
            <p className="text-lg leading-relaxed">
              For any questions about these Terms, contact us at:<br />
              deb@startumproject.com
            </p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
