"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do I register for an event on Planova?",
    answer: "Registering is easy! Simply browse our events, click on the one you're interested in, and hit the 'Join' or 'Get Ticket' button. If it's a paid event, you'll be guided through our secure Stripe payment process.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely. We use industry-standard encryption and processed through Stripe, one of the world's most secure payment gateways. Planova never stores your credit card details on our servers.",
  },
  {
    question: "Can I host and manage my own events?",
    answer: "Yes! Planova is built for creators. Once you create an account, you can access your dashboard to create, manage, and track your events with professional analytics tools.",
  },
  {
    question: "What is your refund policy for cancelled events?",
    answer: "If an organizer cancels an event, you will receive a full refund automatically. For personal cancellations, please check the specific refund policy set by the event organizer on the event details page.",
  },
  {
    question: "How do I access my tickets after booking?",
    answer: "Once your registration is complete, your ticket will be available in your user dashboard under 'My Participations'. You will also receive a confirmation email with all the event details.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-zinc-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Header Area */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-bold text-sm mb-6">
                <HelpCircle size={16} />
                <span>Knowledge Base</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight dark:text-white">
                Frequently Asked <br />
                <span className="text-teal-600">Questions</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-gray-400 mb-8">
                Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.
              </p>
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <p className="font-bold dark:text-white mb-2">Still need help?</p>
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">Our team is available 24/7 to assist you with any inquiries.</p>
                <button className="text-teal-600 font-bold hover:underline transition-all">Contact Support →</button>
              </div>
            </motion.div>
          </div>

          {/* Accordion Area */}
          <div className="lg:w-2/3 space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-3xl border transition-all duration-300 ${
                  openIndex === idx
                    ? "bg-white dark:bg-zinc-900 border-teal-500/30 shadow-xl"
                    : "bg-white/50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <span className={`text-lg md:text-xl font-bold transition-colors ${
                    openIndex === idx ? "text-teal-600" : "dark:text-white text-slate-900"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-transform duration-300 ${
                    openIndex === idx ? "bg-teal-600 text-white rotate-180" : "bg-zinc-100 dark:bg-zinc-800 dark:text-white"
                  }`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0">
                        <div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-6" />
                        <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
