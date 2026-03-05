import { ResumeData, parseList, parseWorkEntries } from "../types";
import { User, Phone, Mail, MapPin } from "lucide-react";

const ModernTeal = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <div className="bg-white text-black w-full" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px" }}>
      <div className="grid grid-cols-[35%_65%]">
        {/* Left sidebar */}
        <div className="bg-[#1a8a7d] text-white p-5 space-y-4 min-h-[700px]">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 bg-white/10 flex items-center justify-center">
              {d.photo ? <img src={d.photo} alt="" className="w-full h-full object-cover" /> : <User size={36} className="text-white/40" />}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-[10px] uppercase mb-1">About Me</h3>
            <p className="text-[9px] opacity-90 leading-relaxed">{d.careerGoal || "Professional summary..."}</p>
          </div>
          <div>
            <h3 className="font-bold text-[10px] uppercase mb-1">Contact</h3>
            <div className="space-y-1.5 text-[9px]">
              <div className="flex items-center gap-2"><Phone size={9} /> {d.phone || "+123-456-7890"}</div>
              <div className="flex items-center gap-2"><Mail size={9} /> {d.email || "hello@example.com"}</div>
              <div className="flex items-center gap-2"><MapPin size={9} /> {d.address || "123 Anywhere St."}</div>
            </div>
          </div>
          {d.languages && (
            <div>
              <h3 className="font-bold text-[10px] uppercase mb-1">Language</h3>
              <ul className="text-[9px] space-y-0.5">
                {parseList(d.languages).map((l, i) => <li key={i}>• {l}</li>)}
              </ul>
            </div>
          )}
          <div>
            <h3 className="font-bold text-[10px] uppercase mb-1">Expertise</h3>
            <ul className="text-[9px] space-y-0.5">
              {(d.skills ? parseList(d.skills) : ["Skill 1", "Skill 2"]).map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
          </div>
        </div>

        {/* Right */}
        <div className="p-5">
          <h1 className="text-3xl font-black text-gray-800 uppercase leading-none">{d.fullName || "RICHARD SANCHEZ"}</h1>
          <p className="text-sm text-[#1a8a7d] font-medium mt-1">{d.jobRole || "Professional"}</p>

          <div className="mt-5 space-y-4">
            <div>
              <h3 className="font-bold text-xs bg-gray-100 text-gray-800 px-2 py-1 inline-block uppercase tracking-wider mb-2">Experience</h3>
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
              <h3 className="font-bold text-xs bg-gray-100 text-gray-800 px-2 py-1 inline-block uppercase tracking-wider mb-2">Education</h3>
              <p className="whitespace-pre-line text-gray-700">{d.education || "Your education..."}</p>
            </div>
            <div>
              <h3 className="font-bold text-xs bg-gray-100 text-gray-800 px-2 py-1 inline-block uppercase tracking-wider mb-2">Skills Summary</h3>
              <div className="space-y-1.5">
                {(d.skills ? parseList(d.skills) : ["Skill 1"]).slice(0, 5).map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-gray-700 w-32 truncate">{s}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#1a8a7d] rounded-full" style={{ width: `${70 + (i * 7) % 30}%` }} />
                    </div>
                    <span className="text-[9px] text-gray-500">{70 + (i * 7) % 30}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTeal;
