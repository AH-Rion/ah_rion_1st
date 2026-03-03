import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Heart, Rocket } from "lucide-react";

const values = [
  { icon: Target, title: "Mission", text: "To democratize professional resume creation — making it free, fast, and intelligent for everyone, everywhere." },
  { icon: Eye, title: "Vision", text: "A world where no qualified candidate is overlooked because of a poorly formatted resume." },
  { icon: Heart, title: "Why We Built This", text: "We saw talented people losing opportunities to bad resumes. Hiring a resume writer costs $200+. We knew AI could solve this — for free." },
  { icon: Rocket, title: "What's Next", text: "Cover letter generation, LinkedIn optimization, interview prep AI, and multi-language resume support are on our roadmap." },
];

const About = () => (
  <Layout>
    <section className="hero-gradient relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(45_93%_47%/0.06),transparent_60%)]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-4">About Us</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-hero-foreground mb-4">
            We believe everyone deserves a <span className="text-gradient">great resume</span>
          </h1>
          <p className="text-hero-muted max-w-2xl mx-auto">
            Built by a solo founder obsessed with making career tools accessible. Trusted by thousands of job seekers worldwide.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading badge="Our Story" title="From frustration to innovation" />
        <div className="max-w-2xl mx-auto">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-muted-foreground leading-relaxed mb-6">
            It started with a rejected application. Not because of lack of skill — but a resume that couldn't pass an ATS filter. That moment sparked the idea: what if AI could write the perfect resume for anyone, instantly, and for free?
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground leading-relaxed">
            Today, Free Resume Builder has helped over <span className="font-semibold text-foreground">10,000+ professionals</span> create resumes that land interviews. We're just getting started.
          </motion.p>
        </div>
      </div>
    </section>

    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <v.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
