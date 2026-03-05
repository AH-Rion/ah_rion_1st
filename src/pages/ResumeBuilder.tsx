import { useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import {
  Loader2, Sparkles, Upload, Download, ArrowLeft, FileText,
  CheckCircle2, Eye, Wand2, ChevronLeft,
} from "lucide-react";
import { z } from "zod";
import { ResumeData, initialResumeData } from "@/components/resume/types";
import { templates } from "@/components/resume/templateRegistry";
import templateComponents from "@/components/resume/templateComponents";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

const WEBHOOK_URL = "https://jsadkjdj.app.n8n.cloud/webhook/477e6e25-7a8b-4788-b96e-42bcd00714b6";

const AI_PROMPT = `You are a world-class professional resume writer. Using the candidate data below, generate a polished, ATS-optimized resume. Use strong action verbs, quantify achievements, keep 1-2 pages max. Format as clean text.\n\nCANDIDATE DATA:\n`;

const fieldConfig = [
  { name: "fullName" as const, label: "Full Name", placeholder: "Richard Sanchez", type: "input" },
  { name: "jobRole" as const, label: "Job Role", placeholder: "Marketing Manager", type: "input" },
  { name: "email" as const, label: "Email", placeholder: "hello@reallygreatsite.com", type: "input" },
  { name: "phone" as const, label: "Phone", placeholder: "+123-456-7890", type: "input" },
  { name: "address" as const, label: "Address", placeholder: "123 Anywhere St., Any City", type: "input" },
  { name: "portfolio" as const, label: "Website / Portfolio", placeholder: "www.reallygreatsite.com (optional)", type: "input" },
  { name: "careerGoal" as const, label: "Profile / Summary", placeholder: "A brief professional summary...", type: "textarea" },
  { name: "workExperience" as const, label: "Work Experience", placeholder: "Company — Role — Duration\n• Key achievement...", type: "textarea" },
  { name: "skills" as const, label: "Skills", placeholder: "Project Management, Leadership...", type: "textarea" },
  { name: "education" as const, label: "Education", placeholder: "2025 - 2029\nUniversity\n• Degree", type: "textarea" },
  { name: "languages" as const, label: "Languages", placeholder: "English (Fluent), French...", type: "textarea" },
  { name: "projects" as const, label: "Projects / Certifications", placeholder: "Project name and description...", type: "textarea" },
  { name: "references" as const, label: "References", placeholder: "Name — Title\nPhone / Email", type: "textarea" },
];

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateId = searchParams.get("template") || "navy-classic";
  const templateInfo = templates.find((t) => t.id === templateId) || templates[4];
  const TemplateComponent = templateComponents[templateId] || templateComponents["navy-classic"];

  const [form, setForm] = useState<ResumeData>({ ...initialResumeData, photo: null });
  const [errors, setErrors] = useState<Partial<Record<keyof ResumeData, string>>>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState("");
  const [downloading, setDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((name: keyof ResumeData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, [errors]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Max 5MB"); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPhoto(result);
      setForm((prev) => ({ ...prev, photo: result }));
    };
    reader.readAsDataURL(file);
  };

  // Download live preview as PDF
  const downloadPreviewPDF = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, useCORS: true, backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${form.fullName || "Resume"}_Preview.pdf`);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading(false);
    }
  };

  // Send to webhook for AI-generated PDF
  const handleGenerateAI = async () => {
    const result = resumeSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<string, string>> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors as any);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const prompt = AI_PROMPT + JSON.stringify(result.data, null, 2);
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, photo, prompt }),
      });
      if (!res.ok) { setStatus("error"); return; }

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/pdf")) {
        const blob = await res.blob();
        setPdfUrl(URL.createObjectURL(blob));
        setAiResponse("");
        setStatus("success");
        return;
      }

      if (contentType.includes("application/octet-stream")) {
        const blob = await res.blob();
        const header = new TextDecoder().decode(await blob.slice(0, 5).arrayBuffer());
        if (header.startsWith("%PDF")) {
          setPdfUrl(URL.createObjectURL(new Blob([blob], { type: "application/pdf" })));
          setAiResponse("");
          setStatus("success");
          return;
        }
      }

      const data = await res.text();
      let parsedContent = data;
      try {
        const jsonData = JSON.parse(data);
        const pdfKeys = ["pdf", "file", "document", "binary", "data", "output", "result"];
        for (const key of pdfKeys) {
          const val = jsonData[key];
          if (typeof val === "string" && val.length > 100) {
            const clean = val.replace(/^data:application\/pdf;base64,/, "");
            try {
              const binaryStr = atob(clean.substring(0, 10));
              if (binaryStr.startsWith("%PDF")) {
                const byteChars = atob(clean);
                const byteArray = new Uint8Array(byteChars.length);
                for (let i = 0; i < byteChars.length; i++) byteArray[i] = byteChars.charCodeAt(i);
                setPdfUrl(URL.createObjectURL(new Blob([byteArray], { type: "application/pdf" })));
                setAiResponse("");
                setStatus("success");
                return;
              }
            } catch { /* not base64 */ }
          }
        }
        parsedContent = jsonData.output || jsonData.text || jsonData.message || jsonData.response || jsonData.result || (typeof jsonData.data === "string" ? jsonData.data : JSON.stringify(jsonData, null, 2));
      } catch { /* raw text */ }
      setPdfUrl(null);
      setAiResponse(parsedContent);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const formData: ResumeData = { ...form, photo };

  return (
    <Layout>
      <section className="py-20 bg-background min-h-screen">
        <div className="container mx-auto px-4 max-w-[1400px]">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate("/resume")} className="gap-1.5">
              <ChevronLeft size={16} /> Back to Templates
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: templateInfo.color }} />
              <span className="font-display font-bold text-foreground">{templateInfo.name}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={downloadPreviewPDF} disabled={downloading} className="gap-1.5">
                {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                {downloading ? "Exporting..." : "Download Preview"}
              </Button>
              <Button size="sm" onClick={handleGenerateAI} disabled={status === "loading"} className="gap-1.5">
                {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                {status === "loading" ? "Generating..." : "AI Generate PDF"}
              </Button>
            </div>
          </div>

          {status === "success" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="text-primary" size={20} />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">AI Resume Ready!</h2>
                  <p className="text-sm text-muted-foreground">{pdfUrl ? "PDF ready to download." : "Review your AI-enhanced resume."}</p>
                </div>
              </div>

              {pdfUrl ? (
                <div className="border border-border rounded-xl overflow-hidden shadow-2xl bg-card">
                  <div className="flex items-center justify-between px-6 py-3 bg-muted/50 border-b border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText size={16} />
                      <span className="text-xs font-medium uppercase tracking-wider">AI-Generated PDF</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => { const a = document.createElement("a"); a.href = pdfUrl; a.download = `${form.fullName || "Resume"}_AI.pdf`; a.click(); }}>
                        <Download size={14} className="mr-1.5" /> Download
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => window.open(pdfUrl, "_blank")}>Open in Tab</Button>
                    </div>
                  </div>
                  <iframe src={pdfUrl} title="PDF" className="w-full border-0" style={{ height: "80vh", minHeight: "600px" }} />
                </div>
              ) : (
                <div className="border border-border rounded-xl overflow-hidden shadow-2xl bg-card">
                  <div className="flex items-center justify-between px-6 py-3 bg-muted/50 border-b border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText size={16} />
                      <span className="text-xs font-medium uppercase tracking-wider">AI Resume</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(aiResponse)}>Copy</Button>
                  </div>
                  <div className="p-8 bg-white min-h-[400px]">
                    <pre className="whitespace-pre-wrap text-gray-800 text-sm font-sans leading-relaxed">{aiResponse}</pre>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" onClick={() => { setStatus("idle"); setAiResponse(""); if (pdfUrl) { URL.revokeObjectURL(pdfUrl); setPdfUrl(null); } }}>
                  <ArrowLeft size={16} className="mr-2" /> Edit & Regenerate
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Main Builder: Form + Preview */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Form */}
              <div className="order-2 lg:order-1 space-y-5 max-h-[calc(100vh-160px)] overflow-y-auto pr-2 pb-8">
                <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" /> Enter Your Information
                </h2>

                {/* Photo */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Your Photo</Label>
                  <div className="flex items-center gap-4">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden bg-muted/30"
                    >
                      {photo ? <img src={photo} alt="" className="w-full h-full object-cover" /> : <Upload size={20} className="text-muted-foreground/50" />}
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      <Upload size={14} className="mr-2" /> {photo ? "Change" : "Upload"}
                    </Button>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </div>
                </div>

                {fieldConfig.map((f) => (
                  <div key={f.name} className="space-y-1.5">
                    <Label htmlFor={f.name} className="text-sm font-medium text-foreground">{f.label}</Label>
                    {f.type === "input" ? (
                      <Input id={f.name} placeholder={f.placeholder} value={(form as any)[f.name]} onChange={(e) => handleChange(f.name as keyof ResumeData, e.target.value)} className={errors[f.name as keyof ResumeData] ? "border-destructive" : ""} />
                    ) : (
                      <Textarea id={f.name} placeholder={f.placeholder} value={(form as any)[f.name]} onChange={(e) => handleChange(f.name as keyof ResumeData, e.target.value)} rows={3} className={errors[f.name as keyof ResumeData] ? "border-destructive" : ""} />
                    )}
                    {errors[f.name as keyof ResumeData] && <p className="text-xs text-destructive">{errors[f.name as keyof ResumeData]}</p>}
                  </div>
                ))}

                {status === "error" && <p className="text-sm text-destructive text-center">Something went wrong. Try again.</p>}
              </div>

              {/* Right: Live Preview */}
              <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Eye size={14} /> Live Preview
                  </p>
                  <Button variant="outline" size="sm" onClick={downloadPreviewPDF} disabled={downloading} className="gap-1.5">
                    {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                    Download
                  </Button>
                </div>
                <div className="border border-border rounded-xl overflow-hidden shadow-2xl bg-white max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div ref={previewRef}>
                    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading template...</div>}>
                      <TemplateComponent data={formData} />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ResumeBuilder;
