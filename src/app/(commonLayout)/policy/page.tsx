import { Separator } from "@/components/ui/separator";

export default function PolicyPage() {
  const sections = [
    {
      id: "privacy",
      title: "Privacy Policy",
      content: [
        "Your privacy is important to us. It is Planova's policy to respect your privacy regarding any information we may collect from you across our website.",
        "We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.",
        "We also let you know why we’re collecting it and how it will be used. We only retain collected information for as long as necessary to provide you with your requested service.",
        "What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification."
      ]
    },
    {
      id: "terms",
      title: "Terms of Service",
      content: [
        "By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.",
        "If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.",
        "Permission is granted to temporarily download one copy of the materials (information or software) on Planova's website for personal, non-commercial transitory viewing only."
      ]
    },
    {
      id: "refund",
      title: "Refund Policy",
      content: [
        "Event ticket refunds are subject to the individual organizer's policy. Planova acts as a platform and is not responsible for issuing refunds directly unless the event is canceled by the organizer.",
        "In the case of a canceled event, Planova will work with the organizer to ensure all attendees receive their eligible refunds via the original payment method.",
        "Service fees paid to Planova are generally non-refundable except in cases of technical failure on our part."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent dark:bg-gray-950 pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <h1 className="text-5xl font-black tracking-tight mb-4 text-teal-600">
              Legal & Policies
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about how we operate and protect your data.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 mb-16">
            {sections.map((section) => (
              <a 
                key={section.id}
                href={`#${section.id}`}
                className="px-6 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-semibold hover:border-teal-500 transition-colors"
              >
                {section.title}
              </a>
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-20">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-teal-600 rounded-full"></span>
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-muted-foreground leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <Separator className="mt-12 bg-zinc-100 dark:bg-zinc-800/50" />
              </section>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-20 p-8 rounded-3xl bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/30 text-center">
            <h3 className="font-bold text-xl mb-2">Have questions about our policies?</h3>
            <p className="text-muted-foreground mb-6">Our legal team is happy to help clarify any points.</p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center h-12 px-8 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-500/10"
            >
              Contact Legal Departement
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
