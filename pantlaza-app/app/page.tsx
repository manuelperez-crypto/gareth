'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {
  ArrowRight, Calendar, MessageSquare, Zap, Globe, Bot,
  RefreshCw, Wrench, Settings, Bell, Mail, Clock,
  ClipboardList, ShoppingCart, Megaphone, Smartphone,
  Search, Users, Sparkles, Check, Star, Phone, MapPin,
} from 'lucide-react';
import {
  ContainerScroll, ContainerSticky, ContainerAnimated,
  ContainerInset, HeroButton,
} from '@/components/ui/animated-video-on-scroll';
import { PantitoRobot } from '@/components/ui/pantito-robot';
import { FloatingPaths } from '@/components/ui/background-paths';
import { ResponseStream } from '@/components/ui/response-stream';
import { StreamOnView } from '@/components/ui/stream-on-view';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';

const SplineScene = dynamic(
  () => import('@/components/ui/splite').then((m) => ({ default: m.SplineScene })),
  { ssr: false }
);
const RobotHero = dynamic(
  () => import('@/components/ui/robot-hero').then((m) => ({ default: m.RobotHero })),
  { ssr: false }
);

// ── Logos ──────────────────────────────────────────────────────────────────
const NavLogo = () => (
  <svg viewBox="0 0 340 106" width="140" height="44" aria-label="Pantlaza">
    <polygon points="28,82 58,28 88,82" fill="#1d4ed8" opacity=".55" />
    <polygon points="60,82 88,36 116,82" fill="#1d4ed8" opacity=".55" />
    <polygon points="10,82 70,8 130,82" fill="#0f2c5e" />
    <polygon points="56,34 70,8 84,34" fill="#f59e0b" />
    <line x1="10" y1="82" x2="130" y2="82" stroke="#0f2c5e" strokeWidth="2.5" strokeLinecap="round" />
    <text x="150" y="67" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="42" fontWeight="800" letterSpacing="-.8">
      <tspan fill="#0f2c5e">Pant</tspan><tspan fill="#f59e0b">laza</tspan>
    </text>
  </svg>
);
const FooterLogo = () => (
  <svg viewBox="0 0 140 106" width="96" height="72" aria-label="Pantlaza">
    <polygon points="28,82 58,28 88,82" fill="#93c5fd" opacity=".6" />
    <polygon points="60,82 88,36 116,82" fill="#93c5fd" opacity=".6" />
    <polygon points="10,82 70,8 130,82" fill="#fff" />
    <polygon points="56,34 70,8 84,34" fill="#f59e0b" />
    <line x1="10" y1="82" x2="130" y2="82" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    <text x="70" y="100" textAnchor="middle" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="13" fontWeight="800" letterSpacing="-.3">
      <tspan fill="#fff">Pant</tspan><tspan fill="#f59e0b">laza</tspan>
    </text>
  </svg>
);

// ── Scroll reveal (IntersectionObserver + double-rAF) ──────────────────────
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            io.unobserve(el);
            requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
          }
        });
      },
      { threshold: 0.07 }
    );
    document.querySelectorAll('.anim').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Pointer glow (spotlight-card GlowCard technique) ────────────────────────
// Only the card under (or right next to) the cursor lights up; coords are
// refreshed on scroll so no card keeps a stale light.
function usePointerGlow() {
  useEffect(() => {
    if (!window.matchMedia('(hover:hover)').matches) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.glow'));
    let px = -1e4, py = -1e4, queued = false;
    const update = () => {
      queued = false;
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        const inside = px >= r.left && px <= r.right && py >= r.top && py <= r.bottom;
        if (px < -9000 || !inside) {
          card.style.setProperty('--cx', '-9999');
          card.style.setProperty('--cy', '-9999');
        } else {
          card.style.setProperty('--cx', (px - r.left).toFixed(1));
          card.style.setProperty('--cy', (py - r.top).toFixed(1));
        }
      }
    };
    const queue = () => {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      document.documentElement.style.setProperty('--mxp', (e.clientX / window.innerWidth).toFixed(3));
      queue();
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', queue, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', queue);
    };
  }, []);
}

// ── Data ───────────────────────────────────────────────────────────────────
const stats = [
  { value: '+50', label: 'Sites delivered' },
  { value: '1–5', label: 'Days to deliver' },
  { value: '100%', label: 'Mobile optimized' },
  { value: '5.0 ★', label: 'Average rating' },
];

const services = [
  {
    icon: Globe, tag: '',
    title: 'Website Creation',
    desc: 'For businesses with no online presence. We take you from zero to a professional site ready to attract customers.',
    items: ['Custom design for your brand', 'Optimized for Google (basic SEO)', 'Integrated contact form', '100% mobile responsive', 'Google Maps + social media'],
    featured: false,
  },
  {
    icon: RefreshCw, tag: 'Most popular',
    title: 'Redesign & Update',
    desc: 'Your site exists but looks outdated or isn\'t generating results. We modernize it to turn visitors into customers.',
    items: ['Fresh, modern, fast design', 'Improved page load speed', 'Mobile optimization', 'Content update', 'Google Analytics integration'],
    featured: true,
  },
  {
    icon: Wrench, tag: '',
    title: 'Website Maintenance',
    desc: 'Keep your site secure, up to date, and running smoothly month after month — no technical headaches for you.',
    items: ['Monthly content updates', 'Automatic backups', '24/7 uptime monitoring', 'Support via WhatsApp or email', 'Monthly traffic reports'],
    featured: false,
  },
  {
    icon: Bot, tag: 'New',
    title: 'AI Chat on Your Website',
    desc: 'A smart chat widget lives on your site and answers visitor questions 24/7 — even when you\'re closed.',
    items: ['Responds to common questions instantly', 'Captures name, phone & email', 'Sends you the lead via WhatsApp', 'Works in English and Spanish', 'Active 24 hours, 7 days a week'],
    featured: true,
  },
  {
    icon: Calendar, tag: '',
    title: 'Online Booking & Calendar Sync',
    desc: 'Let clients book appointments directly from your website. Every booking auto-syncs to Google Calendar.',
    items: ['Booking form on your website', 'Auto-adds to Google Calendar', 'Confirmation email to the client', 'Reminder 24h before appointment', 'You get a WhatsApp alert instantly'],
    featured: false,
  },
  {
    icon: Settings, tag: '',
    title: 'Business Automations',
    desc: 'Connect your website to the tools you already use. We automate repetitive tasks so you can focus on what matters.',
    items: ['Auto-reply emails on contact', 'Form fills → saved to spreadsheet', 'New order → WhatsApp notification', 'Client follow-up reminders', 'Social media auto-posting'],
    featured: false,
  },
];

const automations = [
  { icon: Calendar, title: 'Client books appointment', arrow: 'added to your Google Calendar', desc: 'No back-and-forth calls. The booking appears in your calendar the moment it\'s made.' },
  { icon: Bell,     title: 'New booking',              arrow: 'WhatsApp alert to you',         desc: 'Get notified instantly on your phone every time a client schedules something.' },
  { icon: Mail,     title: 'Client books',             arrow: 'confirmation email sent to them',desc: 'Professional automatic confirmation so your clients feel taken care of immediately.' },
  { icon: Clock,    title: '24h before appointment',   arrow: 'reminder to client',             desc: 'Reduce no-shows automatically. Clients get a reminder by email or text the day before.' },
  { icon: MessageSquare, title: 'Visitor asks a question', arrow: 'AI chat responds instantly', desc: 'Your chat answers questions at 2am without you lifting a finger.' },
  { icon: ClipboardList, title: 'Contact form filled', arrow: 'saved to your spreadsheet',     desc: 'Every lead goes straight into Google Sheets or your CRM. Never lose a contact again.' },
  { icon: ShoppingCart, title: 'New order placed',     arrow: 'invoice sent automatically',    desc: 'Clients receive a professional invoice the moment they order — zero manual work.' },
  { icon: Megaphone,  title: 'New content published',  arrow: 'posted to social media',        desc: 'Add a blog post or promotion and it goes out on Instagram or Facebook automatically.' },
];

const whyProps = [
  { icon: Zap,        title: 'Delivered in 1–5 days',              desc: 'No waiting weeks. Your site live and running in days, including any revisions.' },
  { icon: Smartphone, title: 'Mobile-first',                        desc: '70%+ of searches happen on phones. Your site looks perfect on every device.' },
  { icon: Search,     title: 'Visible on Google',                   desc: 'Every site includes basic SEO so you show up in local searches.' },
  { icon: Users,      title: 'Support included',                    desc: 'We don\'t disappear after delivery. Direct support via WhatsApp.' },
];

const testimonials = [
  {
    initials: 'MC', name: 'Maria C.', biz: 'Cedar Lane Flower Shoppe · Teaneck, NJ',
    quote: '"We had no website and customers couldn\'t find us on Google. Pantlaza built one in 10 days and now we get new calls every week."',
  },
  {
    initials: 'RJ', name: 'Robert J.', biz: 'Restaurant · Fort Lee, NJ',
    quote: '"Our old site was from 2015 and looked terrible on mobile. The redesign they did converted more visitors into customers. Worth every penny."',
  },
];

const steps = [
  { n: '1', title: 'Tell us about your business',   desc: 'Quick 15-minute chat — no pressure. We learn what your business does and what you\'d want on a website.' },
  { n: '2', title: 'We build your free example',    desc: 'We design a real website example for your business and send it to you — completely free, no strings attached.' },
  { n: '3', title: 'You decide',                    desc: 'Love it? We finalize it with any changes in 1–5 days. Not feeling it? No charge, no problem — you owe us nothing.' },
  { n: '4', title: 'Launch & support',              desc: 'We go live, walk you through everything, and stay available via WhatsApp for any adjustments.' },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  usePointerGlow();
  const [heroLine2, setHeroLine2] = useState(false);

  return (
    <>
      {/* ━━ NAV ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 bg-white/90 backdrop-blur-md border-b border-[#e2e8f0]">
        <NavLogo />
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#64748b]">
          <a href="#services"    className="hover:text-[#0f2c5e] transition-colors">Services</a>
          <a href="#automations" className="hover:text-[#0f2c5e] transition-colors">Automations</a>
          <a href="#process"     className="hover:text-[#0f2c5e] transition-colors">How We Work</a>
          <a href="#contact"     className="hover:text-[#0f2c5e] transition-colors">Contact</a>
        </div>
        <a href="#contact" className="flex items-center gap-2 bg-[#0f2c5e] hover:bg-[#1d4ed8] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors">
          Talk to us <ArrowRight size={15} />
        </a>
      </nav>

      {/* ━━ HERO — CUTE ROBOT (Robot Hero, 21st.dev) ━━━━━━━━━━━━━━━━━━━━━━ */}
      <RobotHero backgroundText="PANTLAZA" showNavbar={false}>
        <div className="pointer-events-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#bfdbfe] rounded-full px-4 py-1.5 text-xs font-semibold text-[#1d4ed8] mb-5">
            <Zap size={13} /> Websites · Automations · Smart Tools · New Jersey
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#0f2c5e] leading-[1.1] tracking-tight">
            <ResponseStream
              as="span" mode="fade" fadeDuration={700} segmentDelay={55}
              textStream={'Your business on autopilot — '}
              onComplete={() => setHeroLine2(true)}
            />
            {heroLine2 ? (
              <ResponseStream
                as="em" className="not-italic text-[#f59e0b]" mode="fade"
                fadeDuration={700} segmentDelay={55}
                textStream="websites that work while you sleep"
              />
            ) : (
              <em className="not-italic text-[#f59e0b] opacity-0" aria-hidden="true">
                websites that work while you sleep
              </em>
            )}
          </h1>
          <ResponseStream
            as="p" className="text-[#334155] mt-4 mb-7 max-w-[52ch] leading-relaxed"
            mode="fade" fadeDuration={600} segmentDelay={22}
            textStream="At Pantlaza we build professional websites and connect them with powerful automations: online booking, AI chat, calendar sync, instant notifications, and more."
          />
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 bg-[#0f2c5e] hover:bg-[#1d4ed8] text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(29,78,216,0.3)]">
              Get a free consultation <ArrowRight size={16} />
            </a>
            <a href="#services" className="inline-flex items-center gap-2 bg-white/85 backdrop-blur-sm text-[#0f2c5e] font-bold px-7 py-3.5 rounded-xl border-2 border-white transition-all hover:-translate-y-0.5 hover:border-[#0f2c5e]">
              View services
            </a>
          </div>
        </div>
      </RobotHero>

      {/* ━━ STATS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#0f2c5e] py-14 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className="anim text-center" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-4xl md:text-5xl font-extrabold text-[#f59e0b] tabular-nums">{s.value}</div>
              <div className="text-sm text-white/65 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━ PANTITO — SPLINE 3D CARD ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#02091a] px-5 py-6">
        <div className="max-w-[1520px] mx-auto anim">
          <Card className="glow [--gradius:24] w-full h-[88vh] min-h-[560px] max-h-[920px] bg-black/[0.96] relative overflow-hidden border-white/10 rounded-3xl">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            <div className="flex h-full flex-col md:flex-row">
              <div className="flex-1 p-8 md:p-14 relative z-10 flex flex-col justify-center">
                <span className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Sparkles size={12} /> AI Assistant · 24/7
                </span>
                <StreamOnView
                  as="h2" segmentDelay={80} fadeDuration={800}
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-[1.05]"
                  text="Memo, your sales robot"
                />
                <StreamOnView
                  as="p" segmentDelay={24} fadeDuration={650}
                  className="mt-6 text-neutral-400 max-w-[40ch] leading-relaxed text-base md:text-lg"
                  text="Captures leads, answers questions and books appointments in real time — 24 hours a day, 7 days a week, without you lifting a finger."
                />
                <a href="#contact" className="mt-8 inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f2c5e] font-bold text-sm px-6 py-3 rounded-full w-fit transition-colors">
                  Activate Memo <ArrowRight size={15} />
                </a>
              </div>
              <div className="flex-1 relative min-h-[220px]">
                <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ━━ PANTITO — ANIMATED SCROLL REVEAL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#02091a]">
        <ContainerScroll className="h-[350vh]">
          <ContainerSticky
            className="flex items-center justify-center px-6 py-10 text-slate-50"
            style={{ background: 'radial-gradient(55% 55% at 50% 25%, #1d4ed8 0%, #0f2c5e 35%, #02091a 80%)' }}
          >
            <ContainerAnimated className="absolute top-[10vh] left-0 right-0 text-center space-y-4 px-6 z-10">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#f59e0b]">
                <Sparkles size={12} /> Artificial Intelligence
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Meet <span className="text-[#f59e0b]">Memo</span>
              </h2>
              <p className="mx-auto max-w-[42ch] text-white/70 text-lg">
                Your new AI employee — available 24/7, never gets tired and always responds to your customers.
              </p>
            </ContainerAnimated>

            <ContainerInset
              className="flex items-center justify-center w-full"
              style={{ height: 'min(70vh, 560px)' }}
              insetYRange={[30, 0]} insetXRange={[20, 0]} roundednessRange={[900, 32]}
            >
              <div className="flex items-center justify-center w-full h-full bg-[#0b1a3d] relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border border-[#1d4ed8]/20 animate-[ping_3s_ease-in-out_infinite]" />
                  <div className="absolute w-48 h-48 rounded-full border border-[#f59e0b]/15 animate-[ping_4s_ease-in-out_infinite_0.5s]" />
                </div>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #93c5fd 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <PantitoRobot className="relative z-10 h-[min(52vh,420px)] w-auto drop-shadow-[0_0_40px_rgba(29,78,216,0.5)]" />
              </div>
            </ContainerInset>

            <ContainerAnimated transition={{ delay: 0.4 }} outputRange={[-100, 0]} inputRange={[0, 0.7]}
              className="absolute bottom-[12vh] left-0 right-0 flex justify-center z-10">
              <HeroButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <span className="mr-2">Get your AI chat</span>
                <ArrowRight size={15} />
              </HeroButton>
            </ContainerAnimated>
          </ContainerSticky>
        </ContainerScroll>
      </section>

      {/* ━━ SERVICES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="anim text-center mb-16">
            <span className="text-[#1d4ed8] text-xs font-bold tracking-widest uppercase">Services</span>
            <StreamOnView
              as="h2" className="text-3xl md:text-4xl font-extrabold text-[#0f2c5e] mt-3"
              text="Everything your business needs to run smarter"
            />
            <StreamOnView
              as="p" segmentDelay={20} fadeDuration={600}
              className="text-[#64748b] mt-3 max-w-xl mx-auto"
              text="Websites, smart chat, online booking, and automations — all built for local businesses."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.title} className={`anim relative rounded-2xl border p-6 transition-all duration-300 group ${
                s.featured
                  ? 'bg-[#0f2c5e] border-[#0f2c5e] text-white'
                  : 'bg-white border-[#e2e8f0] hover:border-[#3b82f6] hover:shadow-lg'
              }`} style={{ animationDelay: `${i * 0.08}s` }}>
                {s.tag && (
                  <span className="absolute top-4 right-4 bg-[#f59e0b] text-[#0f2c5e] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wide uppercase">
                    {s.tag}
                  </span>
                )}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                  s.featured ? 'bg-white/10' : 'bg-[#eff6ff]'
                }`}>
                  <s.icon size={20} className={s.featured ? 'text-white' : 'text-[#1d4ed8]'} />
                </div>
                <h3 className={`font-extrabold mb-2 ${s.featured ? 'text-white' : 'text-[#0f2c5e]'}`}>{s.title}</h3>
                <p className={`text-sm mb-4 leading-relaxed ${s.featured ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${s.featured ? 'text-[#cbd5e1]' : 'text-[#475569]'}`}>
                      <Check size={14} className={`mt-0.5 flex-shrink-0 ${s.featured ? 'text-[#f59e0b]' : 'text-[#3b82f6]'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ AUTOMATIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="automations" className="py-24 px-6 bg-[#0f2c5e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 text-white" aria-hidden="true">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="anim mb-14">
            <span className="text-[#7dd3fc] text-xs font-bold tracking-widest uppercase">Automations</span>
            <StreamOnView
              as="h2" className="text-3xl md:text-4xl font-extrabold text-white mt-3 max-w-2xl"
              text={"Things that happen automatically — so you don't have to"}
            />
            <StreamOnView
              as="p" segmentDelay={16} fadeDuration={600}
              className="text-[#94a3b8] mt-3 max-w-xl"
              text="Every automation we set up saves you hours every week. Here are some examples of what we can connect to your website:"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {automations.map((a, i) => (
              <div key={a.title} className="glow anim bg-white/[0.06] border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-[#f59e0b]/60 hover:-translate-y-1 transition-all duration-200"
                style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <a.icon size={18} className="text-[#f59e0b]" />
                </div>
                <p className="text-sm font-bold text-white leading-snug mb-1">
                  {a.title} <span className="text-[#f59e0b]">→</span> {a.arrow}
                </p>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="anim text-center mt-12">
            <p className="text-[#94a3b8] text-sm mb-5">Don&apos;t see what you need? We can automate almost any repetitive task.</p>
            <a href="#contact" className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f2c5e] font-bold px-7 py-3.5 rounded-full transition-colors">
              Ask us about your automation <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ━━ WHY PANTLAZA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="why" className="py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="anim">
              <span className="text-[#1d4ed8] text-xs font-bold tracking-widest uppercase">Why Pantlaza?</span>
              <StreamOnView
                as="h2" className="text-3xl md:text-4xl font-extrabold text-[#0f2c5e] mt-3 mb-4"
                text="We work with you, not just for you"
              />
              <StreamOnView
                as="p" segmentDelay={20} fadeDuration={600}
                className="text-[#64748b] leading-relaxed mb-8"
                text="We're not a generic agency. We specialize in local businesses and understand exactly what you need."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyProps.map((p, i) => (
                <div key={p.title} className="anim bg-white rounded-2xl p-5 border border-[#e2e8f0]"
                  style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="w-9 h-9 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-3">
                    <p.icon size={16} className="text-[#1d4ed8]" />
                  </div>
                  <h4 className="font-bold text-[#0f2c5e] text-sm mb-1">{p.title}</h4>
                  <p className="text-xs text-[#64748b] leading-relaxed">{p.desc}</p>
                </div>
              ))}
              {/* Zero-commitment wide card */}
              <div className="anim sm:col-span-2 bg-gradient-to-br from-[#eff6ff] to-[#fef9ec] rounded-2xl p-5 border border-[#bfdbfe]"
                style={{ animationDelay: '0.32s' }}>
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center mb-3">
                  <Sparkles size={16} className="text-[#f59e0b]" />
                </div>
                <h4 className="font-bold text-[#0f2c5e] text-sm mb-1">See it before you pay — zero commitment</h4>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  We build a real example of your website first. If you love it, we finalize it together.
                  If not, you walk away — no charge, no pressure, no commitment.
                </p>
              </div>
            </div>
          </div>

          {/* Right — Testimonials */}
          <div className="flex flex-col gap-5">
            {testimonials.map((t, i) => (
              <div key={t.name} className="anim bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm"
                style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="flex gap-0.5 text-[#f59e0b] text-lg mb-3">★★★★★</div>
                <p className="text-[#1e293b] italic leading-relaxed text-sm mb-4">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0f2c5e] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0f2c5e]">{t.name}</div>
                    <div className="text-xs text-[#64748b]">{t.biz}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ PROCESS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="process" className="py-24 px-6 bg-[#0f2c5e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 text-white" aria-hidden="true">
          <FloatingPaths position={-1} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="anim text-center mb-16">
            <span className="text-[#7dd3fc] text-xs font-bold tracking-widest uppercase">How we work</span>
            <StreamOnView
              as="h2" className="text-3xl md:text-4xl font-extrabold text-white mt-3"
              text="Simple, fast, and hassle-free"
            />
            <StreamOnView
              as="p" segmentDelay={20} fadeDuration={600}
              className="text-[#94a3b8] mt-3"
              text="4 steps to have your professional website live and ready."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-white/10" />
            {steps.map((s, i) => (
              <div key={s.n} className="anim text-center relative" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 rounded-full border-2 border-white/20 bg-white/[0.08] flex items-center justify-center mx-auto mb-5 relative z-10">
                  <span className="text-xl font-black text-[#f59e0b]">{s.n}</span>
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ NO-COMMITMENT BANNER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto anim text-center">
          <span className="text-[#1d4ed8] text-xs font-bold tracking-widest uppercase">How it works</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2c5e] mt-3 mb-4 leading-tight">
            We build your example first.<br />
            <span className="text-[#f59e0b]">You only pay if you love it.</span>
          </h2>
          <StreamOnView
            as="p" segmentDelay={18} fadeDuration={600}
            className="text-[#64748b] max-w-xl mx-auto mb-8 leading-relaxed"
            text="Tell us about your business and we'll create a real website example for you — for free. Review it, request changes, and decide. No commitment, no risk."
          />
          <a href="#contact" className="inline-flex items-center gap-2 bg-[#0f2c5e] hover:bg-[#1d4ed8] text-white font-bold px-8 py-4 rounded-full transition-colors">
            Get my free example <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ━━ CONTACT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="contact" className="py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div className="anim">
            <span className="text-[#1d4ed8] text-xs font-bold tracking-widest uppercase">Contact</span>
            <StreamOnView
              as="h2" className="text-3xl md:text-4xl font-extrabold text-[#0f2c5e] mt-3 mb-4"
              text={"Let's build your example — free"}
            />
            <StreamOnView
              as="p" segmentDelay={20} fadeDuration={600}
              className="text-[#64748b] leading-relaxed mb-8"
              text="Tell us about your business and we'll create a sample website for you at no cost. If you like it, we launch it. If not, no charge."
            />
            <div className="space-y-4">
              {[
                { icon: Phone,  label: 'Phone / WhatsApp', value: '(201) 000-0000' },
                { icon: Mail,   label: 'Email',            value: 'hola@pantlaza.com' },
                { icon: MapPin, label: 'Service area',     value: 'Bergen County & Northern NJ' },
                { icon: Clock,  label: 'Hours',            value: 'Mon–Fri 9am–7pm · Sat 10am–4pm' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl border border-[#e2e8f0] flex items-center justify-center flex-shrink-0">
                    <c.icon size={17} className="text-[#1d4ed8]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#64748b] mb-0.5">{c.label}</div>
                    <div className="text-sm font-semibold text-[#0f2c5e]">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="anim bg-white rounded-2xl p-8 border border-[#e2e8f0] shadow-sm" style={{ animationDelay: '0.12s' }}>
            <h3 className="font-extrabold text-[#0f2c5e] mb-6">Get your free website example</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0f2c5e]">Name</label>
                <input type="text" placeholder="Your name" className="px-4 py-3 rounded-xl border-[1.5px] border-[#e2e8f0] text-sm focus:outline-none focus:border-[#3b82f6] transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0f2c5e]">Business name</label>
                <input type="text" placeholder="Your business" className="px-4 py-3 rounded-xl border-[1.5px] border-[#e2e8f0] text-sm focus:outline-none focus:border-[#3b82f6] transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0f2c5e]">Phone</label>
                <input type="tel" placeholder="(201) 000-0000" className="px-4 py-3 rounded-xl border-[1.5px] border-[#e2e8f0] text-sm focus:outline-none focus:border-[#3b82f6] transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0f2c5e]">Service of interest</label>
                <select className="px-4 py-3 rounded-xl border-[1.5px] border-[#e2e8f0] text-sm focus:outline-none focus:border-[#3b82f6] transition-colors bg-white text-[#64748b]">
                  <option value="">Select…</option>
                  <option>Build a new website</option>
                  <option>Update existing website</option>
                  <option>AI Chat for my website</option>
                  <option>Online booking + calendar sync</option>
                  <option>Business automations</option>
                  <option>Website maintenance</option>
                  <option>Not sure yet</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-xs font-semibold text-[#0f2c5e]">Tell us about your business</label>
              <textarea rows={4} placeholder="What do you do? What's your main goal for the website?"
                className="px-4 py-3 rounded-xl border-[1.5px] border-[#e2e8f0] text-sm focus:outline-none focus:border-[#3b82f6] transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full bg-[#0f2c5e] hover:bg-[#1d4ed8] text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              Get my free example <ArrowRight size={17} />
            </button>
            <p className="text-xs text-[#94a3b8] text-center mt-3">🔒 No commitment. We&apos;ll reach out within 24 hours to get started.</p>
          </div>
        </div>
      </section>

      {/* ━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="bg-[#0f2c5e] pt-14 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            <div>
              <FooterLogo />
              <p className="text-[#94a3b8] text-sm leading-relaxed mt-4 max-w-[260px]">
                Professional web design for local businesses in New Jersey. Connecting your brand with more customers.
              </p>
            </div>
            <div>
              <h4 className="text-white text-xs font-extrabold tracking-widest uppercase mb-5">Services</h4>
              <ul className="space-y-2">
                {['Build a website', 'Website redesign', 'Maintenance', 'Automations', 'AI Chat', 'Appointment Booking'].map((l) => (
                  <li key={l}><a href="#services" className="text-[#94a3b8] text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-xs font-extrabold tracking-widest uppercase mb-5">Company</h4>
              <ul className="space-y-2">
                {[['Why Pantlaza', '#why'], ['How we work', '#process'], ['Contact', '#contact'], ['Free consultation', '#contact']].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-[#94a3b8] text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-7 text-xs text-[#475569]">
            <span>© {new Date().getFullYear()} Pantlaza · Bergen County, NJ</span>
            <span>Designed with ♥ by Pantlaza</span>
          </div>
        </div>
      </footer>
    </>
  );
}
