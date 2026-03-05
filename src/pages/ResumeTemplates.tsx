import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { templates } from "@/components/resume/templateRegistry";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const ResumeTemplates = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Layout>
      <section className="py-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-4">
              <Sparkles size={14} className="inline mr-1.5 -mt-0.5" />
              Choose Your Template
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pick a Resume Template
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates. Each template is fully customizable with your information.
            </p>
          </motion.div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onMouseEnter={() => setHoveredId(template.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Preview Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredId === template.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Button
                      size="lg"
                      onClick={() => navigate(`/resume/builder?template=${template.id}`)}
                      className="gap-2 text-base shadow-2xl"
                    >
                      Use Template <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-4 h-4 rounded-full shrink-0"
                      style={{ backgroundColor: template.color }}
                    />
                    <h3 className="font-display font-bold text-foreground text-lg">
                      {template.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full gap-1.5"
                    onClick={() => navigate(`/resume/builder?template=${template.id}`)}
                  >
                    Use This Template <ArrowRight size={14} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResumeTemplates;
