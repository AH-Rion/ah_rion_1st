import { TemplateInfo } from "./types";
import template1Preview from "@/assets/templates/template1-preview.png";
import template2Preview from "@/assets/templates/template2-preview.png";
import template3Preview from "@/assets/templates/template3-preview.png";
import template4Preview from "@/assets/templates/template4-preview.png";
import template5Preview from "@/assets/templates/template5-preview.png";
import template6Preview from "@/assets/templates/template6-preview.png";
import template7Preview from "@/assets/templates/template7-preview.png";
import template8Preview from "@/assets/templates/template8-preview.png";
import template9Preview from "@/assets/templates/template9-preview.png";

export const templates: TemplateInfo[] = [
  { id: "creative-colorful", name: "Creative Colorful", description: "Vibrant design with photo, perfect for creative roles", preview: template1Preview, color: "#e8772e" },
  { id: "earthy-elegant", name: "Earthy Elegant", description: "Warm brown tones with a modern, stylish layout", preview: template2Preview, color: "#8B6914" },
  { id: "teal-professional", name: "Teal Professional", description: "Clean teal sidebar with professional sections", preview: template3Preview, color: "#0d6b6e" },
  { id: "modern-teal", name: "Modern Teal", description: "Bold name header with teal accents and skills bars", preview: template4Preview, color: "#1a8a7d" },
  { id: "navy-classic", name: "Navy Classic", description: "Classic navy blue sidebar with clean structure", preview: template5Preview, color: "#1e3a5f" },
  { id: "sage-split", name: "Sage Split", description: "Olive green and cream split layout with expertise rings", preview: template6Preview, color: "#3d5c3a" },
  { id: "slate-modern", name: "Slate Modern", description: "Dark slate header with timeline and skill bars", preview: template7Preview, color: "#2c3e50" },
  { id: "minimal-clean", name: "Minimal Clean", description: "Light gray with minimal accents, ultra-clean look", preview: template8Preview, color: "#333333" },
  { id: "executive-gray", name: "Executive Gray", description: "Professional gray-teal design with references section", preview: template9Preview, color: "#3d7c73" },
];
