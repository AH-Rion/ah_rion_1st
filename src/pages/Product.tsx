import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import Layout from "@/components/Layout";
import { ArrowRight, Check, X } from "lucide-react";

const workflow = [
  { step: "1", title: "You Fill the Form", desc: "Enter your professional details into our clean, guided form — name, experience, skills, education, and more." },
  { step: "2", title: "AI Processes Your Data", desc: "Your input is sent securely to our AI engine via webhook. It analyzes, rewrites, and enhances every section." },
  { step: "3", title: "Resume Generated", desc: "A polished, ATS-optimized resume is generated in seconds with strong action verbs and clean formatting." },
  { step: "4", title: "Download PDF", desc: "You receive a professional PDF ready to submit to any job portal or email directly to recruiters." },
];

const comparison = [
  { feature: "Time to create", traditional: "2-4 hours", ai: "Under 60 seconds" },
  { feature: "ATS optimization", traditional: "Manual guesswork", ai: "Built-in AI scoring" },
  { feature: "Professional writing", traditional: "DIY or hire writer ($100+)", ai: "AI-enhanced, free" },
  { feature: "Formatting", traditional: "Fight with Word/Docs", ai: "Auto-formatted PDF" },
  { feature: "Action verbs", traditional: "Often weak/passive", ai: "Strong, recruiter-proven" },
  { feature: "Consistency", traditional: "Varies wildly", ai: "Always professional" },
];

const Product = () => (
  <Layout>
    {/* Hero */}
    <section className="hero-gradient relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(45_93%_47%/0.06),transparent_60%)]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-4">Product</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-hero-foreground mb-4">
            AI that writes your resume <span className="text-gradient">better than you can</span>
          </h1>
          <p className="text-hero-muted max-w-2xl mx-auto">
            Our AI engine transforms your raw career data into a polished, ATS-ready professional resume — formatted, enhanced, and downloadable in seconds.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Workflow */}
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading badge="Workflow" title="How the magic happens" description="A seamless pipeline from your input to a job-winning resume." />
        <div className="max-w-3xl mx-auto space-y-8">
          {workflow.map((w, i) => (
            <motion.div
              key={w.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 items-start p-6 rounded-xl border border-border bg-card"
            >
              <span className="font-display text-3xl font-bold text-primary/30 shrink-0">{w.step}</span>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{w.title}</h3>
                <p className="text-sm text-muted-foreground">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Comparison */}
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <SectionHeading badge="Comparison" title="Traditional vs AI Resume" />
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-display font-semibold text-foreground">Feature</th>
                <th className="text-left py-4 px-4 font-display font-semibold text-muted-foreground">Traditional</th>
                <th className="text-left py-4 px-4 font-display font-semibold text-primary">AI Resume Builder</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c) => (
                <tr key={c.feature} className="border-b border-border/50">
                  <td className="py-3 px-4 text-foreground font-medium">{c.feature}</td>
                  <td className="py-3 px-4 text-muted-foreground flex items-center gap-2"><X size={14} className="text-destructive" />{c.traditional}</td>
                  <td className="py-3 px-4 text-foreground flex items-center gap-2"><Check size={14} className="text-primary" />{c.ai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-background text-center">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Experience it yourself</h2>
        <p className="text-muted-foreground mb-8">No signup. No credit card. Just results.</p>
        <Button size="lg" asChild>
          <Link to="/resume">Build Your Resume <ArrowRight className="ml-2" size={18} /></Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Product;
