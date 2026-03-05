import { ResumeData, parseList, parseWorkEntries } from "../types";
import { User, Phone, Mail, MapPin, Globe } from "lucide-react";

const TealProfessional = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <div className="bg-white text-black w-full" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px" }}>
      {/* Header */}
      <div className="bg-[#0d6b6e] text-white p-6 flex items-center gap-5">
        <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-white/30 bg-white/10 flex items-center justify-center shrink-0">
          {d.photo ? <img src={d.photo} alt="" className="w-full h-full object-cover" /> : <User size={36} className="text-white/40" />}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{d.fullName || "Richard Sanchez"}</h1>
          <p className="text-sm opacity-80">{d.jobRole || "Professional"}</p>
          <p className="mt-2 text-[10px] leading-relaxed opacity-90 max-w-md">{d.careerGoal || "Professional summary..."}</p>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[35%_65%]">
        {/* Sidebar */}
        <div className="bg-[#0d6b6e] text-white p-5 space-y-4">
          <div>
            <h3 className="font-bold text-[10px] uppercase tracking-widest mb-2">Contact</h3>
            <div className="space-y-1.5 text-[9px]">
              <div className="flex items-center gap-2"><Phone size={9} /> {d.phone || "+123-456-7890"}</div>
              <div className="flex items-center gap-2"><Mail size={9} /> {d.email || "hello@example.com"}</div>
              {d.portfolio && <div className="flex items-center gap-2"><Globe size={9} /> {d.portfolio}</div>}
              <div className="flex items-center gap-2"><MapPin size={9} /> {d.address || "123 Anywhere St."}</div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-[10px] uppercase tracking-widest mb-2">Education</h3>
            <p className="whitespace-pre-line text-[9px] opacity-90">{d.education || "Your education..."}</p>
          </div>
          {d.languages && (
            <div>
              <h3 className="font-bold text-[10px] uppercase tracking-widest mb-2">Languages</h3>
              <ul className="space-y-1 text-[9px]">
                {parseList(d.languages).map((l, i) => <li key={i}>• {l}</li>)}
              </ul>
            </div>
          )}
          {d.references && (
            <div>
              <h3 className="font-bold text-[10px] uppercase tracking-widest mb-2">Awards</h3>
              <p className="whitespace-pre-line text-[9px] opacity-90">{d.references}</p>
            </div>
          )}
        </div>

        {/* Main */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="font-bold text-xs text-[#0d6b6e] mb-1.5 border-b border-[#0d6b6e]/20 pb-1">Work Experience</h3>
            {d.workExperience ? (
              <div className="space-y-2">
                {parseWorkEntries(d.workExperience).map((e, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-800">{e.header}</p>
                    <ul className="ml-3 text-gray-600 space-y-0.5">
                      {e.bullets.map((b, j) => <li key={j}>• {b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-400 italic">Work experience...</p>}
          </div>
          <div>
            <h3 className="font-bold text-xs text-[#0d6b6e] mb-1.5 border-b border-[#0d6b6e]/20 pb-1">Skills</h3>
            <div className="space-y-1.5">
              {(d.skills ? parseList(d.skills) : ["Skill 1", "Skill 2"]).map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-gray-700">{s}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0d6b6e] rounded-full" style={{ width: `${75 + (i * 5) % 25}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TealProfessional;
