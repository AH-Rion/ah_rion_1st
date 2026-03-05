import { lazy } from "react";
import { ResumeData } from "./types";

const CreativeColorful = lazy(() => import("./templates/CreativeColorful"));
const EarthyElegant = lazy(() => import("./templates/EarthyElegant"));
const TealProfessional = lazy(() => import("./templates/TealProfessional"));
const ModernTeal = lazy(() => import("./templates/ModernTeal"));
const NavyClassic = lazy(() => import("./templates/NavyClassic"));
const SageSplit = lazy(() => import("./templates/SageSplit"));
const SlateModern = lazy(() => import("./templates/SlateModern"));
const MinimalClean = lazy(() => import("./templates/MinimalClean"));
const ExecutiveGray = lazy(() => import("./templates/ExecutiveGray"));

const templateComponents: Record<string, React.ComponentType<{ data: ResumeData }>> = {
  "creative-colorful": CreativeColorful,
  "earthy-elegant": EarthyElegant,
  "teal-professional": TealProfessional,
  "modern-teal": ModernTeal,
  "navy-classic": NavyClassic,
  "sage-split": SageSplit,
  "slate-modern": SlateModern,
  "minimal-clean": MinimalClean,
  "executive-gray": ExecutiveGray,
};

export default templateComponents;
