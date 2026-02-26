import React from "react";
import { Check, X, Crown } from "lucide-react";

const plans = [
    {
        name: "Basic",
        price: "$100",
        duration: "/month",
        description: "Basic access for new users",
        highlight: false,
        features: [
            { text: "Report up to 3 issues", available: true },
            { text: "Track issue status", available: true },
            { text: "Basic support", available: true },
            { text: "Boost priority", available: false },
            { text: "Unlimited issue reporting", available: false },
        ],
        buttonText: "Select Basic"
    },
    {
        name: "Standard",
        price: "$200",
        duration: "/3 months",
        description: "Most popular plan",
        highlight: true,
        features: [
            { text: "Report up to 10 issues", available: true },
            { text: "Track issue status", available: true },
            { text: "Priority support", available: true },
            { text: "Boost priority", available: true },
            { text: "Unlimited issue reporting", available: false },
        ],
        buttonText: "Select Standard"
    },
    {
        name: "Premium",
        price: "$1000",
        duration: "Lifetime",
        description: "All features unlocked",
        highlight: false,
        features: [
            { text: "Report unlimited issues", available: true },
            { text: "Boost issue priority", available: true },
            { text: "Faster authority response", available: true },
            { text: "Premium badge", available: true },
            { text: "Priority support", available: true },
        ],
        buttonText: "Select Premium"
    },
];

const PricingCards = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Choose Your <span className="text-[#fa0bd2]">Plan</span>
                </h2>
                <p className="text-gray-500 mt-3">
                    Flexible plans for every citizen
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`
              relative
              backdrop-blur-lg
              bg-white/10
              border border-white/20
              rounded-2xl
              shadow-lg
              p-8
              transition
              hover:scale-[1.03]
              ${plan.highlight ? "ring-2 ring-[#fa0bd2]" : ""}
            `}
                    >
                        {/* Highlight badge */}
                        {plan.highlight && (
                            <div className="absolute -top-3 right-4 bg-[#fa0bd2] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                <Crown size={14} /> Most Popular
                            </div>
                        )}

                        {/* Name */}
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                        {/* Price */}
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold text-[#fa0bd2]">{plan.price}</span>
                            <span className="text-gray-500 text-lg">{plan.duration}</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-500 mb-6">{plan.description}</p>

                        {/* Features */}
                        <div className="space-y-3 mb-8">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    {feature.available ? (
                                        <Check className="text-green-500" size={18} />
                                    ) : (
                                        <X className="text-gray-400" size={18} />
                                    )}
                                    <span className={feature.available ? "" : "text-gray-400"}>{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Button */}
                        <button
                            className={`
                w-full
                py-3
                rounded-xl
                font-semibold
                transition
                ${plan.highlight
                                    ? "bg-[#fa0bd2] text-white hover:bg-[#d409b8]"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"}
              `}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default PricingCards;