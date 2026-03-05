import { ResumeData, parseList, parseWorkEntries } from "../types";
import { User, Phone, Mail, MapPin, Globe } from "lucide-react";

const CreativeColorful = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <div className="bg-white text-black w-full" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px" }}>
      {/* Header */}
      <div className="relative bg-[#e8772e] p-6 pb-8">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/40 bg-white/20 flex items-center justify-center shrink-0">
            {d.photo ? <img src={d.photo} alt="" className="w-full h-full object-cover" /> : <User size={36} className="text-white/50" />}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white leading-tight">{d.fullName || "Anna Katrina Marchesi"}</h1>
            <div className="mt-2 bg-white/20 text-white px-3 py-1 rounded inline-block text-xs font-medium">{d.jobRole || "Professional"}</div>
            <div className="mt-2 text-white/90 text-[10px] space-y-0.5">
              <p>{d.address || "123 Anywhere St., Any City"}</p>
              <p>{d.phone || "+123-456-7890"} &nbsp; {d.email || "hello@example.com"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-6 p-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-[#e8772e] text-xs mb-1">Professional Summary</h3>
            <p className="text-gray-700 leading-relaxed">{d.careerGoal || "Your professional summary..."}</p>
          </div>
          <div>
            <h3 className="font-bold text-[#e8772e] text-xs mb-1">Key Skills</h3>
            <ul className="space-y-1">
              {(d.skills ? parseList(d.skills) : ["Skill 1", "Skill 2"]).map((s, i) => (
                <li key={i} className="flex items-center gap-1.5"><span className="text-[#e8772e]">✿</span> {s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#e8772e] text-xs mb-1">Certification</h3>
            <p className="text-gray-700 whitespace-pre-line">{d.projects || "Your certifications..."}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-[#e8772e] text-xs mb-1">Work Experience</h3>
            {d.workExperience ? (
              <div className="space-y-2">
                {parseWorkEntries(d.workExperience).map((e, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-800">{e.header}</p>
                    <ul className="ml-3 space-y-0.5 text-gray-600">
                      {e.bullets.map((b, j) => <li key={j}>• {b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-400 italic">Work experience...</p>}
          </div>
          <div>
            <h3 className="font-bold text-[#e8772e] text-xs mb-1">Education</h3>
            <p className="text-gray-700 whitespace-pre-line">{d.education || "Your education..."}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      {d.portfolio && (
        <div className="bg-[#e8772e] text-white text-center py-2 text-[10px]">{d.portfolio}</div>
      )}
    </div>
  );
};

export default CreativeColorful;
