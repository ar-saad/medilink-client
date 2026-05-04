"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment by browsing through our doctors, selecting a specialist, and clicking the 'Book Appointment' button on their profile. Follow the prompts to select a time and confirm your details.",
  },
  {
    question: "Are the doctors on MediLink verified?",
    answer: "Yes, every doctor on our platform undergoes a rigorous verification process, including background checks, license verification, and credentials review to ensure you receive the highest quality care.",
  },
  {
    question: "How can I access my diagnostic reports?",
    answer: "Once your reports are uploaded by the diagnostic center, you can access them directly from your patient dashboard under the 'Health Records' section. You can also download them as PDF files.",
  },
  {
    question: "What should I do if I need to cancel an appointment?",
    answer: "You can cancel or reschedule an appointment through your dashboard at least 24 hours before the scheduled time. Refunds for cancellations are processed according to our cancellation policy.",
  },
  {
    question: "Is my personal data secure?",
    answer: "Absolutely. We use industry-standard encryption and follow strict HIPAA-compliant practices to ensure your medical data and personal information are protected at all times.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-3xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Have a question? We're here to help. Here are some of the most common questions our users ask.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 bg-muted/20 data-[state=open]:bg-background transition-colors">
              <AccordionTrigger className="text-left font-bold hover:no-underline text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
            <p className="text-muted-foreground">
                Still have questions? <a href="/contact" className="text-primary font-bold hover:underline">Contact our support team</a>
            </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
