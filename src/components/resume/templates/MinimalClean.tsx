import { ResumeData, parseList, parseWorkEntries } from "../types";
import { User, Phone, Mail, MapPin } from "lucide-react";

const MinimalClean = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <div className="bg-[#f5f5f0] text-black w-full" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px" }}>
      {/* Header */}
      <div className="bg-[#333] text-white p-5 flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 bg-white/10 flex items-center justify-center shrink-0">
          {d.photo ? <img src={d.photo} alt="" className="w-full h-full object-cover" /> : <User size={32} className="text-white/40" />}
        </div>
        <div>
          <h1 className="text-2xl font-black uppercase">{d.fullName || "LORNA ALVARADO"}</h1>
          <p className="text-sm opacity-80 tracking-wider">{d.jobRole || "Sales Representative"}</p>
        </div>
      </div>

      <div className="grid grid-cols-[35%_65%] min-h-[600px]">
        {/* Left */}
        <div className="p-5 space-y-4 border-r border-gray-200">
          <div>
            <h3 className="font-bold text-xs text-[#333] mb-1">Contact</h3>
            <div className="space-y-1.5 text-[9px] text-gray-600">
              <p><strong>Phone</strong><br />{d.phone || "123-456-7890"}</p>
              <p><strong>Email</strong><br />{d.email || "hello@example.com"}</p>
              <p><strong>Address</strong><br />{d.address || "123 Anywhere St."}</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xs text-[#333] mb-1">Education</h3>
            <p className="whitespace-pre-line text-gray-600">{d.education || "Education..."}</p>
          </div>
          <div>
            <h3 className="font-bold text-xs text-[#333] mb-1">Skills</h3>
            <ul className="text-gray-600 space-y-0.5">
              {(d.skills ? parseList(d.skills) : ["Skill 1"]).map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
          </div>
          {d.languages && (
            <div>
              <h3 className="font-bold text-xs text-[#333] mb-1">Language</h3>
              <ul className="text-gray-600 space-y-0.5">
                {parseList(d.languages).map((l, i) => <li key={i}>• {l}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="font-bold text-xs text-[#333] mb-2 border-b border-gray-300 pb-1">Professional Experience</h3>
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
          {d.references && (
            <div>
              <h3 className="font-bold text-xs text-[#333] mb-2 border-b border-gray-300 pb-1">References</h3>
              <p className="whitespace-pre-line text-gray-700">{d.references}</p>
            </div>
          )}
          {d.projects && (
            <div>
              <h3 className="font-bold text-xs text-[#333] mb-2 border-b border-gray-300 pb-1">Projects</h3>
              <p className="whitespace-pre-line text-gray-700">{d.projects}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalClean;
