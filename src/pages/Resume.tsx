import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { Loader2, Sparkles, CheckCircle2, Upload, User, Phone, Mail, MapPin, Globe } from "lucide-react";
import { z } from "zod";

const resumeSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  jobRole: z.string().trim().min(1, "Job role is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  address: z.string().trim().min(1, "Address is required").max(200),
  portfolio: z.string().trim().max(255).optional().or(z.literal("")),
  careerGoal: z.string().trim().min(1, "Career summary is required").max(2000),
  workExperience: z.string().trim().min(1, "Work experience is required").max(5000),
  skills: z.string().trim().min(1, "Skills are required").max(2000),
  education: z.string().trim().min(1, "Education is required").max(2000),
  languages: z.string().trim().max(1000).optional().or(z.literal("")),
  projects: z.string().trim().max(3000).optional().or(z.literal("")),
  references: z.string().trim().max(2000).optional().or(z.literal("")),
});

type ResumeForm = z.infer<typeof resumeSchema>;

const initialForm: ResumeForm = {
  fullName: "", jobRole: "", email: "", phone: "", address: "", portfolio: "",
  careerGoal: "", workExperience: "", skills: "", education: "", languages: "", projects: "", references: "",
};

const WEBHOOK_URL = "https://jsadkjdj.app.n8n.cloud/webhook-test/477e6e25-7a8b-4788-b96e-42bcd00714b6";

const AI_PROMPT = `You are a world-class professional resume writer and career consultant. Using the candidate data provided below, generate a polished, ATS-optimized, professional resume.

INSTRUCTIONS:
- Rewrite and enhance all content with strong, quantified action verbs
- Use a clean, text-only format (no tables, no graphics, no fancy formatting)
- Structure: Contact Info → Professional Summary → Work Experience → Skills → Education → Languages → Projects → References (if provided)
- Each work experience entry should have 3-5 bullet points starting with powerful action verbs
- Quantify achievements wherever possible (percentages, dollar amounts, metrics)
- Ensure ATS compatibility: use standard section headers, no columns, no special characters
- Professional tone throughout
- Keep to 1-2 pages maximum
- Format as clean text ready for PDF generation

CANDIDATE DATA:
`;

const fieldConfig = [
  { name: "fullName" as const, label: "Full Name", placeholder: "Richard Sanchez", type: "input" },
  { name: "jobRole" as const, label: "Job Role", placeholder: "Marketing Manager", type: "input" },
  { name: "email" as const, label: "Email", placeholder: "hello@reallygreatsite.com", type: "input" },
  { name: "phone" as const, label: "Phone", placeholder: "+123-456-7890", type: "input" },
  { name: "address" as const, label: "Address", placeholder: "123 Anywhere St., Any City", type: "input" },
  { name: "portfolio" as const, label: "Website / Portfolio", placeholder: "www.reallygreatsite.com (optional)", type: "input" },
  { name: "careerGoal" as const, label: "Profile / Summary", placeholder: "A brief professional summary highlighting your key strengths and career objectives...", type: "textarea" },
  { name: "workExperience" as const, label: "Work Experience", placeholder: "Company Name — Role — Duration\n• Key achievement or responsibility\n• Another achievement...", type: "textarea" },
  { name: "skills" as const, label: "Skills", placeholder: "Project Management, Public Relations, Teamwork, Leadership...", type: "textarea" },
  { name: "education" as const, label: "Education", placeholder: "2025 - 2029\nWardiere University\n• Bachelor of Business Management\n• GPA: 3.8 / 4.0", type: "textarea" },
  { name: "languages" as const, label: "Languages", placeholder: "English (Fluent), French (Fluent), Spanish (Intermediate)...", type: "textarea" },
  { name: "projects" as const, label: "Projects", placeholder: "Project name and brief description (optional)...", type: "textarea" },
  { name: "references" as const, label: "References", placeholder: "Estelle Darcy — Wardiere Inc. / CTO\nPhone: 123-456-7890\nEmail: hello@reallygreatsite.com", type: "textarea" },
];

const Resume = () => {
  const [form, setForm] = useState<ResumeForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ResumeForm, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (name: keyof ResumeForm, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Photo must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
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
        body: JSON.stringify({ ...result.data, photo, prompt }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Parse simple list from comma or newline separated string
  const parseList = (str: string) => str.split(/[,\n]/).map(s => s.trim()).filter(Boolean);

  // Parse work experience entries
  const parseWorkEntries = (str: string) => {
    const blocks = str.split(/\n(?=[A-Z])/).filter(Boolean);
    return blocks.map(block => {
      const lines = block.split('\n').filter(Boolean);
      return { header: lines[0] || '', bullets: lines.slice(1).map(l => l.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean) };
    });
  };

  return (
    <Layout>
      <section className="py-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
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
              <motion.div
                key="form-and-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Form Column */}
                <form onSubmit={handleSubmit} className="space-y-5 order-2 lg:order-1">
                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Your Photo</Label>
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden bg-muted/30"
                      >
                        {photo ? (
                          <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <Upload size={24} className="text-muted-foreground/50" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload size={14} className="mr-2" />
                          {photo ? "Change Photo" : "Upload Photo"}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 5MB.</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

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
                </form>

                {/* Live Resume Preview */}
                <div className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Live Preview</p>
                  <div className="border border-border rounded-xl overflow-hidden shadow-xl bg-white text-black">
                    <div className="grid grid-cols-[35%_65%] min-h-[600px]" style={{ fontSize: '11px' }}>
                      {/* Sidebar */}
                      <div className="bg-[#1b2a4a] text-white p-5 flex flex-col gap-5">
                        {/* Photo */}
                        <div className="flex justify-center">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 bg-white/10 flex items-center justify-center">
                            {photo ? (
                              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <User size={36} className="text-white/40" />
                            )}
                          </div>
                        </div>

                        {/* Contact */}
                        <div>
                          <h3 className="font-bold uppercase tracking-widest text-[10px] mb-2 border-b border-white/20 pb-1">Contact</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Phone size={10} className="mt-0.5 shrink-0 opacity-70" />
                              <span className="break-all">{form.phone || "+123-456-7890"}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Mail size={10} className="mt-0.5 shrink-0 opacity-70" />
                              <span className="break-all">{form.email || "hello@example.com"}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPin size={10} className="mt-0.5 shrink-0 opacity-70" />
                              <span>{form.address || "123 Anywhere St., Any City"}</span>
                            </div>
                            {(form.portfolio) && (
                              <div className="flex items-start gap-2">
                                <Globe size={10} className="mt-0.5 shrink-0 opacity-70" />
                                <span className="break-all">{form.portfolio}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Education */}
                        <div>
                          <h3 className="font-bold uppercase tracking-widest text-[10px] mb-2 border-b border-white/20 pb-1">Education</h3>
                          <p className="whitespace-pre-line leading-relaxed">{form.education || "University — Degree — Year"}</p>
                        </div>

                        {/* Skills */}
                        <div>
                          <h3 className="font-bold uppercase tracking-widest text-[10px] mb-2 border-b border-white/20 pb-1">Skills</h3>
                          <ul className="space-y-1">
                            {(form.skills ? parseList(form.skills) : ["Project Management", "Teamwork", "Leadership"]).map((s, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-white/60 shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Languages */}
                        <div>
                          <h3 className="font-bold uppercase tracking-widest text-[10px] mb-2 border-b border-white/20 pb-1">Languages</h3>
                          <ul className="space-y-1">
                            {(form.languages ? parseList(form.languages) : ["English (Fluent)", "French (Fluent)"]).map((l, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-white/60 shrink-0" />
                                {l}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="p-5 flex flex-col gap-4">
                        {/* Name */}
                        <div>
                          <h1 className="text-2xl font-bold tracking-tight text-[#1b2a4a] leading-none">
                            {form.fullName || "RICHARD SANCHEZ"}
                          </h1>
                          <p className="text-[11px] uppercase tracking-widest text-[#1b2a4a]/60 mt-1 font-medium">
                            {form.jobRole || "Marketing Manager"}
                          </p>
                        </div>

                        {/* Profile */}
                        <div>
                          <h3 className="font-bold uppercase tracking-widest text-[10px] text-[#1b2a4a] mb-1.5 border-b border-[#1b2a4a]/20 pb-1">Profile</h3>
                          <p className="leading-relaxed text-gray-700">
                            {form.careerGoal || "A brief professional summary highlighting your key strengths and career objectives..."}
                          </p>
                        </div>

                        {/* Work Experience */}
                        <div>
                          <h3 className="font-bold uppercase tracking-widest text-[10px] text-[#1b2a4a] mb-1.5 border-b border-[#1b2a4a]/20 pb-1">Work Experience</h3>
                          {form.workExperience ? (
                            <div className="space-y-3">
                              {parseWorkEntries(form.workExperience).map((entry, i) => (
                                <div key={i}>
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#1b2a4a] shrink-0" />
                                    <p className="font-semibold text-[#1b2a4a]">{entry.header}</p>
                                  </div>
                                  {entry.bullets.length > 0 && (
                                    <ul className="ml-5 mt-1 space-y-0.5 text-gray-700">
                                      {entry.bullets.map((b, j) => (
                                        <li key={j} className="flex items-start gap-1.5">
                                          <span className="mt-1.5 w-0.5 h-0.5 rounded-full bg-gray-400 shrink-0" />
                                          {b}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-400 italic">Your work experience will appear here...</p>
                          )}
                        </div>

                        {/* References */}
                        {form.references && (
                          <div>
                            <h3 className="font-bold uppercase tracking-widest text-[10px] text-[#1b2a4a] mb-1.5 border-b border-[#1b2a4a]/20 pb-1">References</h3>
                            <p className="whitespace-pre-line leading-relaxed text-gray-700">{form.references}</p>
                          </div>
                        )}

                        {/* Projects */}
                        {form.projects && (
                          <div>
                            <h3 className="font-bold uppercase tracking-widest text-[10px] text-[#1b2a4a] mb-1.5 border-b border-[#1b2a4a]/20 pb-1">Projects</h3>
                            <p className="whitespace-pre-line leading-relaxed text-gray-700">{form.projects}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
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
                <Button variant="outline" onClick={() => { setStatus("idle"); setForm(initialForm); setPhoto(null); }}>
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
