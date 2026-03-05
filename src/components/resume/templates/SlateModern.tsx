import { ResumeData, parseList, parseWorkEntries } from "../types";
import { User, Phone, Mail, MapPin } from "lucide-react";

const SlateModern = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <div className="bg-white text-black w-full" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px" }}>
      {/* Header */}
      <div className="bg-[#2c3e50] text-white p-5 flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white/30 bg-white/10 flex items-center justify-center shrink-0">
          {d.photo ? <img src={d.photo} alt="" className="w-full h-full object-cover" /> : <User size={32} className="text-white/40" />}
        </div>
        <div>
          <h1 className="text-2xl font-bold uppercase">{d.fullName || "LORNA ALVARADO"}</h1>
          <p className="text-sm opacity-80 tracking-wider">{d.jobRole || "Sales Representative"}</p>
        </div>
      </div>

      <div className="grid grid-cols-[35%_65%]">
        {/* Left */}
        <div className="bg-[#2c3e50] text-white p-5 space-y-4">
          <div>
            <h3 className="font-bold text-[10px] uppercase flex items-center gap-1.5 mb-1.5">👤 About Me</h3>
            <p className="text-[9px] opacity-90 leading-relaxed">{d.careerGoal || "Summary..."}</p>
          </div>
          <div>
            <h3 className="font-bold text-[10px] uppercase flex items-center gap-1.5 mb-1.5">📞 Contact</h3>
            <div className="space-y-1 text-[9px]">
              <div className="flex items-center gap-2"><Phone size={9} /> {d.phone || "+123-456-7890"}</div>
              <div className="flex items-center gap-2"><Mail size={9} /> {d.email || "hello@example.com"}</div>
              <div className="flex items-center gap-2"><MapPin size={9} /> {d.address || "123 Anywhere St."}</div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-[10px] uppercase mb-1.5">⚙️ Skills</h3>
            <ul className="text-[9px] space-y-0.5">
              {(d.skills ? parseList(d.skills) : ["Skill 1"]).map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
          </div>
          {d.languages && (
            <div>
              <h3 className="font-bold text-[10px] uppercase mb-1.5">🌐 Language</h3>
              <ul className="text-[9px] space-y-0.5">
                {parseList(d.languages).map((l, i) => <li key={i}>• {l}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="font-bold text-xs flex items-center gap-1.5 text-[#2c3e50] mb-2">🎓 Education</h3>
            <p className="whitespace-pre-line text-gray-700">{d.education || "Education..."}</p>
          </div>
          <div>
            <h3 className="font-bold text-xs flex items-center gap-1.5 text-[#2c3e50] mb-2">💼 Professional Experience</h3>
            {d.workExperience ? (
              <div className="space-y-3">
                {parseWorkEntries(d.workExperience).map((e, i) => (
                  <div key={i} className="border-l-2 border-[#2c3e50] pl-3">
                    <p className="font-semibold text-gray-800">{e.header}</p>
                    <ul className="mt-1 text-gray-600 space-y-0.5">
                      {e.bullets.map((b, j) => <li key={j}>• {b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-400 italic">Work experience...</p>}
          </div>
          {d.references && (
            <div>
              <h3 className="font-bold text-xs text-[#2c3e50] mb-2">References</h3>
              <p className="whitespace-pre-line text-gray-700">{d.references}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlateModern;
