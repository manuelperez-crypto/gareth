'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { ArrowRight, Calendar, MessageSquare, TrendingUp, Star, Zap, Globe, Bot, Sparkles } from 'lucide-react';
import {
  ContainerScroll,
  ContainerSticky,
  ContainerAnimated,
  ContainerInset,
  HeroButton,
} from '@/components/ui/animated-video-on-scroll';
import { PantitoRobot } from '@/components/ui/pantito-robot';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';

const SplineScene = dynamic(
  () => import('@/components/ui/splite').then((m) => ({ default: m.SplineScene })),
  { ssr: false }
);

// Dynamic import — disables SSR for the WebGPU canvas
const HeroFuturistic = dynamic(() => import('@/components/ui/hero-futuristic'), { ssr: false });

// ── Pantlaza Mountain Logo ──────────────────────────────────────────────────
const NavLogo = () => (
  <svg viewBox="0 0 340 106" width="140" height="44" aria-label="Pantlaza">
    <polygon points="28,82 58,28 88,82" fill="#1d4ed8" opacity=".55" />
    <polygon points="60,82 88,36 116,82" fill="#1d4ed8" opacity=".55" />
    <polygon points="10,82 70,8 130,82" fill="#0f2c5e" />
    <polygon points="56,34 70,8 84,34" fill="#f59e0b" />
    <line x1="10" y1="82" x2="130" y2="82" stroke="#0f2c5e" strokeWidth="2.5" strokeLinecap="round" />
    <text x="150" y="67" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="42" fontWeight="800" letterSpacing="-.8">
      <tspan fill="#0f2c5e">Pant</tspan>
      <tspan fill="#f59e0b">laza</tspan>
    </text>
  </svg>
);

const FooterLogo = () => (
  <svg viewBox="0 0 140 106" width="100" height="75" aria-label="Pantlaza">
    <polygon points="28,82 58,28 88,82" fill="#93c5fd" opacity=".6" />
    <polygon points="60,82 88,36 116,82" fill="#93c5fd" opacity=".6" />
    <polygon points="10,82 70,8 130,82" fill="#fff" />
    <polygon points="56,34 70,8 84,34" fill="#f59e0b" />
    <line x1="10" y1="82" x2="130" y2="82" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    <text x="70" y="100" textAnchor="middle" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="13" fontWeight="800" letterSpacing="-.3">
      <tspan fill="#fff">Pant</tspan>
      <tspan fill="#f59e0b">laza</tspan>
    </text>
  </svg>
);

// ── Scroll animation hook ───────────────────────────────────────────────────
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
      { threshold: 0.08 }
    );
    document.querySelectorAll('.anim, .anim-stagger').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Services data ───────────────────────────────────────────────────────────
const services = [
  {
    icon: Globe,
    title: 'Sitio Web Profesional',
    desc: 'Diseño rápido, moderno y optimizado para SEO local. Tu negocio merece una presencia online que convierte.',
  },
  {
    icon: Bot,
    title: 'Chat IA 24/7',
    desc: 'Un agente inteligente que responde preguntas, captura leads y agenda citas — incluso cuando duermes.',
  },
  {
    icon: Calendar,
    title: 'Automatización de Citas',
    desc: 'Integración con Google Calendar. Tus clientes agendan solos; tú te enfocas en atenderlos.',
  },
  {
    icon: MessageSquare,
    title: 'Marketing por WhatsApp',
    desc: 'Flujos automáticos de seguimiento para retener clientes y reactivar prospectos fríos.',
  },
  {
    icon: TrendingUp,
    title: 'SEO & Posicionamiento',
    desc: 'Estrategia de contenido y optimización técnica para aparecer primero en Google Maps y búsquedas locales.',
  },
  {
    icon: Zap,
    title: 'Automatizaciones a Medida',
    desc: 'Conectamos tus herramientas — CRM, correo, pagos — para que tu negocio funcione en piloto automático.',
  },
];

const stats = [
  { value: '3×', label: 'Más leads en 60 días' },
  { value: '24/7', label: 'Atención sin descanso' },
  { value: '98%', label: 'Satisfacción de clientes' },
  { value: '<48h', label: 'Tiempo de entrega' },
];

const whyProps = [
  { title: 'Entregamos en 48 horas', desc: 'Sin esperas de semanas. Tu sitio web listo y funcionando en dos días.' },
  { title: 'Precio justo, sin sorpresas', desc: 'Paquetes transparentes diseñados para pequeños negocios con grandes ambiciones.' },
  { title: 'Soporte en español', desc: 'Hablamos tu idioma, entendemos tu mercado y estamos disponibles cuando nos necesitas.' },
  { title: 'Resultados medibles', desc: 'Cada automatización tiene métricas claras. Sabes exactamente qué está funcionando.' },
];

// ── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();

  return (
    <>
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 bg-white/90 backdrop-blur-md border-b border-[#e2e8f0]">
        <NavLogo />
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#0f2c5e]">
          <a href="#servicios" className="hover:text-[#1d4ed8] transition-colors">Servicios</a>
          <a href="#por-que" className="hover:text-[#1d4ed8] transition-colors">Por qué Pantlaza</a>
          <a href="#contacto" className="hover:text-[#1d4ed8] transition-colors">Contacto</a>
        </div>
        <a
          href="#contacto"
          className="flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f2c5e] font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          Empieza hoy <ArrowRight size={16} />
        </a>
      </nav>

      {/* ── Hero (WebGPU) ── */}
      <HeroFuturistic />

      {/* ── Stats ── */}
      <section className="bg-[#0f2c5e] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 anim-stagger">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[#f59e0b] tabular-nums">{s.value}</div>
              <div className="text-sm text-white/70 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Spline 3D Robot Card ── */}
      <section className="bg-[#02091a] px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-[#1d4ed8]/20">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="#3b82f6"
            />
            <div className="flex h-full">
              {/* Left — text */}
              <div className="flex-1 p-10 relative z-10 flex flex-col justify-center">
                <span className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Sparkles size={12} /> Asistente IA
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
                  Pantito,<br />tu robot<br />de ventas
                </h2>
                <p className="mt-5 text-neutral-400 max-w-[36ch] leading-relaxed text-sm md:text-base">
                  Captura leads, responde preguntas y agenda citas en tiempo real —
                  las 24 horas, los 7 días de la semana, sin que tú muevas un dedo.
                </p>
                <a
                  href="#contacto"
                  className="mt-8 inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f2c5e] font-bold text-sm px-6 py-3 rounded-full w-fit transition-colors"
                >
                  Activa tu Pantito <ArrowRight size={15} />
                </a>
              </div>

              {/* Right — Spline 3D scene */}
              <div className="flex-1 relative">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ── Pantito AI Mascot — animated scroll reveal ── */}
      <section className="bg-[#02091a]">
        <ContainerScroll className="h-[350vh]">
          <ContainerSticky
            className="flex items-center justify-center px-6 py-10 text-slate-50"
            style={{
              background:
                "radial-gradient(55% 55% at 50% 25%, #1d4ed8 0%, #0f2c5e 35%, #02091a 80%)",
            }}
          >
            {/* Headline */}
            <ContainerAnimated className="absolute top-[10vh] left-0 right-0 text-center space-y-4 px-6 z-10">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#f59e0b]">
                <Sparkles size={12} /> Inteligencia Artificial
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Conoce a{" "}
                <span className="text-[#f59e0b]">Pantito</span>
              </h2>
              <p className="mx-auto max-w-[42ch] text-white/70 text-lg">
                Tu nuevo empleado IA — disponible 24/7, nunca se cansa y siempre responde a tus clientes.
              </p>
            </ContainerAnimated>

            {/* Robot image reveal */}
            <ContainerInset
              className="flex items-center justify-center w-full"
              style={{ height: "min(70vh, 560px)" }}
              insetYRange={[30, 0]}
              insetXRange={[20, 0]}
              roundednessRange={[900, 32]}
            >
              <div className="flex items-center justify-center w-full h-full bg-[#0b1a3d] relative">
                {/* Background glow rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border border-[#1d4ed8]/20 animate-[ping_3s_ease-in-out_infinite]" />
                  <div className="absolute w-48 h-48 rounded-full border border-[#f59e0b]/15 animate-[ping_4s_ease-in-out_infinite_0.5s]" />
                </div>
                {/* Grid dots pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle, #93c5fd 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                {/* Pantito */}
                <PantitoRobot className="relative z-10 h-[min(52vh,420px)] w-auto drop-shadow-[0_0_40px_rgba(29,78,216,0.5)]" />
              </div>
            </ContainerInset>

            {/* CTA */}
            <ContainerAnimated
              transition={{ delay: 0.4 }}
              outputRange={[-100, 0]}
              inputRange={[0, 0.7]}
              className="absolute bottom-[12vh] left-0 right-0 flex justify-center z-10"
            >
              <HeroButton onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="mr-2">Activa tu Pantito</span>
                <ArrowRight size={15} />
              </HeroButton>
            </ContainerAnimated>
          </ContainerSticky>
        </ContainerScroll>
      </section>

      {/* ── Services ── */}
      <section id="servicios" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 anim">
            <span className="text-[#1d4ed8] text-xs font-bold tracking-widest uppercase">Lo que hacemos</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2c5e] mt-3">
              Todo lo que tu negocio necesita<br />para crecer en línea
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 anim-stagger">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group p-6 rounded-2xl border border-[#e2e8f0] hover:border-[#1d4ed8] hover:shadow-lg transition-all duration-300 bg-white"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-4 group-hover:bg-[#1d4ed8] transition-colors">
                  <s.icon size={20} className="text-[#1d4ed8] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#0f2c5e] mb-2">{s.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Pantlaza ── */}
      <section id="por-que" className="py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="anim">
            <span className="text-[#1d4ed8] text-xs font-bold tracking-widest uppercase">Por qué elegirnos</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2c5e] mt-3 mb-6">
              La agencia que trabaja<br />mientras tú descansas
            </h2>
            <p className="text-[#64748b] leading-relaxed mb-8">
              Somos un equipo especializado en automatización para negocios locales. No vendemos plantillas — construimos
              sistemas que generan resultados reales desde el día uno.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-[#0f2c5e] hover:bg-[#1d4ed8] text-white font-bold px-7 py-3.5 rounded-full transition-colors"
            >
              Agendar llamada <ArrowRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 anim-stagger">
            {whyProps.map((p, i) => (
              <div
                key={p.title}
                className="flex gap-4 p-5 bg-white rounded-xl border border-[#e2e8f0]"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-8 h-8 rounded-full bg-[#f59e0b] flex-shrink-0 flex items-center justify-center">
                  <Star size={14} className="text-[#0f2c5e]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0f2c5e] text-sm mb-1">{p.title}</h4>
                  <p className="text-xs text-[#64748b] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contacto" className="py-24 px-6 bg-[#0f2c5e]">
        <div className="max-w-2xl mx-auto text-center anim">
          <span className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase">Empecemos</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-4">
            Tu sitio listo en 48 horas
          </h2>
          <p className="text-white/70 mb-10 leading-relaxed">
            Cuéntanos sobre tu negocio y te mandamos una propuesta sin costo. Sin compromisos.
          </p>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:border-[#f59e0b] transition-colors text-sm"
              />
              <input
                type="tel"
                placeholder="WhatsApp"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:border-[#f59e0b] transition-colors text-sm"
              />
            </div>
            <input
              type="text"
              placeholder="Nombre de tu negocio"
              className="w-full px-5 py-3.5 rounded-xl bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:border-[#f59e0b] transition-colors text-sm"
            />
            <textarea
              placeholder="¿Qué necesitas? (sitio web, automatización, chat IA...)"
              rows={4}
              className="w-full px-5 py-3.5 rounded-xl bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:border-[#f59e0b] transition-colors text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f2c5e] font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Enviar mensaje <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#02091a] py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <FooterLogo />
          <p className="text-white/40 text-sm text-center">
            © {new Date().getFullYear()} Pantlaza. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-white/50 text-sm">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </>
  );
}
