import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, and net banking through our secure payment gateway."
    },
    {
      question: "What is your return policy?",
      answer: "We offer an easy 7-day return policy for all our products. Please ensure the saree is unused, in its original condition, with all tags intact. For more details, please visit our Shipping & Returns page."
    },
    {
        question: "How long does shipping take?",
        answer: "Orders are typically dispatched within 2 business days. Delivery usually takes 5-7 business days depending on your location. We offer free shipping on all orders above ₹5000."
    },
    {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within India. We are working on expanding our services to international customers soon!"
    },
    {
        question: "How do I care for my handloom saree?",
        answer: "We recommend dry cleaning for all our silk and delicate sarees to maintain their beauty and longevity. For cotton sarees, a gentle hand wash in cold water with mild detergent is advised. Always dry in shade."
    },
    {
        question: "Is the color of the saree exactly as it appears on the website?",
        answer: "We strive to display the colors of our products as accurately as possible. However, due to variations in monitor settings and lighting, there might be slight differences in color."
    }
  ];
  
  export default function FAQPage() {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-headline text-foreground">Frequently Asked Questions</h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
              Find answers to common questions about our products, shipping, and policies.
            </p>
          </div>
  
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card p-4 rounded-lg">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
  