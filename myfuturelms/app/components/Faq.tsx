/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-8 xl:mb-20 xl:mt-24">
      <div className="flex justify-center mb-11 font-poppins text-3xl font-semibold">
        <h1>
          Frequently Asked <span className="text-indigo-600">Questions</span>
        </h1>
      </div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div className="mb-4 max-lg:-mb-32">
          <span className="text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full text-sm font-semibold">
            FAQ's
          </span>
          <h2 className="text-3xl font-bold mt-4">
            Start Learning From World’s Pro Instructors
          </h2>
          <p className="text-gray-600 mt-4">
            Groove’s intuitive shared inbox makes it easy for team members to
            organize, prioritize, and work efficiently. In this episode.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          {[
            {
              question: "What’s Skillgrow Want to give you?",
              answer:
                "Groove’s intuitive shared inbox makes it easy for team members to organize and prioritize tasks, making collaboration seamless. It has survived not only five centuries.",
            },
            {
              question: "Why choose us for your education?",
              answer:
                "We offer expert instructors, high-quality courses, and a personalized learning experience to help you reach your goals effectively.",
            },
            {
              question: "How We Provide Service For you?",
              answer:
                "Our services are accessible and user-friendly, providing you with the resources you need to learn at your own pace.",
            },
            {
              question: "Are you Affordable For Your Course?",
              answer:
                "We offer competitive pricing options to make education accessible for everyone.",
            },
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 focus:outline-none"
              >
                {faq.question}
                <span
                  className={`text-indigo-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </button>
              {openIndex === index && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-2 text-gray-600"
                >
                  {faq.answer}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
