import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is RAWAURA?",
    answer:
      "RAWAURA is a premium clothing brand focused on high-quality streetwear and everyday essentials designed for comfort, durability, and style.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "Yes, we offer Cash on Delivery (COD) on most products across India. You can also pay online using UPI, cards, and net banking.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes 4–7 working days depending on your city or location. You will receive tracking updates on SMS & email.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return and exchange window for unworn, undamaged items with tags intact. For hygiene reasons, innerwear is non-returnable.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, we’ll send you a tracking link via SMS and email. You can follow your package in real time.",
  },
  {
    question: "Do you restock sold-out items?",
    answer:
      "Yes! Popular items are restocked regularly. Follow us on Instagram or turn on restock notifications on the product page.",
  },
  {
    question: "Are your hoodies true to size?",
    answer:
      "Yes, all hoodies are designed for a relaxed, slightly oversized fit. If you prefer a snug fit, consider sizing down.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach us at support@rawaura.com or send us a DM on Instagram. Our team replies within 24 hours.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="w-[90%] md:w-[70%] mx-auto py-16 font-mainfont text-[#1C1C1C]">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 tracking-tight">
        Frequently Asked Questions
      </h1>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all"
          >
            {/* Question Button */}
            <button
              onClick={() => toggle(i)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="text-lg font-semibold cursor-pointer">{faq.question}</span>
              {openIndex === i ? (
                <ChevronUp size={22} className="text-gray-600" />
              ) : (
                <ChevronDown size={22} className="text-gray-600" />
              )}
            </button>

            {/* Smooth Animated Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === i ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
