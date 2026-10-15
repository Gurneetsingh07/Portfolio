import React, { useState, useEffect, useCallback } from "react";
import profileImage from "./Assets/GurneetProfilePhoto.png";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Database,
  Server,
  Layout,
  Briefcase,
  GraduationCap,
  Copy,
  Check,
  Send,
  Menu,
  X,
  Cpu,
  ShieldCheck,
  Zap,
  Terminal,
  Clock,
  Volume2,
  VolumeX,
  FileText,
  Activity,
  Sparkles,
} from "lucide-react";

// Simulated API response data (defined statically outside component)
const API_ENDPOINTS = {
  profile: {
    status: 200,
    timeMs: 14,
    payload: {
      developer: "Gurneet Singh",
      title: "Full Stack & Backend Engineer",
      location: "New Delhi, India (IST)",
      status: "Open to Full-Time Engineering Roles",
      core_stack: [
        "Django",
        "Django REST Framework",
        "Python",
        "Node.js",
        "Express",
        "React.js",
        "MongoDB",
        "MySQL",
      ],
      passions: [
        "Clean REST contracts",
        "Database query optimization",
        "Defensive error handling",
      ],
    },
  },
  architecture_rules: {
    status: 200,
    timeMs: 21,
    payload: {
      methodology: "Schema-first defensive programming",
      rules: [
        "Validate all incoming payloads at controller / serializer boundaries",
        "Index columns with high cardinality and frequent filter/join access",
        "Never leak stack traces in production 500 responses",
        "Enforce atomic transactions for balance/seat/stock operations",
      ],
      db_optimizations: [
        "ORM select_related / prefetch_related",
        "Cursor pagination for large datasets",
      ],
    },
  },
  benchmarks: {
    status: 200,
    timeMs: 18,
    payload: {
      api_latency_p95: "< 65ms",
      auth_overhead: "< 4ms (JWT with RS256/HS256)",
      average_test_coverage: "88% endpoint validation",
      uptime_target: "99.9% fault-tolerant service",
    },
  },
  ping: {
    status: 200,
    timeMs: 11,
    payload: {
      message:
        "Handshake verified! Gurneet is ready to build something remarkable with you.",
      reach_out: "gurneetsingh1107@gmail.com",
      phone: "+91 9910086483",
    },
  },
};

export default function App() {
  const [copiedText, setCopiedText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [currentTime, setCurrentTime] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState({
    0: "overview",
    1: "overview",
  });
  const [selectedEndpoint, setSelectedEndpoint] = useState("profile");
  const [apiResponse, setApiResponse] = useState(API_ENDPOINTS.profile);
  const [apiLoading, setApiLoading] = useState(false);

  // Play subtle tactile mechanical click (Web Audio API synthesis)
  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(680, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Audio context restricted or unavailable
    }
  }, [soundEnabled]);

  const scrollTo = useCallback(
    (id) => {
      playClick();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
        setIsMenuOpen(false);
      }
    },
    [playClick],
  );

  // Indian Standard Time (New Delhi) live clock
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setCurrentTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener (1-5 to jump to sections, T to toggle sound)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "1") scrollTo("hero");
      if (e.key === "2") scrollTo("projects");
      if (e.key === "3") scrollTo("api-bench");
      if (e.key === "4") scrollTo("experience");
      if (e.key === "5") scrollTo("contact");
      if (e.key.toLowerCase() === "t") {
        setSoundEnabled((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollTo]);

  const copyToClipboard = (text, label) => {
    playClick();
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2400);
  };

  const triggerApiEndpoint = (key) => {
    playClick();
    setSelectedEndpoint(key);
    setApiLoading(true);
    setTimeout(() => {
      setApiResponse(API_ENDPOINTS[key]);
      setApiLoading(false);
    }, 220);
  };

  const projects = [
    {
      id: "bike-res",
      title: "Bike Reservation System",
      subtitle: "Full-Stack Reservation Engine with Role Isolation",
      status: "Production Ready",
      github: "https://github.com/Gurneetsingh07/bike-reservation-system",
      tech: [
        "React.js",
        "Redux Toolkit",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "JWT Auth",
        "Tailwind CSS",
      ],
      overview:
        "A full-stack reservation platform engineered with enterprise-grade authorization. Features date-conflict avoidance algorithms, granular role segregation (Admin Manager vs Registered User), and dynamic post-rental rating calculations.",
      architecture: [
        "Stateful JWT authentication with granular RBAC middleware preventing unauthorized role elevation.",
        "Reservation conflict engine querying overlapping date ranges to prevent concurrent double-booking of any single bike.",
        "Aggregated rating pipeline recalculating vehicle satisfaction metrics dynamically upon trip close.",
      ],
      challengesSolved: [
        "Eliminated race conditions during concurrent date slot queries with indexed booking interval validations.",
        "Created an intuitive Redux Toolkit state slice keeping bike availability synchronized between user and manager views.",
        "Structured modular Express routers with centralized async error-handling middleware.",
      ],
      specs: {
        auth: "Bearer JWT with Role Authorization",
        database:
          "MongoDB with compound indexes on [bikeId, startDate, endDate]",
        frontend: "React 19 + Redux Toolkit + Responsive Tailwind UI",
      },
    },
    {
      id: "event-seeker",
      title: "Event Seeker Platform",
      subtitle: "Real-Time Event Ticketing & Lifecycle Manager",
      status: "Production Ready",
      github: "https://github.com/Gurneetsingh07/Event-seeker",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Nodemailer",
        "JWT Auth",
        "REST APIs",
      ],
      overview:
        "An end-to-end event discovery and ticket management ecosystem with real-time seat inventory tracking, OTP email confirmation via Nodemailer, and automated restock routines when tickets are refunded.",
      architecture: [
        "Automated OTP generation and email dispatch pipeline ensuring confirmed buyer authentication prior to seat reservation.",
        "Dynamic ticket restock mechanism executing immediate ledger re-allocation on user cancellations.",
        "Role-isolated administrative console for managing event schedules, venue capacity, and real-time attendee telemetry.",
      ],
      challengesSolved: [
        "Prevented overselling during peak booking surges by enforcing atomic seat count decrement operations.",
        "Integrated robust SMTP retry policies with Nodemailer to maintain reliable OTP delivery.",
        "Architected an intuitive event discovery interface with instant client-side category and date filtering.",
      ],
      specs: {
        auth: "JWT + OTP Email Authentication",
        database: "MongoDB with transactional seat count constraints",
        frontend: "Modern React with responsive event analytics cards",
      },
    },
  ];

  const skillGroups = [
    {
      name: "Backend Architecture & APIs",
      icon: Server,
      accent: "text-amber-400 border-amber-500/20 bg-amber-500/10",
      description:
        "Building resilient server logic, clean REST contracts, and performant endpoints.",
      items: [
        {
          name: "Django & DRF",
          note: "ViewSets, Serializers, ORM optimization",
        },
        {
          name: "Node.js & Express",
          note: "Async pipelines, Middleware, REST APIs",
        },
        { name: "Python", note: "Object-oriented backend design, scripts" },
        {
          name: "RESTful API Standards",
          note: "Idempotency, HTTP status codes, error shapes",
        },
      ],
    },
    {
      name: "Databases & Query Optimization",
      icon: Database,
      accent: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      description:
        "Designing reliable schemas, data integrity constraints, and fast indexes.",
      items: [
        { name: "MySQL", note: "Relational modeling, indexing, foreign keys" },
        {
          name: "MongoDB & Mongoose",
          note: "Aggregation pipelines, schema validation",
        },
        {
          name: "ORM Tuning",
          note: "select_related, prefetch_related, query counting",
        },
        { name: "SQL", note: "Complex queries, joins, pagination strategies" },
      ],
    },
    {
      name: "Frontend & Interface Engineering",
      icon: Layout,
      accent: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
      description:
        "Crafting responsive, accessible user interfaces with deterministic state.",
      items: [
        {
          name: "React.js",
          note: "Hooks, component composition, custom utilities",
        },
        {
          name: "Redux Toolkit",
          note: "Predictable state slices, async thunks",
        },
        {
          name: "Tailwind CSS",
          note: "Design systems, responsive flex/grid layouts",
        },
        {
          name: "Modern JavaScript",
          note: "ES6+, async/await, closures, DOM APIs",
        },
      ],
    },
    {
      name: "Security, Auth & DevOps",
      icon: ShieldCheck,
      accent: "text-rose-400 border-rose-500/20 bg-rose-500/10",
      description:
        "Securing access boundaries and maintaining rigorous deployment pipelines.",
      items: [
        {
          name: "JWT & RBAC",
          note: "Role segregation, token lifecycle, claims",
        },
        {
          name: "Git & GitHub",
          note: "Trunk-based workflow, PR reviews, branches",
        },
        {
          name: "Postman",
          note: "API contract testing, environment variables",
        },
        {
          name: "Docker & Jira",
          note: "Container isolation, Agile sprint tracking",
        },
      ],
    },
  ];

  const engineeringPrinciples = [
    {
      number: "01",
      title: "No Silent Failures",
      desc: "An API should return explicit, typed error envelopes. Swallowing exceptions or returning generic 500s damages client trust.",
    },
    {
      number: "02",
      title: "Performance is a Schema Decision",
      desc: "An index chosen with intention and an optimized ORM query save far more engineering hours and infrastructure dollars than scaling servers.",
    },
    {
      number: "03",
      title: "Defensive at the Boundary",
      desc: "Never trust payload data from the browser. Validate types, sanitize inputs, and verify permissions at the controller or serializer layer.",
    },
    {
      number: "04",
      title: "Readable Code > Clever Hacks",
      desc: "Software is read and debugged far more times than it is written. Clean naming, structured layers, and predictable flow always win.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080b] text-[#e4e4e7] font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200 relative bg-dot-matrix">
      {/* Toast Notification */}
      {copiedText && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-obsidian-850 border border-amber-500/40 text-amber-300 shadow-2xl backdrop-blur-xl animate-fade-in text-sm font-mono">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Copied {copiedText} to clipboard</span>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full border-b border-subtle bg-[#07080b]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("hero");
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-obsidian-800 border border-subtle group-hover:border-amber-500/40 transition-colors flex items-center justify-center font-mono text-xs font-bold text-amber-400">
              GS
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-zinc-100 group-hover:text-amber-300 transition-colors">
                Gurneet Singh
              </span>
              <span className="font-mono text-[10px] text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for roles
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-400">
            {[
              { id: "hero", label: "Overview", keyHint: "1" },
              { id: "projects", label: "Projects", keyHint: "2" },
              { id: "api-bench", label: "API Sandbox", keyHint: "3" },
              { id: "experience", label: "Experience", keyHint: "4" },
              { id: "contact", label: "Contact", keyHint: "5" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors py-1 flex items-center gap-1.5 ${
                  activeSection === item.id
                    ? "text-amber-400 font-semibold"
                    : "hover:text-zinc-200"
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] text-zinc-400 px-1 py-0.2 rounded bg-obsidian-850 border border-subtle">
                  {item.keyHint}
                </span>
              </button>
            ))}
          </nav>

          {/* Utility Tools: Sound toggle & GitHub */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playClick();
              }}
              title={
                soundEnabled
                  ? "Mute tactile audio"
                  : "Enable tactile mechanical feedback (T)"
              }
              className={`p-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
                soundEnabled
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                  : "border-subtle hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="hidden lg:inline font-mono text-[11px]">
                {soundEnabled ? "Audio On" : "Audio Off"}
              </span>
            </button>

            <a
              href="https://github.com/Gurneetsingh07"
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="px-3 py-1.5 rounded-lg border border-subtle hover:border-zinc-600 bg-obsidian-850 hover:bg-obsidian-800 text-zinc-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>GitHub</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => {
                playClick();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden border-b border-subtle bg-obsidian-900 px-6 py-4 flex flex-col gap-3 font-mono text-xs">
            {[
              { id: "hero", label: "1. Overview" },
              { id: "projects", label: "2. Projects & Architecture" },
              { id: "api-bench", label: "3. Interactive API Sandbox" },
              { id: "experience", label: "4. Experience Log" },
              { id: "skills", label: "5. Technical Toolkit" },
              { id: "contact", label: "6. Direct Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left py-1.5 text-zinc-300 hover:text-amber-400"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-24 space-y-28">
        {/* HERO SECTION — Thoughtful, Human, Grounded */}
        <section id="hero" className="pt-6 sm:pt-10 space-y-10">
          {/* Top telemetry pill: Location, Time & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pb-2 border-b border-subtle">
            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Tilak Nagar, New Delhi (28.6369° N, 77.0945° E)</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>IST {currentTime || "Live Clock"}</span>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Open to work
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-amber-400/90 font-medium flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" /> Full Stack &amp; Backend
                  Engineer
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-[1.15]">
                  Crafting resilient backends{" "}
                  <span className="font-serif italic font-normal text-amber-300">
                    &amp;
                  </span>{" "}
                  interfaces that feel human.
                </h1>
              </div>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                I'm{" "}
                <strong className="font-semibold text-white">
                  Gurneet Singh
                </strong>
                . I build production web applications with{" "}
                <span className="text-amber-300 font-mono text-sm">
                  Django REST Framework
                </span>
                ,{" "}
                <span className="text-emerald-300 font-mono text-sm">
                  Node.js/Express
                </span>
                , and{" "}
                <span className="text-cyan-300 font-mono text-sm">React</span>.
                My daily obsession is clean schema modeling, fast SQL queries,
                bulletproof authentication, and writing APIs that never leave
                frontend engineers guessing.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => scrollTo("projects")}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-amber-500/10 active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" /> Explore Case Studies
                </button>
                <button
                  onClick={() => scrollTo("api-bench")}
                  className="px-5 py-2.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-zinc-200 border border-subtle hover:border-zinc-700 font-mono text-xs transition-all flex items-center gap-2 active:scale-95"
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-400" /> Run API
                  Sandbox
                </button>
                <button
                  onClick={() =>
                    copyToClipboard("gurneetsingh1107@gmail.com", "Email")
                  }
                  className="px-4 py-2.5 rounded-lg bg-transparent hover:bg-obsidian-850 text-zinc-400 hover:text-zinc-200 border border-subtle text-xs transition-all flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Email
                </button>
              </div>

              {/* Live "Now" Dispatch Widget */}
              <div className="p-4 rounded-xl bg-obsidian-850/80 border border-subtle space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-400 border-b border-subtle pb-2">
                  <span className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Current
                    Radar &amp; Focus
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Updated October 2026
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-zinc-300">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase">
                      Recent Role
                    </span>
                    <span className="text-amber-300 font-medium">
                      Backend Intern @ RenewBuy
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase">
                      Current Deep Dive
                    </span>
                    <span>DRF query optimization &amp; indexing</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase">
                      Fuel &amp; Setup
                    </span>
                    <span>Masala Chai • Mechanical Keyboard</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Profile Frame */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
              <div className="relative w-64 sm:w-72 rounded-2xl bg-obsidian-850 border border-subtle p-3 space-y-3 shadow-2xl">
                {/* Photo frame with fine details */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-obsidian-950 border border-subtle">
                  <img
                    src={profileImage}
                    alt="Gurneet Singh"
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080b]/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-zinc-300">
                    <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10 backdrop-blur-md">
                      Backend &amp; Full Stack
                    </span>
                    <span className="text-amber-300 font-medium">
                      Gurneet S.
                    </span>
                  </div>
                </div>

                {/* Quick contact drawer pills */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    onClick={() =>
                      copyToClipboard("gurneetsingh1107@gmail.com", "Email")
                    }
                    className="p-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 border border-subtle flex items-center justify-between text-zinc-300 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-amber-400" /> Email
                    </span>
                    <Copy className="w-2.5 h-2.5 text-zinc-400" />
                  </button>
                  <button
                    onClick={() => copyToClipboard("9910086483", "Phone")}
                    className="p-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 border border-subtle flex items-center justify-between text-zinc-300 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-emerald-400" /> Phone
                    </span>
                    <Copy className="w-2.5 h-2.5 text-zinc-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: DEEP DIVE PROJECTS (HUMAN CASE STUDIES) */}
        <section id="projects" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-subtle pb-4">
            <div className="space-y-1">
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> Engineering Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                Architected Projects &amp; Case Studies
              </h2>
            </div>
            <a
              href="https://github.com/Gurneetsingh07?tab=repositories"
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="text-xs font-mono text-zinc-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <span>Explore all GitHub repos</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {projects.map((proj, idx) => {
              const currentTab = activeProjectTab[idx] || "overview";
              return (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-obsidian-850/60 border border-subtle hover:border-zinc-700 transition-all p-6 sm:p-8 space-y-6"
                >
                  {/* Top Bar of Project Card */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
                          {proj.title}
                        </h3>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {proj.status}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 font-mono">
                        {proj.subtitle}
                      </p>
                    </div>

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playClick}
                      className="px-3.5 py-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 border border-subtle text-xs font-mono text-zinc-200 hover:text-amber-300 flex items-center gap-2 transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Source Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Interactive Sub-tabs */}
                  <div className="flex flex-wrap items-center gap-2 border-b border-subtle pb-2">
                    {[
                      { key: "overview", label: "Overview & Purpose" },
                      { key: "architecture", label: "Architecture Decisions" },
                      { key: "challenges", label: "Hard Challenges Solved" },
                      { key: "specs", label: "Technical Specs" },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          playClick();
                          setActiveProjectTab((prev) => ({
                            ...prev,
                            [idx]: tab.key,
                          }));
                        }}
                        className={`text-xs px-3 py-1.5 rounded-md font-mono transition-colors ${
                          currentTab === tab.key
                            ? "bg-amber-400 text-black font-semibold"
                            : "bg-obsidian-800/80 text-zinc-400 hover:text-zinc-200 border border-subtle"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Body Content */}
                  <div className="min-h-[110px] text-zinc-300 text-sm leading-relaxed">
                    {currentTab === "overview" && (
                      <div className="space-y-4">
                        <p>{proj.overview}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {proj.tech.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-xs px-2.5 py-1 rounded bg-obsidian-800 border border-subtle text-zinc-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentTab === "architecture" && (
                      <ul className="space-y-2.5 font-mono text-xs sm:text-sm">
                        {proj.architecture.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-amber-400 mt-1">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {currentTab === "challenges" && (
                      <ul className="space-y-2.5 font-mono text-xs sm:text-sm">
                        {proj.challengesSolved.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {currentTab === "specs" && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                        <div className="p-3 rounded-lg bg-obsidian-900 border border-subtle space-y-1">
                          <span className="text-zinc-400 uppercase text-[10px]">
                            Auth Strategy
                          </span>
                          <p className="text-zinc-200">{proj.specs.auth}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-obsidian-900 border border-subtle space-y-1">
                          <span className="text-zinc-400 uppercase text-[10px]">
                            Database Constraints
                          </span>
                          <p className="text-zinc-200">{proj.specs.database}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-obsidian-900 border border-subtle space-y-1">
                          <span className="text-zinc-400 uppercase text-[10px]">
                            Frontend Topology
                          </span>
                          <p className="text-zinc-200">{proj.specs.frontend}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE API TEST BENCH (REAL HUMAN CRAFT) */}
        <section id="api-bench" className="space-y-6 scroll-mt-20">
          <div className="space-y-1 border-b border-subtle pb-4">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Interactive Test Bench
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Simulated Backend API Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              A real backend engineer provides inspectable endpoints. Click
              below to test live simulated requests to Gurneet's API server.
            </p>
          </div>

          <div className="rounded-2xl bg-obsidian-900 border border-subtle overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="px-5 py-3 bg-obsidian-950 border-b border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-zinc-400">
                  api.gurneetsingh.dev (REST v1.2)
                </span>
              </div>
              <div className="font-mono text-[11px] text-zinc-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                HTTPS 200 OK
              </div>
            </div>

            {/* Endpoint Selector Tabs */}
            <div className="p-4 bg-obsidian-850/80 border-b border-subtle flex flex-wrap items-center gap-2">
              {[
                { key: "profile", method: "GET", path: "/api/v1/engineer" },
                {
                  key: "architecture_rules",
                  method: "GET",
                  path: "/api/v1/architecture-rules",
                },
                {
                  key: "benchmarks",
                  method: "GET",
                  path: "/api/v1/stack/benchmarks",
                },
                { key: "ping", method: "POST", path: "/api/v1/handshake" },
              ].map((ep) => (
                <button
                  key={ep.key}
                  onClick={() => triggerApiEndpoint(ep.key)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-all ${
                    selectedEndpoint === ep.key
                      ? "bg-amber-400 text-black font-semibold shadow"
                      : "bg-obsidian-800 text-zinc-300 hover:text-white border border-subtle"
                  }`}
                >
                  <span
                    className={`font-bold text-[10px] px-1 rounded ${
                      ep.method === "GET"
                        ? selectedEndpoint === ep.key
                          ? "bg-black/20 text-black"
                          : "text-emerald-400 bg-emerald-500/10"
                        : selectedEndpoint === ep.key
                          ? "bg-black/20 text-black"
                          : "text-amber-400 bg-amber-500/10"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span>{ep.path}</span>
                </button>
              ))}
            </div>

            {/* Response Console Display */}
            <div className="p-5 font-mono text-xs space-y-3 bg-[#08090d]">
              <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-semibold">
                    STATUS: 200 OK
                  </span>
                  <span>TIME: {apiResponse?.timeMs || 15}ms</span>
                  <span className="hidden sm:inline">
                    TYPE: application/json
                  </span>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify(apiResponse?.payload, null, 2),
                      "API Response",
                    )
                  }
                  className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3 h-3" /> Copy JSON
                </button>
              </div>

              {apiLoading ? (
                <div className="py-8 flex items-center justify-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Executing query pipeline...</span>
                </div>
              ) : (
                <pre className="text-emerald-300 overflow-x-auto p-4 rounded-lg bg-black/60 border border-white/5 leading-relaxed">
                  {JSON.stringify(apiResponse?.payload, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: PROFESSIONAL EXPERIENCE (RENEWBUY LOG) */}
        <section id="experience" className="space-y-8 scroll-mt-20">
          <div className="space-y-1 border-b border-subtle pb-4">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Professional Log
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Work Experience &amp; Engineering Contributions
            </h2>
          </div>

          <div className="rounded-2xl bg-obsidian-850/60 border border-subtle p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-zinc-100">
                    Backend Intern
                  </h3>
                  <span className="text-zinc-400">@</span>
                  <span className="text-amber-400 font-semibold text-lg">
                    RenewBuy
                  </span>
                </div>
                <p className="font-mono text-xs text-zinc-400">
                  Production Django REST Framework &amp; MySQL Engineering
                </p>
              </div>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-obsidian-800 border border-subtle text-zinc-300">
                Nov 2025 – Feb 2026
              </span>
            </div>

            {/* Bullet points with engineering specificity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              <div className="p-4 rounded-xl bg-obsidian-900/60 border border-subtle space-y-2">
                <div className="font-semibold text-zinc-200 flex items-center gap-2 font-mono text-xs text-amber-300">
                  <span>01</span> RESTful API Development
                </div>
                <p>
                  Engineered and maintained structured RESTful APIs using Django
                  and Django REST Framework, architecting reusable serializers,
                  models, class-based views, and ViewSets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900/60 border border-subtle space-y-2">
                <div className="font-semibold text-zinc-200 flex items-center gap-2 font-mono text-xs text-emerald-300">
                  <span>02</span> ORM &amp; Database Tuning
                </div>
                <p>
                  Optimized ORM queries, pagination, filtering, and ordering
                  logic, significantly reducing unnecessary database hits and
                  streamlining JSON response payloads.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900/60 border border-subtle space-y-2">
                <div className="font-semibold text-zinc-200 flex items-center gap-2 font-mono text-xs text-cyan-300">
                  <span>03</span> Security &amp; Validation
                </div>
                <p>
                  Implemented robust authentication and authorization checks,
                  input validation guards, and centralized exception handling
                  conforming to strict REST conventions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900/60 border border-subtle space-y-2">
                <div className="font-semibold text-zinc-200 flex items-center gap-2 font-mono text-xs text-rose-300">
                  <span>04</span> Agile Collaboration &amp; Tooling
                </div>
                <p>
                  Collaborated within an Agile engineering team using Git,
                  GitHub, Postman for endpoint validation, and Jira for sprint
                  tracking and defect triage.
                </p>
              </div>
            </div>

            {/* Tech badges used at RenewBuy */}
            <div className="pt-2 flex flex-wrap gap-2">
              {[
                "Django",
                "Django REST Framework",
                "Python",
                "MySQL",
                "REST APIs",
                "Postman",
                "Git",
                "GitHub",
                "Jira",
                "Agile Sprints",
              ].map((badge) => (
                <span
                  key={badge}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-obsidian-800 text-zinc-300 border border-subtle"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: HOW I THINK ABOUT SOFTWARE (HUMAN OPINIONS) */}
        <section className="space-y-8">
          <div className="space-y-1 border-b border-subtle pb-4">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Core Values
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Engineering Principles
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Real beliefs that guide how I architect systems, debug edge cases,
              and write code.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {engineeringPrinciples.map((principle) => (
              <div
                key={principle.number}
                className="p-6 rounded-xl bg-obsidian-850/50 border border-subtle hover:border-zinc-700 transition-all space-y-2"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-amber-400 font-bold">
                    {principle.number}
                  </span>
                  <span className="text-zinc-600">PRINCIPLE</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-100">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: TECHNICAL TOOLKIT */}
        <section id="skills" className="space-y-8 scroll-mt-20">
          <div className="space-y-1 border-b border-subtle pb-4">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Toolkit
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Technical Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Technologies tested in real codebases, production APIs, and
              full-stack projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((group) => {
              const IconComp = group.icon;
              return (
                <div
                  key={group.name}
                  className="p-6 rounded-2xl bg-obsidian-850/60 border border-subtle space-y-4 hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${group.accent}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-zinc-100">
                        {group.name}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-2.5 rounded-lg bg-obsidian-900 border border-subtle flex flex-col justify-between"
                      >
                        <span className="text-xs font-semibold text-zinc-200">
                          {item.name}
                        </span>
                        <span className="font-mono text-[11px] text-zinc-400">
                          {item.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7: EDUCATION & FOUNDATIONS */}
        <section id="education" className="space-y-8 scroll-mt-20">
          <div className="space-y-1 border-b border-subtle pb-4">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Foundations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Academic Background
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
            {/* MCA */}
            <div className="p-6 rounded-xl bg-obsidian-850/60 border border-subtle space-y-3">
              <div className="flex justify-between items-center text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-500/20">
                  2025 – Present
                </span>
                <span>Distance Learning</span>
              </div>
              <h3 className="text-base font-bold text-zinc-100 font-sans">
                Master of Computer Applications (MCA)
              </h3>
              <p className="text-zinc-400">
                Indira Gandhi National Open University (IGNOU)
              </p>
            </div>

            {/* BCA */}
            <div className="p-6 rounded-xl bg-obsidian-850/60 border border-subtle space-y-3">
              <div className="flex justify-between items-center text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  2021 – 2024
                </span>
                <span>Graduated</span>
              </div>
              <h3 className="text-base font-bold text-zinc-100 font-sans">
                Bachelor of Computer Applications (BCA)
              </h3>
              <p className="text-zinc-400">
                Shri Guru Tegh Bahadur Institute of Management &amp; IT
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8: CONTACT & DIRECT REACHOUT */}
        <section id="contact" className="space-y-8 scroll-mt-20">
          <div className="rounded-2xl bg-obsidian-850 border border-subtle p-7 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-2 max-w-xl">
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> Direct Line
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100">
                Let's Build Something Exceptional
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Whether you have an open engineering role, a challenging backend
                problem, or simply want to talk Django, Node.js, and database
                indexing — my inbox is open.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Quick Communication Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div
                  onClick={() =>
                    copyToClipboard("gurneetsingh1107@gmail.com", "Email")
                  }
                  className="p-4 rounded-xl bg-obsidian-900 border border-subtle hover:border-amber-500/40 transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex items-center justify-between text-zinc-400">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <Copy className="w-3 h-3 group-hover:text-amber-300 transition-colors" />
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase">
                    Email Address
                  </div>
                  <div className="text-zinc-200 font-sans text-xs font-medium truncate">
                    gurneetsingh1107@gmail.com
                  </div>
                </div>

                <div
                  onClick={() => copyToClipboard("9910086483", "Phone")}
                  className="p-4 rounded-xl bg-obsidian-900 border border-subtle hover:border-emerald-500/40 transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex items-center justify-between text-zinc-400">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <Copy className="w-3 h-3 group-hover:text-emerald-300 transition-colors" />
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase">
                    Phone / WhatsApp
                  </div>
                  <div className="text-zinc-200 font-sans text-xs font-medium">
                    +91 9910086483
                  </div>
                </div>

                <a
                  href="https://github.com/Gurneetsingh07"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="p-4 rounded-xl bg-obsidian-900 border border-subtle hover:border-zinc-500 transition-all group space-y-2"
                >
                  <div className="flex items-center justify-between text-zinc-400">
                    <Code2 className="w-4 h-4 text-zinc-300" />
                    <ExternalLink className="w-3 h-3 group-hover:text-zinc-200" />
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase">
                    GitHub Profile
                  </div>
                  <div className="text-zinc-200 font-sans text-xs font-medium">
                    @Gurneetsingh07
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/gurneet-singh-b56861349"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="p-4 rounded-xl bg-obsidian-900 border border-subtle hover:border-blue-500/40 transition-all group space-y-2"
                >
                  <div className="flex items-center justify-between text-zinc-400">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    <ExternalLink className="w-3 h-3 group-hover:text-blue-300" />
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase">
                    LinkedIn
                  </div>
                  <div className="text-zinc-200 font-sans text-xs font-medium">
                    gurneet-singh-b56861349
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-subtle py-8 text-xs font-mono text-zinc-400 bg-obsidian-950">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            © {new Date().getFullYear()} Gurneet Singh — Designed with intention
            &amp; code.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">New Delhi, India</span>
            <span>•</span>
            <a
              href="mailto:gurneetsingh1107@gmail.com"
              className="text-amber-400 hover:underline"
            >
              gurneetsingh1107@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
