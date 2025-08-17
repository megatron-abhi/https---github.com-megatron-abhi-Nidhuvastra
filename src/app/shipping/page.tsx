export default function ShippingReturnsPage() {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-headline text-foreground">Shipping & Returns</h1>
              <p className="text-lg text-muted-foreground mt-2">Everything you need to know about our policies.</p>
            </div>
  
            <div className="prose prose-lg dark:prose-invert mx-auto space-y-8">
              {/* Shipping Policy */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
                <h3 className="text-xl font-semibold">Shipping Area</h3>
                <p>
                  We currently ship to all serviceable pin codes within India. We are unable to ship to international destinations at this time.
                </p>
                <h3 className="text-xl font-semibold">Shipping Charges</h3>
                <p>
                  We are delighted to offer FREE shipping on all prepaid orders above ₹5000. For orders below this amount, a nominal shipping fee will be applied at checkout.
                </p>
                <h3 className="text-xl font-semibold">Dispatch & Delivery</h3>
                <p>
                  Orders are dispatched from our warehouse within 2-3 business days of receiving the order. It typically takes 5-7 business days for the delivery to reach you, depending on your location. You will receive a tracking link via email once your order has been shipped.
                </p>
              </div>
  
              {/* Returns & Exchanges */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Returns & Exchange Policy</h2>
                <h3 className="text-xl font-semibold">7-Day Easy Returns</h3>
                <p>
                  We want you to love your purchase. If you are not completely satisfied, you can initiate a return or exchange within 7 days of receiving your order.
                </p>
                <h3 className="text-xl font-semibold">Conditions for Return/Exchange</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>The product must be in its original, unused, and unwashed condition.</li>
                  <li>All original tags and packaging must be intact.</li>
                  <li>Returns will not be accepted if the product has been tampered with.</li>
                </ul>
                <h3 className="text-xl font-semibold">How to Initiate a Return</h3>
                <p>
                  To initiate a return or exchange, please email us at <a href="mailto:support@nidhuvastra.com" className="text-primary hover:underline">support@nidhuvastra.com</a> with your order number and the reason for the return. Our team will guide you through the process.
                </p>
                 <h3 className="text-xl font-semibold">Refunds</h3>
                <p>
                  Once we receive and inspect the returned product, we will process your refund. The amount will be credited to your original payment method within 5-7 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  