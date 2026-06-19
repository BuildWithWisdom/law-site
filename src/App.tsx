import React, { useState } from 'react';
import { 
  Phone, 
  Calendar, 
  MessageSquare, 
  MessageCircle,
  ArrowRight,
  MapPin,
  Mail,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle2,
  ShieldCheck,
  Briefcase,
  Users,
  Home,
  Scale,
  FileText,
  Star,
  Gavel,
  Quote,
  Menu,
  X
} from 'lucide-react';

const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
const lawyerName = params.get('name') || 'Legal Padi';
const lawyerEmail = params.get('email') || 'info@legalpadi.com';
const lawyerInitials = lawyerName === 'Legal Padi' ? 'LP' : lawyerName.split(' ').map(n => n.charAt(0)).join('').slice(0, 2).toUpperCase();
const lawyerNameUpper = lawyerName.toUpperCase();

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState<string | null>(null);

  React.useEffect(() => {
    document.title = `${lawyerName} - Legal Practitioner`;
  }, []);

  const handleComingSoon = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    if (name === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setComingSoonMessage(`The ${name} section is coming soon.`);
    setTimeout(() => setComingSoonMessage(null), 3000);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white selection:bg-brand-gold selection:text-brand-dark">
      <Navbar onBookClick={() => setIsBookingModalOpen(true)} onLinkClick={handleComingSoon} />
      <main>
        <Hero onBookClick={() => setIsBookingModalOpen(true)} />
        <AboutAndServices />
        <ExperienceAndTestimonial />
        <InsightsAndCTA onBookClick={() => setIsBookingModalOpen(true)} />
      </main>
      <Footer onLinkClick={handleComingSoon} />
      {isBookingModalOpen && <BookingModal onClose={() => setIsBookingModalOpen(false)} />}
      
      {/* Centered Notification */}
      {comingSoonMessage && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 drop-shadow-2xl pointer-events-none">
          <div className="bg-brand-dark text-white px-8 py-6 shadow-2xl border-t-4 border-brand-gold animate-in zoom-in-95 fade-in duration-300 rounded-sm pointer-events-auto flex flex-col items-center max-w-xs text-center">
            <div className="w-10 h-10 mb-3 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold">
              <span className="text-base font-bold">i</span>
            </div>
            <h3 className="font-serif text-lg mb-1">Coming Soon</h3>
            <p className="text-sm text-gray-300 mb-5">{comingSoonMessage}</p>
            <button onClick={() => setComingSoonMessage(null)} className="text-sm text-brand-dark bg-brand-gold hover:bg-brand-gold-hover transition-colors font-medium px-4 py-2 rounded-sm w-full">
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Navbar({ onBookClick, onLinkClick }: { onBookClick: () => void, onLinkClick: (e: React.MouseEvent, name: string) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Me', href: '#' },
    { name: 'Practice Areas', href: '#' },
    { name: 'Results', href: '#' },
    { name: 'Articles', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="bg-brand-nav text-white py-5 px-6 md:px-12 xl:px-24 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="text-brand-gold font-serif text-3xl font-medium tracking-tighter sm:text-4xl">{lawyerInitials}</div>
        <div className="flex flex-col">
          <span className="font-serif text-base sm:text-lg tracking-wider leading-none mb-1">{lawyerNameUpper}</span>
          <div className="flex items-center opacity-70">
            <div className="h-px bg-white/50 flex-1"></div>
            <span className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] font-medium uppercase">Legal Practitioner</span>
            <div className="h-px bg-white/50 flex-1"></div>
          </div>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        {navLinks.map((link, idx) => (
          <a 
            key={idx} 
            href={link.href} 
            onClick={(e) => onLinkClick(e, link.name)}
            className={`text-xs xl:text-sm tracking-wide shrink-0 ${idx === 0 ? 'text-brand-gold border-b border-brand-gold pb-1' : 'text-gray-300 hover:text-white transition-colors'}`}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* CTA */}
      <button onClick={onBookClick} className="hidden sm:flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-semibold px-5 xl:px-6 py-2.5 transition-colors rounded-sm shrink-0">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">Book a Consultation</span>
      </button>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden text-brand-gold flex items-center">
        <button className="p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-darker border-t border-white/10 p-6 flex flex-col gap-6 lg:hidden shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href}
                onClick={(e) => { setIsMobileMenuOpen(false); onLinkClick(e, link.name); }}
                className={`text-base tracking-wide py-2 ${idx === 0 ? 'text-brand-gold font-medium' : 'text-gray-300 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <button onClick={() => { setIsMobileMenuOpen(false); onBookClick(); }} className="flex sm:hidden items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-semibold px-6 py-3.5 transition-colors rounded-sm w-full mt-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Book a Consultation</span>
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section className="relative bg-brand-dark flex flex-col lg:flex-row min-h-screen lg:min-h-[750px] overflow-hidden">
      {/* Background Image / Overlay (Right side focus) */}
      <div className="absolute inset-0 z-0 flex justify-end overflow-hidden lg:overflow-visible">
        <div className="w-full lg:w-[68%] h-full relative">
          <img 
            src="/lawyer-hero.png" 
            alt="Lawyer Portrait" 
            className="w-full h-full object-cover lg:object-[center_top] opacity-50 lg:opacity-100"
          />
          {/* Gradients to seamlessly blend the image into the dark left section */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent lg:hidden"></div>
          <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply"></div>
        </div>
      </div>
      
      {/* Solid dark block for the left side text area to prevent text cutoff on ultra-wides */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[42%] bg-brand-dark z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-24 pt-20 pb-28 sm:py-24 flex items-center">
        <div className="max-w-[42rem] text-white">
          <p className="hidden sm:block text-brand-gold font-medium tracking-[0.15em] text-xs sm:text-sm uppercase mb-6">Experienced. Strategic. Reliable.</p>
          <h1 className="font-serif text-[2rem] sm:text-4xl md:text-5xl lg:text-[4rem] leading-[1.15] sm:leading-[1.15] lg:leading-[1.1] mb-6 sm:mb-8 shadow-sm">
            Trusted Legal Counsel When It Matters 
            <span className="text-brand-gold"> Most.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300/90 mb-10 sm:mb-12 max-w-xl leading-relaxed">
            Practical legal solutions and strong advocacy for individuals, businesses and families.
          </p>

          {/* Stats inline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14">
            <div className="flex items-center gap-4">
              <div className="text-brand-gold">
                <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-2xl font-semibold leading-tight">10+</p>
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Years Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-brand-gold">
                <Briefcase className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-2xl font-semibold leading-tight">100+</p>
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Matters Handled</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-brand-gold">
                <Users className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-sm text-white font-medium leading-snug">Trusted by Clients</p>
                <p className="text-xs text-gray-400 mt-0.5">Across Nigeria</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onBookClick} className="flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-semibold px-8 py-4 transition-colors rounded-sm">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Book a Consultation</span>
            </button>
            <a href="https://wa.me/2348031234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-transparent border border-brand-gold hover:bg-brand-gold/10 text-brand-gold font-semibold px-8 py-4 transition-colors rounded-sm">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Signature Box - bottom right */}
      <div className="hidden xl:flex absolute bottom-12 right-24 z-10 border border-white/20 px-8 py-6 bg-black/40 backdrop-blur-md flex-col justify-center rounded-sm">
        <div className="font-serif italic text-4xl text-white/90 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          {lawyerName}
        </div>
        <div className="flex items-center gap-3 w-full opacity-80">
           <div className="h-px bg-brand-gold flex-1"></div>
           <div className="text-[0.65rem] tracking-[0.3em] font-medium text-brand-gold uppercase text-center">
             Legal Practitioner
           </div>
           <div className="h-px bg-brand-gold flex-1"></div>
        </div>
      </div>
    </section>
  );
}

function AboutAndServices() {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Property Law",
      desc: "Property transactions, leases, title documentation and real estate disputes."
    },
    {
      icon: <Gavel className="w-8 h-8" />,
      title: "Litigation",
      desc: "Strong representation in civil litigation, commercial disputes and court proceedings."
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Corporate Advisory",
      desc: "Business formation, contracts, compliance and general corporate support."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Law",
      desc: "Divorce, child custody, spousal support and other family matters."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Debt Recovery",
      desc: "Recovery of debts, negotiations and enforcement of judgments and agreements."
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Legal Consultation",
      desc: "Practical legal advice tailored to your unique situation and goals."
    }
  ];

  return (
    <section className="bg-surface-light py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24 flex flex-col xl:flex-row gap-16 xl:gap-24">
        
        {/* Left: About Me */}
        <div className="xl:w-5/12 flex flex-col">
          <p className="text-brand-dark font-bold tracking-widest text-xs uppercase mb-6">About Me</p>
          <h2 className="font-serif text-3xl sm:text-[2.25rem] md:text-5xl leading-[1.15] mb-8 text-brand-dark">
            Focused on Your Case.<br />
            Committed to Your<span className="text-brand-gold italic"> Success.</span>
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mb-12"></div>
          
          <div className="space-y-6 text-gray-700/80 leading-relaxed text-[15px] mb-12">
            <p>
              I am a dedicated legal practitioner with over 10 years of experience
              providing legal advisory, representation and dispute resolution
              services to individuals and businesses.
            </p>
            <p>
              My approach is client-focused, solution-driven and built on
              integrity, confidentiality and results.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 mt-auto">
            <button className="flex items-center justify-center gap-3 bg-brand-dark hover:bg-black text-white font-medium text-sm px-8 py-4 transition-colors w-full sm:w-auto rounded-sm">
              <span>Learn More About Me</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="font-serif italic text-4xl text-gray-800 opacity-80 pl-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lawyerName}
            </div>
          </div>
        </div>

        {/* Right: Legal Services Cards */}
        <div className="xl:w-7/12">
          <p className="text-brand-gold font-bold tracking-widest text-xs uppercase mb-4">Legal Services</p>
          <h2 className="font-serif text-3xl md:text-4xl leading-[1.2] mb-12 text-brand-dark">
            How I Can Help You
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white p-8 border border-gray-100/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 group rounded-sm">
                <div className="text-brand-gold mb-6 group-hover:scale-110 group-hover:text-brand-gold-hover transition-transform origin-left stroke-[1.5]">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-brand-dark">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function ExperienceAndTestimonial() {
  return (
    <section className="bg-[#0b141d] text-white py-24 border-t border-brand-darker">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24 w-full flex flex-col lg:flex-row gap-16 lg:gap-12 justify-between">
        
        {/* Left: Stats */}
        <div className="lg:w-7/12">
          <h2 className="font-serif text-3xl md:text-4xl leading-[1.2] mb-12">
            Proven Experience. Real Results.
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 md:gap-8 border-y border-white/10 py-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="text-brand-gold shrink-0">
                <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-2xl font-bold leading-tight">10+</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider">Years of Practice</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="text-brand-gold shrink-0">
                <Briefcase className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-2xl font-bold leading-tight">100+</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider">Matters Handled</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="text-brand-gold shrink-0">
                <Users className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium leading-snug">Clients Across<br/>Nigeria</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="text-brand-gold shrink-0">
                <Star className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium leading-snug">Commitment to<br/>Excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Testimonial */}
        <div className="lg:w-4/12 flex flex-col justify-center">
          <div className="flex gap-6 relative">
            <div className="text-brand-gold shrink-0 pt-1">
               <Quote className="w-10 h-10 fill-brand-gold stroke-none opacity-90" />
            </div>
            <div>
              <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-8 font-normal pr-4">
                {lawyerName} handled my case with professionalism and delivered an outcome beyond my expectations. I highly recommend their services.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-6 h-0.5 bg-brand-gold"></div>
                <div>
                  <p className="font-normal text-brand-gold text-sm tracking-wide">Emeka N.</p>
                  <p className="text-xs text-gray-500 mt-1">Business Owner, Anambra State</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function InsightsAndCTA({ onBookClick }: { onBookClick: () => void }) {
  const articles = [
    {
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      category: "Property Law",
      title: "5 Things to Check Before Buying a Property in Nigeria",
      date: "May 12, 2024",
      readTime: "5 min read"
    },
    {
      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
      category: "Business Law",
      title: "Why Every Business Needs a Written Contract",
      date: "Apr 28, 2024",
      readTime: "4 min read"
    },
    {
      img: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=800",
      category: "Litigation",
      title: "What to Do When You Receive a Court Summons",
      date: "Apr 10, 2024",
      readTime: "6 min read"
    }
  ];

  return (
    <section className="flex flex-col lg:flex-row w-full bg-white">
      {/* Left: Articles */}
      <div className="w-full lg:w-[65%] xl:w-2/3 py-24 px-6 md:px-12 xl:pl-24 xl:pr-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-brand-gold font-bold tracking-widest text-xs uppercase mb-4">Legal Insights</p>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark">Recent Articles</h2>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-dark hover:text-brand-gold transition-colors">
            View All Articles <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-[4/3] bg-gray-100 rounded-sm">
                <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              </div>
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-3">{article.category}</p>
              <h3 className="font-serif text-[1.1rem] font-bold leading-snug mb-4 group-hover:text-brand-gold transition-colors text-brand-dark">
                {article.title}
              </h3>
              <div className="flex items-center text-xs text-gray-500 font-medium tracking-wide">
                <span>{article.date}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 sm:hidden text-center">
             <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-dark hover:text-brand-gold transition-colors border border-gray-300 px-6 py-4 rounded-sm">
              View All Articles <ArrowRight className="w-4 h-4" />
            </a>
        </div>
      </div>

      {/* Right: CTA */}
      <div className="w-full lg:w-[35%] xl:w-1/3 bg-[#0d1620] py-24 px-6 md:px-12 xl:px-16 flex items-center relative overflow-hidden">
        {/* Faint background texture/text */}
        <div className="absolute right-[-10%] bottom-[-5%] text-[10rem] font-serif text-white/[0.02] leading-none pointer-events-none transform -rotate-90 origin-bottom-right drop-shadow-sm">
          LEGAL
        </div>

        <div className="relative z-10 w-full max-w-[400px] mx-auto lg:mx-0">
          <p className="text-brand-gold font-bold tracking-widest text-[10px] uppercase mb-5">Need Legal Advice?</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-[1.2] mb-6 shadow-sm">
            Schedule a Confidential Consultation Today.
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed text-[15px]">
            Discuss your case with me and get practical, straightforward legal guidance.
          </p>

          <div className="flex flex-col gap-4">
            <button onClick={onBookClick} className="flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-semibold px-6 py-4 transition-colors w-full rounded-sm">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Book a Consultation</span>
            </button>
            <a href="tel:+2348031234567" className="flex items-center justify-center gap-3 bg-transparent border border-white/20 hover:border-brand-gold text-brand-gold font-semibold px-6 py-4 transition-colors w-full rounded-sm">
              <Phone className="w-5 h-5" />
              <span className="text-sm">Call: 0803 123 4567</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 drop-shadow-2xl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg max-h-[90vh] flex flex-col rounded-sm shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute top-0 right-0 p-4 z-10 bg-white/80 backdrop-blur-sm rounded-bl-lg">
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-dark mb-2">Book a Consultation</h2>
          <p className="text-gray-500 text-sm mb-6">Fill out the form below and we will get back to you shortly to confirm your appointment.</p>
          
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-brand-dark mb-2">Request Received</h3>
              <p className="text-gray-600 text-sm">We've received your consultation request. A member of our team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors text-sm"
                  placeholder="Jane Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors text-sm"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors text-sm"
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div>
                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">How can we help you?</label>
                 <textarea 
                  id="message" 
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors text-sm resize-none"
                  placeholder="Briefly describe your legal needs..."
                 ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-dark hover:bg-brand-dark/90 text-white font-semibold py-3 px-6 rounded-sm transition-colors mt-2 text-sm disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Request Appointment <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Footer({ onLinkClick }: { onLinkClick: (e: React.MouseEvent, name: string) => void }) {
  return (
    <footer className="bg-brand-darker text-white py-16 lg:py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-brand-gold font-serif text-3xl font-medium tracking-tighter">{lawyerInitials}</div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold tracking-widest leading-none mb-1 text-gray-200">{lawyerNameUpper}</span>
                <span className="text-[0.60rem] tracking-[0.2em] text-gray-400 uppercase font-medium">Legal Practitioner</span>
              </div>
            </div>
            <p className="text-gray-400 text-[13px] leading-relaxed mb-6 pr-4">
              Providing practical legal solutions and strong representation. Your case deserves focused attention and strategic thinking.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark hover:border-transparent transition-all">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark hover:border-transparent transition-all">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark hover:border-transparent transition-all">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-6 text-white text-opacity-90">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Me', 'Practice Areas', 'Results', 'Articles', 'FAQ', 'Contact'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" onClick={(e) => onLinkClick(e, link)} className="text-[13px] text-gray-400 hover:text-brand-gold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-6 text-white text-opacity-90">Practice Areas</h4>
            <ul className="space-y-3">
              {['Property Law', 'Litigation', 'Corporate Advisory', 'Family Law', 'Debt Recovery', 'Legal Consultation'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" onClick={(e) => onLinkClick(e, link)} className="text-[13px] text-gray-400 hover:text-brand-gold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-6 text-white text-opacity-90">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-[13px] text-gray-400 leading-relaxed">No. 12 Ziks Avenue, Awka<br/>Anambra State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-[13px] text-gray-400">0803 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-[13px] text-gray-400">{lawyerEmail}</span>
              </li>
              <li className="flex items-center gap-3 mt-4">
                 <div className="w-4 h-4 shrink-0 text-brand-gold flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                 </div>
                 <span className="text-[13px] text-gray-400">Mon - Fri: 9:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-500 tracking-wide">
            &copy; 2024 {lawyerName}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-gray-500 tracking-wide">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}


