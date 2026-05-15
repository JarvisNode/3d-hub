import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Hobbyist",
      price: "From ₹400",
      description: "Perfect for personal projects and prototypes.",
      features: ["Standard PLA/PETG", "0.2mm Layer Height", "3-5 Days Delivery", "Basic Email Support", "Standard Tolerances"],
      isPopular: false
    },
    {
      name: "Custom Design",
      price: "Quote",
      description: "Complete design and prototyping solution.",
      features: ["Dedicated Engineer", "Iterative Prototyping", "Commercial Rights", "24/7 Phone Support", "Material Consultation"],
      isPopular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Transparent Pricing</h1>
        <p className="text-gray-400">Simple, predictable pricing for printing and design services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div key={i} className={`relative glass p-8 rounded-2xl border ${plan.isPopular ? 'border-primary shadow-[0_0_30px_rgba(14,165,233,0.15)]' : 'border-white/10'} flex flex-col`}>
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="text-4xl font-bold text-primary-neon mb-4">{plan.price}</div>
            <p className="text-gray-400 mb-8 h-12">{plan.description}</p>
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-lg font-bold transition-colors ${plan.isPopular ? 'bg-primary text-white hover:bg-primary/90' : 'glass border border-white/20 text-white hover:bg-white/5'}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
