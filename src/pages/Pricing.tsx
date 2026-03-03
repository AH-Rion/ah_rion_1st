import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Check } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    monthly: "$0",
    yearly: "$0",
    desc: "Perfect for trying it out",
    features: ["1 AI-generated resume", "ATS optimization", "PDF download", "Basic templates", "Email support"],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    monthly: "$9",
    yearly: "$79",
    desc: "For active job seekers",
    features: ["Unlimited resumes", "All premium templates", "ATS score analysis", "AI content enhancement", "Priority support", "Cover letter add-on"],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Business",
    monthly: "$29",
    yearly: "$249",
    desc: "For teams & career coaches",
    features: ["Everything in Pro", "Team dashboard (up to 10)", "Bulk resume generation", "Custom branding", "API access", "Dedicated account manager"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <Layout>
      <section className="hero-gradient relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(45_93%_47%/0.06),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-4">Pricing</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-hero-foreground mb-4">
              Simple, transparent <span className="text-gradient">pricing</span>
            </h1>
            <p className="text-hero-muted max-w-lg mx-auto">Start free. Upgrade when you need more power. 30-day money-back guarantee on all paid plans.</p>

            <div className="mt-8 inline-flex items-center gap-3 bg-card/10 rounded-full p-1 border border-border/30">
              <button onClick={() => setYearly(false)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!yearly ? "bg-primary text-primary-foreground" : "text-hero-muted"}`}>Monthly</button>
              <button onClick={() => setYearly(true)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${yearly ? "bg-primary text-primary-foreground" : "text-hero-muted"}`}>Yearly <span className="text-xs opacity-75">Save 27%</span></button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl border ${p.highlighted ? "border-primary glow-gold" : "border-border"} bg-card relative`}
              >
                {p.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">Most Popular</span>
                )}
                <h3 className="font-display text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                <div className="mt-6 mb-6">
                  <span className="font-display text-4xl font-bold text-foreground">{yearly ? p.yearly : p.monthly}</span>
                  <span className="text-muted-foreground text-sm">/{yearly ? "year" : "month"}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={p.highlighted ? "default" : "outline"} className="w-full" asChild>
                  <Link to="/resume">{p.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              All paid plans include a <span className="font-semibold text-foreground">30-day money-back guarantee</span>. No questions asked.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
