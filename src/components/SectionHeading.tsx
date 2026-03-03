import { motion } from "framer-motion";

const SectionHeading = ({
  badge,
  title,
  description,
}: {
  badge?: string;
  title: string;
  description?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-center mb-16"
  >
    {badge && (
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-4">
        {badge}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
    {description && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
    )}
  </motion.div>
);

export default SectionHeading;
