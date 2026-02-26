import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [

    {
        question: "What is Civic Care?",
        answer:
            "Civic Care is a public infrastructure issue reporting platform that allows citizens to report problems like potholes, broken streetlights, water leaks, and more. Authorities can review and resolve issues efficiently."
    },

    {
        question: "Is Civic Care free to use?",
        answer:
            "Yes, Civic Care is free to use. Free users can report up to 3 issues. This allows everyone to use the platform without any cost."
    },

    {
        question: "What happens after reporting 3 issues?",
        answer:
            "After reporting 3 issues, free users will need to upgrade to Premium to continue reporting new issues."
    },

    {
        question: "What are the benefits of Premium membership?",
        answer:
            "Premium users can report unlimited issues, boost issue priority, and receive faster attention from authorities."
    },

    {
        question: "What is Boost Priority?",
        answer:
            "Boost Priority highlights your issue and increases its visibility, helping authorities identify and resolve it faster."
    },

    {
        question: "How do I report an issue?",
        answer:
            "Simply create an account, click on 'Report Issue', provide details, upload an image if needed, and submit. Your issue will be reviewed by authorities."
    },

    {
        question: "Can I track my reported issues?",
        answer:
            "Yes. You can track issue status in real-time, including Pending, In Progress, and Resolved."
    },

    {
        question: "How do authorities respond to issues?",
        answer:
            "Authorities review issues, update their status, and take necessary action. You will see status updates directly in the platform."
    },

    {
        question: "Is my personal information secure?",
        answer:
            "Yes. Civic Care uses secure authentication and protects your personal information."
    },

    {
        question: "Can I upgrade to Premium anytime?",
        answer:
            "Yes. You can upgrade to Premium anytime to unlock unlimited issue reporting and priority features."
    }

];

const FAQ = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (

        <section className="max-w-5xl mx-auto px-4 py-16">

            {/* heading */}
            <div className="text-center mb-12">

                <h2 className="text-3xl md:text-4xl font-bold">
                    Frequently Asked <span className="text-[#fa0bd2]">Questions</span>
                </h2>

                <p className="text-gray-500 mt-3">
                    Learn more about how Civic Care works
                </p>

            </div>

            {/* faq list */}
            <div className="space-y-4">

                {faqs.map((faq, index) => {

                    const isOpen = openIndex === index;

                    return (

                        <div
                            key={index}
                            className="
                                backdrop-blur-lg
                                bg-white/10
                                border border-white/20
                                rounded-xl
                                shadow-md
                                transition duration-300
                            "
                        >

                            {/* question */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="
                                    w-full
                                    flex
                                    justify-between
                                    items-center
                                    p-5
                                    text-left
                                    font-semibold
                                    text-lg
                                "
                            >

                                {faq.question}

                                <ChevronDown
                                    className={`
                                        transition duration-300
                                        ${isOpen ? "rotate-180 text-[#fa0bd2]" : ""}
                                    `}
                                />

                            </button>

                            {/* answer */}
                            <div
                                className={`
                                    overflow-hidden
                                    transition-all duration-300
                                    px-5
                                    text-gray-600
                                    ${isOpen
                                        ? "max-h-40 pb-5 opacity-100"
                                        : "max-h-0 opacity-0"
                                    }
                                `}
                            >
                                {faq.answer}
                            </div>

                        </div>

                    );

                })}

            </div>

        </section>

    );

};

export default FAQ;