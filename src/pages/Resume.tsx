import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const resumeSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  jobRole: z.string().trim().min(1, "Job role is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  location: z.string().trim().min(1, "Location is required").max(100),
  portfolio: z.string().trim().max(255).optional().or(z.literal("")),
  careerGoal: z.string().trim().min(1, "Career summary is required").max(2000),
  workExperience: z.string().trim().min(1, "Work experience is required").max(5000),
  skills: z.string().trim().min(1, "Skills are required").max(2000),
  education: z.string().trim().min(1, "Education is required").max(2000),
  projects: z.string().trim().max(3000).optional().or(z.literal("")),
});

type ResumeForm = z.infer<typeof resumeSchema>;

const initialForm: ResumeForm = {
  fullName: "", jobRole: "", email: "", phone: "", location: "", portfolio: "",
  careerGoal: "", workExperience: "", skills: "", education: "", projects: "",
};

const WEBHOOK_URL = "https://jsadkjdj.app.n8n.cloud/webhook-test/477e6e25-7a8b-4788-b96e-42bcd00714b6";

const AI_PROMPT = `You are a world-class professional resume writer and career consultant. Using the candidate data provided below, generate a polished, ATS-optimized, professional resume.

INSTRUCTIONS:
- Rewrite and enhance all content with strong, quantified action verbs
- Use a clean, text-only format (no tables, no graphics, no fancy formatting)
- Structure: Contact Info → Professional Summary → Work Experience → Skills → Education → Projects (if provided)
- Each work experience entry should have 3-5 bullet points starting with powerful action verbs
- Quantify achievements wherever possible (percentages, dollar amounts, metrics)
- Ensure ATS compatibility: use standard section headers, no columns, no special characters
- Professional tone throughout
- Keep to 1-2 pages maximum
- Format as clean text ready for PDF generation

CANDIDATE DATA:
`;

const fieldConfig = [
  { name: "fullName" as const, label: "Full Name", placeholder: "John Doe", type: "input" },
  { name: "jobRole" as const, label: "Job Role", placeholder: "Senior Software Engineer", type: "input" },
  { name: "email" as const, label: "Email", placeholder: "john@example.com", type: "input" },
  { name: "phone" as const, label: "Phone", placeholder: "+1 (555) 123-4567", type: "input" },
  { name: "location" as const, label: "Location", placeholder: "San Francisco, CA", type: "input" },
  { name: "portfolio" as const, label: "Portfolio / Website", placeholder: "https://johndoe.com (optional)", type: "input" },
  { name: "careerGoal" as const, label: "Career Goal / Summary", placeholder: "Briefly describe your career objective and what makes you a strong candidate...", type: "textarea" },
  { name: "workExperience" as const, label: "Work Experience", placeholder: "Company Name — Role — Duration\n• Key achievement or responsibility\n• Another achievement...", type: "textarea" },
  { name: "skills" as const, label: "Skills", placeholder: "JavaScript, React, Node.js, Project Management, Agile...", type: "textarea" },
  { name: "education" as const, label: "Education", placeholder: "University Name — Degree — Year", type: "textarea" },
  { name: "projects" as const, label: "Projects", placeholder: "Project name and brief description (optional)...", type: "textarea" },
];

const Resume = () => {
  const [form, setForm] = useState<ResumeForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ResumeForm, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (name: keyof ResumeForm, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = resumeSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ResumeForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ResumeForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const prompt = AI_PROMPT + JSON.stringify(result.data, null, 2);
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, prompt }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <section className="py-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-4">
              Resume Builder
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Build your AI resume
            </h1>
            <p className="text-muted-foreground">Fill in your details below. Our AI will craft a professional, ATS-optimized resume for you.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {status === "idle" || status === "error" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {fieldConfig.map((f) => (
                  <div key={f.name} className="space-y-2">
                    <Label htmlFor={f.name} className="text-sm font-medium text-foreground">{f.label}</Label>
                    {f.type === "input" ? (
                      <Input
                        id={f.name}
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        onChange={(e) => handleChange(f.name, e.target.value)}
                        className={errors[f.name] ? "border-destructive" : ""}
                      />
                    ) : (
                      <Textarea
                        id={f.name}
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        onChange={(e) => handleChange(f.name, e.target.value)}
                        rows={4}
                        className={errors[f.name] ? "border-destructive" : ""}
                      />
                    )}
                    {errors[f.name] && <p className="text-xs text-destructive">{errors[f.name]}</p>}
                  </div>
                ))}

                {status === "error" && (
                  <p className="text-sm text-destructive text-center">Something went wrong. Please try again.</p>
                )}

                <Button type="submit" size="lg" className="w-full">
                  <Sparkles size={18} className="mr-2" /> Generate My Resume with AI
                </Button>
              </motion.form>
            ) : status === "loading" ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <Loader2 className="mx-auto text-primary animate-spin mb-6" size={48} />
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Generating your resume…</h2>
                <p className="text-muted-foreground">Your resume is being generated by AI. This may take a few moments.</p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24"
              >
                <CheckCircle2 className="mx-auto text-primary mb-6" size={48} />
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Resume submitted successfully!</h2>
                <p className="text-muted-foreground mb-8">Your AI-powered resume has been generated. Check your email or download it from the link provided.</p>
                <Button variant="outline" onClick={() => { setStatus("idle"); setForm(initialForm); }}>
                  Create Another Resume
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Resume;
