import { ResumeData, parseList, parseWorkEntries } from "../types";
import { User, Phone, Mail, MapPin } from "lucide-react";

const NavyClassic = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <div className="bg-white text-black w-full" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px" }}>
      {/* Header */}
      <div className="bg-[#1e3a5f] text-white p-5 flex items-center gap-5">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 bg-white/10 flex items-center justify-center shrink-0">
          {d.photo ? <img src={d.photo} alt="" className="w-full h-full object-cover" /> : <User size={36} className="text-white/40" />}
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">{d.fullName || "RICHARD SANCHEZ"}</h1>
          <p className="text-sm opacity-80 mt-1">{d.jobRole || "Product Designer"}</p>
        </div>
      </div>

      <div className="grid grid-cols-[35%_65%]">
        {/* Sidebar */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="font-bold text-xs text-[#1e3a5f] mb-1">About Me</h3>
            <p className="text-gray-600 leading-relaxed">{d.careerGoal || "Summary..."}</p>
          </div>
          <div>
            <h3 className="font-bold text-xs text-[#1e3a5f] mb-1">Contact</h3>
            <div className="space-y-1.5 text-[9px] text-gray-600">
              <div className="flex items-center gap-2"><Phone size={9} className="text-[#1e3a5f]" /> {d.phone || "+123-456-7890"}</div>
              <div className="flex items-center gap-2"><Mail size={9} className="text-[#1e3a5f]" /> {d.email || "hello@example.com"}</div>
              <div className="flex items-center gap-2"><MapPin size={9} className="text-[#1e3a5f]" /> {d.address || "123 Anywhere St."}</div>
            </div>
          </div>
          {d.languages && (
            <div>
              <h3 className="font-bold text-xs text-[#1e3a5f] mb-1 bg-[#1e3a5f] text-white px-2 py-0.5 inline-block">LANGUAGE</h3>
              <ul className="mt-1.5 space-y-0.5 text-gray-600">
                {parseList(d.languages).map((l, i) => <li key={i}>• {l}</li>)}
              </ul>
            </div>
          )}
          <div>
            <h3 className="font-bold text-xs bg-[#1e3a5f] text-white px-2 py-0.5 inline-block">EXPERTISE</h3>
            <ul className="mt-1.5 space-y-0.5 text-gray-600">
              {(d.skills ? parseList(d.skills) : ["Skill 1"]).map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
          </div>
        </div>

        {/* Main */}
        <div className="p-5 space-y-4 border-l border-gray-200">
          <div>
            <h3 className="font-bold text-xs bg-[#1e3a5f] text-white px-2 py-0.5 inline-block mb-2">EXPERIENCE</h3>
            {d.workExperience ? (
              <div className="space-y-3">
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
            <h3 className="font-bold text-xs bg-[#1e3a5f] text-white px-2 py-0.5 inline-block mb-2">EDUCATION</h3>
            <p className="whitespace-pre-line text-gray-700">{d.education || "Your education..."}</p>
          </div>
          {d.references && (
            <div>
              <h3 className="font-bold text-xs bg-[#1e3a5f] text-white px-2 py-0.5 inline-block mb-2">REFERENCES</h3>
              <p className="whitespace-pre-line text-gray-700">{d.references}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavyClassic;
