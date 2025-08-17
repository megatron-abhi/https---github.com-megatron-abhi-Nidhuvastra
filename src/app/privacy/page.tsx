export default function PrivacyPolicyPage() {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-headline text-foreground">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground mt-2">Last updated: August 17, 2024</p>
            </div>
  
            <div className="prose prose-lg dark:prose-invert mx-auto space-y-6">
              <p>
                Welcome to NidhuVastra. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
  
              <h2 className="text-2xl font-bold">1. Information We Collect</h2>
              <p>
                We may collect personal information from you such as your name, email address, postal address, phone number, and payment information when you place an order, subscribe to our newsletter, or contact us.
              </p>
  
              <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Process and fulfill your orders.</li>
                <li>Communicate with you about your orders and provide customer support.</li>
                <li>Send you promotional materials and newsletters, if you opt-in.</li>
                <li>Improve our website and services.</li>
                <li>Prevent fraudulent transactions and monitor for security.</li>
              </ul>
  
              <h2 className="text-2xl font-bold">3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside parties except to our trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
              </p>
  
              <h2 className="text-2xl font-bold">4. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>

              <h2 className="text-2xl font-bold">5. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. You can also opt-out of receiving marketing communications from us at any time.
              </p>
  
              <h2 className="text-2xl font-bold">6. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@nidhuvastra.com" className="text-primary hover:underline">support@nidhuvastra.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  