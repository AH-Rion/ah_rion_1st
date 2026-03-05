import { ResumeData, parseList, parseWorkEntries } from "../types";
import { User, Phone, Mail, MapPin } from "lucide-react";

const ExecutiveGray = ({ data }: { data: ResumeData }) => {
  const d = data;
  return (
    <div className="bg-white text-black w-full" style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px" }}>
      {/* Header */}
      <div className="bg-[#3d7c73] text-white p-5 flex items-center gap-5">
        <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-white/30 bg-white/10 flex items-center justify-center shrink-0">
          {d.photo ? <img src={d.photo} alt="" className="w-full h-full object-cover" /> : <User size={36} className="text-white/40" />}
        </div>
        <div>
          <h1 className="text-2xl font-black">{d.fullName || "Isabel Schumacher"}</h1>
          <p className="text-sm opacity-80">{d.jobRole || "Sales Representative"}</p>
        </div>
      </div>

      <div className="grid grid-cols-[35%_65%]">
        {/* Left */}
        <div className="p-5 space-y-4 bg-gray-50">
          <div>
            <h3 className="font-bold text-xs text-[#3d7c73] mb-1 flex items-center gap-1">✆ Contact</h3>
            <div className="space-y-1 text-[9px] text-gray-600">
              <p>{d.email || "hello@example.com"}</p>
              <p>{d.phone || "+123-456-7890"}</p>
              <p>{d.address || "123 Anywhere St."}</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xs text-[#3d7c73] mb-1">🎓 Education</h3>
            <p className="whitespace-pre-line text-gray-600">{d.education || "Education..."}</p>
          </div>
          <div>
            <h3 className="font-bold text-xs text-[#3d7c73] mb-1">✦ Skills</h3>
            <ul className="text-gray-600 space-y-0.5">
              {(d.skills ? parseList(d.skills) : ["Skill 1"]).map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
          </div>
          {d.references && (
            <div>
              <h3 className="font-bold text-xs text-[#3d7c73] mb-1">🏆 Awards</h3>
              <p className="whitespace-pre-line text-gray-600">{d.references}</p>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="font-bold text-xs text-[#3d7c73] mb-1">Profile</h3>
            <p className="text-gray-700 leading-relaxed">{d.careerGoal || "Summary..."}</p>
          </div>
          <div>
            <h3 className="font-bold text-xs text-[#3d7c73] mb-2">Work Experience</h3>
            {d.workExperience ? (
              <div className="space-y-3">
                {parseWorkEntries(d.workExperience).map((e, i) => (
                  <div key={i} className="relative pl-4 border-l-2 border-gray-200">
                    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-[#3d7c73]" />
                    <p className="font-semibold text-gray-800">{e.header}</p>
                    <ul className="mt-1 text-gray-600 space-y-0.5">
                      {e.bullets.map((b, j) => <li key={j}>• {b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-400 italic">Work experience...</p>}
          </div>
          {d.projects && (
            <div>
              <h3 className="font-bold text-xs text-[#3d7c73] mb-1">Reference</h3>
              <p className="whitespace-pre-line text-gray-700">{d.projects}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveGray;
