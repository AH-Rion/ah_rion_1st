import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link to="/" className="font-display text-lg font-bold text-foreground">
            Free Resume<span className="text-gradient">Builder</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            AI-powered resumes that get you hired. Built for professionals who value their time.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-foreground mb-4">Product</h4>
          <div className="flex flex-col gap-2">
            <Link to="/product" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link to="/resume" className="text-sm text-muted-foreground hover:text-primary transition-colors">Build Resume</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-foreground mb-4">Company</h4>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-foreground mb-4">Legal</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Privacy Policy</span>
            <span className="text-sm text-muted-foreground">Terms of Service</span>
            <span className="text-sm text-muted-foreground">Refund Policy</span>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 Free Resume Builder. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">Crafted with AI precision.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
