import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Sparkles, Shield, Zap } from "lucide-react";

const features = [
  { icon: Sparkles, label: "AI-Powered Templates" },
  { icon: Shield, label: "ATS-Optimized Resumes" },
  { icon: Zap, label: "Build in 60 Seconds" },
];

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left visual panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[hsl(220,20%,4%)] via-[hsl(220,25%,10%)] to-[hsl(220,20%,4%)]">
        {/* Animated glow orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/20 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <Link to="/" className="font-display text-2xl font-bold tracking-tight text-white mb-2">
            Free Resume<span className="text-gradient">Builder</span>
          </Link>
          <p className="text-[hsl(220,10%,55%)] text-sm mb-12">
            By <span className="text-gradient font-semibold">AH RION</span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FileText className="h-16 w-16 text-primary mb-6" />
            <h2 className="text-3xl xl:text-4xl font-display font-bold text-white leading-tight mb-4">
              Build Your Dream
              <br />
              <span className="text-gradient">Resume Today</span>
            </h2>
            <p className="text-[hsl(220,10%,55%)] text-lg max-w-md mb-10">
              Create professional, ATS-optimized resumes powered by AI.
              Stand out from the crowd in under 60 seconds.
            </p>
          </motion.div>

          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-white/80 font-medium">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background relative">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
