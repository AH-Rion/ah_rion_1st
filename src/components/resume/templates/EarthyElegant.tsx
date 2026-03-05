import { ResumeData, parseList, parseWorkEntries } from "../types";
import { User, Phone, Mail, MapPin } from "lucide-react";

const EarthyElegant = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <div className="bg-[#8B7355] text-[#f5e6c8] w-full min-h-[700px] relative" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px" }}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-end gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-black text-[#f5e6c8] uppercase tracking-tight leading-none">{d.fullName || "Juliana Silva"}</h1>
            <p className="text-sm mt-1 italic opacity-80">{d.jobRole || "Professional"}</p>
          </div>
          <div className="ml-auto w-28 h-28 rounded-lg overflow-hidden border-2 border-[#f5e6c8]/30 bg-[#f5e6c8]/10 flex items-center justify-center shrink-0">
            {d.photo ? <img src={d.photo} alt="" className="w-full h-full object-cover" /> : <User size={40} className="text-[#f5e6c8]/40" />}
          </div>
        </div>

        {/* Summary */}
        <p className="mb-4 leading-relaxed opacity-90">{d.careerGoal || "Your professional summary..."}</p>

        {/* Contact Row */}
        <div className="flex flex-wrap gap-4 mb-5 text-[9px]">
          <span className="flex items-center gap-1"><Phone size={10} /> {d.phone || "+123-456-7890"}</span>
          <span className="flex items-center gap-1"><Mail size={10} /> {d.email || "hello@example.com"}</span>
          <span className="flex items-center gap-1"><MapPin size={10} /> {d.address || "123 Anywhere St."}</span>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-xs mb-1 border-b border-[#f5e6c8]/30 pb-1">Work Experience</h3>
              {d.workExperience ? (
                <div className="space-y-2">
                  {parseWorkEntries(d.workExperience).map((e, i) => (
                    <div key={i}>
                      <p className="font-semibold">{e.header}</p>
                      <ul className="ml-2 space-y-0.5 opacity-80">
                        {e.bullets.map((b, j) => <li key={j}>• {b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : <p className="opacity-50 italic">Work experience...</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-xs mb-1 border-b border-[#f5e6c8]/30 pb-1">Expertise</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {(d.skills ? parseList(d.skills) : ["Skill 1", "Skill 2"]).slice(0, 6).map((s, i) => (
                  <span key={i} className="bg-[#f5e6c8]/15 px-2 py-0.5 rounded text-[9px]">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xs mb-1 border-b border-[#f5e6c8]/30 pb-1">Education</h3>
              <p className="whitespace-pre-line opacity-90">{d.education || "Your education..."}</p>
            </div>
            {d.languages && (
              <div>
                <h3 className="font-bold text-xs mb-1 border-b border-[#f5e6c8]/30 pb-1">Languages</h3>
                <p className="whitespace-pre-line opacity-90">{d.languages}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthyElegant;
