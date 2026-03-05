import { ResumeData, parseList, parseWorkEntries } from "../types";
import { User, Phone, Mail, MapPin, Globe } from "lucide-react";

const SageSplit = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <div className="bg-[#f0ede4] text-black w-full" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px" }}>
      <div className="grid grid-cols-[40%_60%]">
        {/* Left */}
        <div className="bg-[#f0ede4] p-5 space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[#3d5c3a] flex items-center justify-center">
              {d.photo ? <img src={d.photo} alt="" className="w-full h-full object-cover" /> : <User size={36} className="text-white/40" />}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black uppercase">{d.fullName || "MORGAN Maxwell"}</h1>
            <p className="text-sm text-gray-500 tracking-widest mt-1">{d.jobRole || "Professional"}</p>
          </div>
          <div>
            <h3 className="font-bold text-xs bg-[#c5c0a9] text-gray-800 px-2 py-1 rounded inline-block mb-2">About Me</h3>
            <p className="text-gray-600 leading-relaxed">{d.careerGoal || "Summary..."}</p>
          </div>
          <div>
            <h3 className="font-bold text-xs bg-[#c5c0a9] text-gray-800 px-2 py-1 rounded inline-block mb-2">Skills</h3>
            <div className="space-y-1.5">
              {(d.skills ? parseList(d.skills) : ["Skill 1"]).map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-700">{s}</span>
                  <span className="text-gray-500 text-[9px]">{80 + (i * 5) % 20}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xs bg-[#c5c0a9] text-gray-800 px-2 py-1 rounded inline-block mb-2">Education</h3>
            <p className="whitespace-pre-line text-gray-600">{d.education || "Education..."}</p>
          </div>
          {d.languages && (
            <div>
              <h3 className="font-bold text-xs bg-[#c5c0a9] text-gray-800 px-2 py-1 rounded inline-block mb-2">Languages</h3>
              <div className="flex gap-3 mt-1">
                {parseList(d.languages).map((l, i) => (
                  <span key={i} className="text-gray-600 text-[9px]">{l}</span>
                ))}
              </div>
            </div>
          )}
          <div className="text-[9px] text-gray-500 space-y-1 mt-2">
            <div className="flex items-center gap-1.5"><Phone size={9} /> {d.phone || "+123-456-7890"}</div>
            <div className="flex items-center gap-1.5"><Globe size={9} /> {d.portfolio || "www.example.com"}</div>
            <div className="flex items-center gap-1.5"><MapPin size={9} /> {d.address || "123 Anywhere St."}</div>
          </div>
        </div>

        {/* Right */}
        <div className="bg-[#3d5c3a] text-white p-5 space-y-4 min-h-[700px]">
          <div>
            <h3 className="font-bold text-xs bg-white/20 px-2 py-1 rounded inline-block mb-2">Professional Experience</h3>
            {d.workExperience ? (
              <div className="space-y-3">
                {parseWorkEntries(d.workExperience).map((e, i) => (
                  <div key={i}>
                    <p className="font-semibold">{e.header}</p>
                    <ul className="ml-3 opacity-90 space-y-0.5">
                      {e.bullets.map((b, j) => <li key={j}>• {b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ) : <p className="opacity-50 italic">Work experience...</p>}
          </div>
          {d.projects && (
            <div>
              <h3 className="font-bold text-xs bg-white/20 px-2 py-1 rounded inline-block mb-2">Projects</h3>
              <p className="whitespace-pre-line opacity-90">{d.projects}</p>
            </div>
          )}
          {d.references && (
            <div>
              <h3 className="font-bold text-xs bg-white/20 px-2 py-1 rounded inline-block mb-2">References</h3>
              <p className="whitespace-pre-line opacity-90">{d.references}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SageSplit;
