const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-slate max-w-none space-y-6">
        <p className="text-muted-foreground italic">Last updated: May 04, 2026</p>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using our Services, you agree to be bound by these Terms. If you don't agree to these Terms, do not use the Services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Changes to Terms or Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may modify the Terms at any time. If we do so, we'll let you know either by posting the modified Terms on the Site or through other communications. It's important that you review the Terms whenever we modify them because if you continue to use the Services after we have posted modified Terms on the Site, you are indicating to us that you agree to be bound by the modified Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Who May Use the Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            You may use the Services only if you are 18 years or older and capable of forming a binding contract with MediLink and are not barred from using the Services under applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Content Ownership</h2>
          <p className="text-muted-foreground leading-relaxed">
            MediLink and its licensors exclusively own all right, title and interest in and to the Services and Content, including all associated intellectual property rights. You acknowledge that the Services and Content are protected by copyright, trademark, and other laws of the United States and foreign countries.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate your access to and use of the Services, at our sole discretion, at any time and without notice to you.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
