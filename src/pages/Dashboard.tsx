import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText, Plus, Download, LogOut, User, Sparkles,
  Sun, Moon,
} from "lucide-react";
import { useTheme } from "next-themes";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  const cards = [
    {
      title: "Create New Resume",
      desc: "Start from a professional template",
      icon: Plus,
      to: "/resume",
      accent: true,
    },
    {
      title: "My Resumes",
      desc: "View and edit your saved resumes",
      icon: FileText,
      to: "/resume",
      accent: false,
    },
    {
      title: "AI Resume Builder",
      desc: "Generate with AI in 60 seconds",
      icon: Sparkles,
      to: "/resume",
      accent: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border glass sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="font-display text-xl font-bold text-foreground">
            Free Resume<span className="text-gradient">Builder</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Welcome, <span className="text-gradient">{displayName}</span>
              </h1>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Action Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={c.to}
                className={`block group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${
                  c.accent
                    ? "border-primary/30 bg-primary/5 hover:border-primary/60"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${
                    c.accent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:text-primary"
                  }`}
                >
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h2 className="font-display font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm" className="gap-2">
              <Link to="/resume">
                <Plus className="h-4 w-4" /> New Resume
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to="/resume">
                <Download className="h-4 w-4" /> Download Resume
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to="/pricing">
                <Sparkles className="h-4 w-4" /> Upgrade Plan
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
