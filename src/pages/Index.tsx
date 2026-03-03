import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import Layout from "@/components/Layout";
import {
  Sparkles,
  FileText,
  Zap,
  Target,
  FormInput,
  ArrowRight,
  Star,
  Check,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const features = [
  { icon: Sparkles, title: "AI-Powered Writing", desc: "Our AI rewrites and enhances your experience into powerful, recruiter-ready content." },
  { icon: FileText, title: "Instant PDF Export", desc: "Download a beautifully formatted, print-ready PDF resume in seconds." },
  { icon: Target, title: "ATS Optimized", desc: "Every resume is structured to pass Applicant Tracking Systems with ease." },
  { icon: Zap, title: "Lightning Fast", desc: "Submit your info, get your resume. The entire process takes under 60 seconds." },
  { icon: FormInput, title: "Simple Form Input", desc: "No complex editors. Just fill a clean form and let AI handle the rest." },
  { icon: Star, title: "Professional Templates", desc: "Clean, modern layouts trusted by hiring managers at top companies." },
];

const steps = [
  { num: "01", title: "Fill the Form", desc: "Enter your details — name, experience, skills, education." },
  { num: "02", title: "AI Generates Resume", desc: "Our AI crafts a professional, ATS-optimized resume from your input." },
  { num: "03", title: "Download & Apply", desc: "Get your polished PDF resume and start applying immediately." },
];

const testimonials = [
  { name: "Sarah K.", role: "Product Manager", text: "I went from zero to interview-ready in under a minute. The AI writing is genuinely impressive." },
  { name: "James R.", role: "Software Engineer", text: "Best resume tool I've used. Clean, fast, and the output is professional-grade." },
  { name: "Maria L.", role: "Marketing Lead", text: "Saved me hours of formatting. The ATS optimization actually works — got 3 callbacks in a week." },
];

const faqs = [
  { q: "Is it really free?", a: "Yes — our Free tier lets you generate one resume with full AI optimization at no cost." },
  { q: "How does the AI improve my resume?", a: "Our AI rewrites your content with strong action verbs, quantified achievements, and ATS-friendly formatting." },
  { q: "What format is the resume?", a: "You receive a clean, text-based PDF ready for printing or uploading to job portals." },
  { q: "Can I edit my resume after generation?", a: "Pro and Business plans allow unlimited regenerations and customizations." },
  { q: "Is my data secure?", a: "Absolutely. We don't store your personal information beyond the generation session." },
];

// Floating particles for hero
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--gold)/0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--gold)/0.06),transparent_50%)]" />
        
        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary/30"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, -10, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-6 border border-primary/20"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={14} />
              </motion.span>
              AI-Powered Resume Builder
            </motion.span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              Your next job starts with a{" "}
              <span className="text-gradient relative">
                better resume
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold-light to-transparent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Fill a simple form. Let AI craft a professional, ATS-optimized resume. Download your PDF in under 60 seconds.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="hero" size="lg" asChild className="group relative overflow-hidden">
                <Link to="/resume">
                  <span className="relative z-10 flex items-center">
                    Build Your Resume Free
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </span>
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/product">See How It Works</Link>
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-sm text-muted-foreground/60"
            >
              No signup required · Free forever · PDF download
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features */}
      <section className="py-24 bg-background relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            badge="Features"
            title="Everything you need, nothing you don't"
            description="A focused set of tools designed to produce interview-winning resumes with zero friction."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_hsl(var(--gold)/0.15)] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <f.icon className="text-primary" size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            badge="How It Works"
            title="Three steps to your perfect resume"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center group"
              >
                <motion.span
                  className="font-display text-6xl font-bold text-gradient inline-block"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {s.num}
                </motion.span>
                <h3 className="font-display font-semibold text-foreground mt-3 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background relative">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading badge="Testimonials" title="Loved by job seekers everywhere" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_hsl(var(--gold)/0.1)] transition-all duration-300 relative"
              >
                <div className="absolute top-4 right-4 text-4xl font-display text-primary/10 leading-none">"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-secondary/50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gold)/0.04),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            badge="Pricing"
            title="Start free, upgrade when ready"
            description="No hidden fees. Cancel anytime."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/pricing">View All Plans</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/resume">Try Free Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading badge="FAQ" title="Frequently asked questions" />
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((f, i) => (
              <motion.details
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group border border-border rounded-xl bg-card hover:border-primary/30 transition-colors duration-300"
              >
                <summary className="cursor-pointer p-5 font-medium text-foreground text-sm flex items-center justify-between">
                  {f.q}
                  <Check className="text-primary opacity-0 group-open:opacity-100 transition-opacity" size={16} />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--gold)/0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Ready to land your dream job?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of professionals who trust our AI to build resumes that get results.
            </p>
            <Button variant="hero" size="lg" asChild className="group">
              <Link to="/resume">
                Build Your Resume Now
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Made By AH RION */}
      <section className="py-16 bg-background overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Crafted with passion</p>
            <div className="relative inline-block">
              <motion.h2
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-foreground">MADE BY </span>
                <motion.span
                  className="text-gradient relative"
                  initial={{ backgroundSize: "0% 100%" }}
                  whileInView={{ backgroundSize: "100% 100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  AH RION
                </motion.span>
              </motion.h2>
              <motion.div
                className="h-1 rounded-full bg-gradient-to-r from-primary via-gold-light to-gold-glow mt-3"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
              <motion.div
                className="absolute -inset-8 rounded-3xl bg-primary/5 blur-2xl -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
            <div className="flex justify-center gap-6 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
