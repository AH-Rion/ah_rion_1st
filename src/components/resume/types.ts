export interface ResumeData {
  fullName: string;
  jobRole: string;
  email: string;
  phone: string;
  address: string;
  portfolio: string;
  careerGoal: string;
  workExperience: string;
  skills: string;
  education: string;
  languages: string;
  projects: string;
  references: string;
  photo: string | null;
}

export const initialResumeData: ResumeData = {
  fullName: "",
  jobRole: "",
  email: "",
  phone: "",
  address: "",
  portfolio: "",
  careerGoal: "",
  workExperience: "",
  skills: "",
  education: "",
  languages: "",
  projects: "",
  references: "",
  photo: null,
};

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  preview: string;
  color: string;
}

// Utility parsers
export const parseList = (str: string) =>
  str.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);

export const parseWorkEntries = (str: string) => {
  const blocks = str.split(/\n(?=[A-Z])/).filter(Boolean);
  return blocks.map((block) => {
    const lines = block.split("\n").filter(Boolean);
    return {
      header: lines[0] || "",
      bullets: lines
        .slice(1)
        .map((l) => l.replace(/^[•\-\*]\s*/, "").trim())
        .filter(Boolean),
    };
  });
};

export const parseEducationEntries = (str: string) => {
  const blocks = str.split(/\n\n|\n(?=\d{4})/).filter(Boolean);
  return blocks.map((block) => {
    const lines = block.split("\n").filter(Boolean);
    return lines;
  });
};
