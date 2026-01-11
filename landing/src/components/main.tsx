"use client";

import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs for animations
  const lenisRef = useRef<Lenis | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitle1Ref = useRef<HTMLHeadingElement>(null);
  const heroTitle2Ref = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bg402Ref = useRef<HTMLSpanElement>(null);

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: -100,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    // Initialize Lenis with smoother settings
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });
    
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Mouse move handler
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);

    // Set loaded after small delay for entrance animations
    setTimeout(() => setIsLoaded(true), 100);

    // GSAP Animations
    const ctx = gsap.context(() => {
      
      // Hero parallax on scroll
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: 30,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 402 Background parallax (moves slower)
      if (bg402Ref.current) {
        gsap.to(bg402Ref.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: flowRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Problem section reveal
      if (problemRef.current) {
        const problemElements = problemRef.current.querySelectorAll('.reveal-item');
        gsap.fromTo(problemElements, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: problemRef.current,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Flow section reveal
      if (flowRef.current) {
        const flowElements = flowRef.current.querySelectorAll('.flow-item');
        gsap.fromTo(flowElements,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: flowRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // How section - each step reveals
      if (howRef.current) {
        const steps = howRef.current.querySelectorAll('.step-item');
        steps.forEach((step, i) => {
          gsap.fromTo(step,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // CTA section
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.querySelectorAll('.cta-item'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

    });

    return () => {
      ctx.revert();
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-[#e8e8e8] min-h-screen overflow-x-hidden font-[var(--font-space)] selection:bg-white selection:text-black">
      
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* Custom Cursor Glow */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-40 transition-all duration-700 ease-out opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="DDoS" className="h-6 w-auto" />
          <span className="text-sm tracking-[0.3em] uppercase font-[var(--font-syne)] font-bold">DDoS</span>
        </div>
        <div className="flex gap-12 text-xs tracking-widest uppercase">
          <a 
            href="#why" 
            onClick={(e) => scrollToSection(e, '#why')}
            className="hover:opacity-50 transition-opacity cursor-pointer"
          >
            Why
          </a>
          <a 
            href="#how" 
            onClick={(e) => scrollToSection(e, '#how')}
            className="hover:opacity-50 transition-opacity cursor-pointer"
          >
            How
          </a>
          <a href="https://app.ddos.best" className="hover:opacity-50 transition-opacity">App →</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center relative px-8">
        <div ref={heroRef} className="text-center relative">
          <div className="overflow-hidden">
            <h1 
              ref={heroTitle1Ref}
              className={`text-[12vw] leading-[0.85] font-bold tracking-[-0.04em] font-[var(--font-syne)] transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
            >
              Don't block
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 
              ref={heroTitle2Ref}
              className={`text-[12vw] leading-[0.85] font-light tracking-[-0.04em] font-[var(--font-syne)] transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} pb-10`}
            >
              <span className="italic text-[#888]">charge</span>
            </h1>
          </div>
          
          <p 
            ref={heroDescRef}
            className={`mt-16 max-w-md mx-auto text-center text-sm leading-relaxed transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-50' : 'opacity-0'}`}
          >
            A protective layer that monetizes bot traffic instead of blocking it. AI scrapers pay to access. You get compensated.
          </p>
        </div>

        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-30' : 'opacity-0'}`}>
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white" 
              style={{ animation: 'scrollDown 1.5s ease-in-out infinite' }}
            />
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section id="why" className="min-h-screen flex items-center px-8 py-32">
        <div ref={problemRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="reveal-item text-[10px] tracking-[0.5em] uppercase opacity-30 block mb-8">The Problem</span>
            <h2 className="reveal-item text-4xl md:text-5xl font-bold leading-tight tracking-tight font-[var(--font-syne)]">
              AI companies scrape.
              <br />
              <span className="opacity-30 font-light">You get nothing.</span>
            </h2>
          </div>
          <div className="space-y-6 text-sm opacity-60 leading-relaxed">
            <p className="reveal-item">Every day, AI agents crawl your content. They train models worth billions on your data.</p>
            <p className="reveal-item">No credit. No payment. Just vibes.</p>
            <p className="reveal-item text-white opacity-100 font-medium">That feels broken.</p>
          </div>
        </div>
      </section>

      {/* Flow Visualization */}
      <section className="min-h-screen flex items-center justify-center px-8 py-32 relative overflow-hidden">
        
        {/* Animated 402 Background */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span 
            ref={bg402Ref}
            className="text-[50vw] font-bold font-[var(--font-syne)] text-transparent"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.03)',
              animation: 'pulse402 4s ease-in-out infinite'
            }}
          >
            402
          </span>
        </div>

        {/* Floating particles/dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              style={{
                left: `${10 + (i * 4.5) % 90}%`,
                top: `${5 + (i * 7.3) % 90}%`,
                animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i % 5) * 0.4}s`
              }}
            />
          ))}
        </div>

        <div ref={flowRef} className="relative z-10 max-w-5xl w-full">
          
          {/* Section Label */}
          <div className="text-center mb-16">
            <span className="flow-item text-[10px] tracking-[0.5em] uppercase opacity-30">The Flow</span>
          </div>

          {/* Flow Diagram */}
          <div className="relative">
            
            {/* Desktop: Horizontal connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2 z-0">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div 
                className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ animation: 'flowPulse 3s ease-in-out infinite' }}
              />
            </div>

            {/* Mobile: Vertical connecting line */}
            <div className="md:hidden absolute top-0 left-1/2 h-full w-px -translate-x-1/2 z-0">
              <div className="h-full w-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div 
                className="absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-transparent via-white/40 to-transparent"
                style={{ animation: 'flowPulseVertical 3s ease-in-out infinite' }}
              />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-5 gap-4 items-center">
              
              {/* Left - Sources */}
              <div className="space-y-4 col-span-1">
                <div className="flow-item group border border-white/10 p-5 hover:border-white/30 transition-all duration-500 hover:bg-white/[0.02] relative">
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-px bg-white/20 group-hover:w-4 group-hover:bg-white/40 transition-all" />
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Human</div>
                  <div className="text-base font-[var(--font-syne)]">Browser</div>
                </div>
                <div className="flow-item group border border-white/10 p-5 hover:border-white/30 transition-all duration-500 hover:bg-white/[0.02] relative">
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-px bg-white/20 group-hover:w-4 group-hover:bg-white/40 transition-all" />
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Bot</div>
                  <div className="text-base font-[var(--font-syne)]">AI Agent</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flow-item flex items-center justify-center col-span-1">
                <div className="flex items-center gap-2 opacity-30">
                  <div className="w-8 h-px bg-white/50" />
                  <span className="text-xs">→</span>
                </div>
              </div>

              {/* Middle - The Gate */}
              <div className="relative col-span-1 flex justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                </div>
                
                <div className="flow-item bg-[#0a0a0a] border border-white/20 p-6 relative z-10 text-center hover:border-white/40 transition-all duration-500 group">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
                  
                  <div className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-3">DDoS</div>
                  <div className="text-3xl font-bold mb-4 font-[var(--font-syne)] group-hover:tracking-wider transition-all">x402</div>
                  <div className="text-[9px] opacity-30 space-y-1 tracking-wider uppercase">
                    <div>Inspect</div>
                    <div>Detect</div>
                    <div>Charge</div>
                  </div>
                </div>
              </div>

              {/* Arrow with decision */}
              <div className="flow-item flex items-center justify-center col-span-1">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 opacity-50">
                    <span className="text-[10px] tracking-wider uppercase text-green-400/70">Pass</span>
                    <span className="text-xs">→</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <span className="text-[10px] tracking-wider uppercase text-amber-400/70">Pay</span>
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>

              {/* Right - Outcomes */}
              <div className="space-y-4 col-span-1">
                <div className="flow-item group border border-white/10 p-5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 relative">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-px bg-white/20" />
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Humans</div>
                  <div className="text-base opacity-60 font-[var(--font-syne)]">→ Origin</div>
                </div>
                <div className="flow-item group border border-white/20 p-5 hover:border-white/40 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-px bg-white/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Bots</div>
                  <div className="text-base text-white font-[var(--font-syne)] relative z-10">→ Pay & Access</div>
                </div>
              </div>
            </div>

            {/* Mobile Layout - Vertical */}
            <div className="md:hidden flex flex-col items-center gap-6">
              
              {/* Sources */}
              <div className="flow-item flex gap-4 w-full max-w-sm">
                <div className="flex-1 border border-white/10 p-4 text-center">
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1">Human</div>
                  <div className="text-sm font-[var(--font-syne)]">Browser</div>
                </div>
                <div className="flex-1 border border-white/10 p-4 text-center">
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1">Bot</div>
                  <div className="text-sm font-[var(--font-syne)]">AI Agent</div>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flow-item flex flex-col items-center gap-1 opacity-30">
                <div className="h-6 w-px bg-white/50" />
                <span className="text-xs">↓</span>
              </div>

              {/* The Gate */}
              <div className="flow-item relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                </div>
                
                <div className="bg-[#0a0a0a] border border-white/20 p-6 relative z-10 text-center w-full max-w-[200px]">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
                  
                  <div className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-3">DDoS</div>
                  <div className="text-2xl font-bold mb-3 font-[var(--font-syne)]">x402</div>
                  <div className="text-[9px] opacity-30 space-y-1 tracking-wider uppercase">
                    <div>Inspect • Detect • Charge</div>
                  </div>
                </div>
              </div>

              {/* Arrow Down with decisions */}
              <div className="flow-item flex items-center gap-8 opacity-50">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] tracking-wider uppercase text-green-400/70">Pass</span>
                  <span className="text-xs">↓</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] tracking-wider uppercase text-amber-400/70">Pay</span>
                  <span className="text-xs">↓</span>
                </div>
              </div>

              {/* Outcomes */}
              <div className="flow-item flex gap-4 w-full max-w-sm">
                <div className="flex-1 border border-white/10 p-4 bg-white/[0.02] text-center">
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1">Humans</div>
                  <div className="text-sm opacity-60 font-[var(--font-syne)]">→ Origin</div>
                </div>
                <div className="flex-1 border border-white/20 p-4 text-center">
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1">Bots</div>
                  <div className="text-sm text-white font-[var(--font-syne)]">→ Pay</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom info */}
          <div className="flow-item mt-20 flex justify-center items-center gap-8">
            <code className="text-[10px] tracking-widest opacity-20 uppercase">HTTP 402</code>
            <div className="w-px h-4 bg-white/10" />
            <code className="text-[10px] tracking-widest opacity-20 uppercase">Payment Required</code>
            <div className="w-px h-4 bg-white/10" />
            <code className="text-[10px] tracking-widest opacity-20 uppercase">x402 Protocol</code>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="min-h-screen flex items-center px-8 py-32">
        <div ref={howRef} className="max-w-6xl mx-auto w-full">
          <span className="step-item text-[10px] tracking-[0.5em] uppercase opacity-30 block mb-16">Implementation</span>
          
          <div className="space-y-0">
            {[
              { num: '01', title: 'Point DNS', desc: 'Route your domain through our gate. No SDK. No code changes.' },
              { num: '02', title: 'We inspect', desc: 'Every request passes through middleware. Humans flow. Bots get flagged.' },
              { num: '03', title: 'Bots pay', desc: 'HTTP 402 response. x402 protocol via Coinbase. Micro-payment. Access granted.' },
              { num: '04', title: 'You earn', desc: 'Every scrape, every crawl, every automated request — compensated.' },
            ].map((item, i) => (
              <div key={i} className="step-item border-t border-white/10 py-8 md:py-12 hover:bg-white/[0.02] transition-colors px-4 -mx-4">
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-xs opacity-30">{item.num}</span>
                    <h3 className="text-xl font-semibold font-[var(--font-syne)]">{item.title}</h3>
                  </div>
                  <p className="text-sm opacity-50 pl-8">{item.desc}</p>
                </div>
                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-1 text-xs opacity-30">{item.num}</div>
                  <div className="col-span-4 text-2xl font-semibold font-[var(--font-syne)]">{item.title}</div>
                  <div className="col-span-7 text-sm opacity-50 pt-2">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="px-8 py-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="border border-white/10 p-12 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0a0a] px-4 text-[10px] tracking-[0.5em] uppercase opacity-50">
              Note
            </div>
            <p className="text-sm leading-relaxed opacity-60">
              We're not enabling DDoS attacks. Network floods still get blocked. What we monetize is structured access — scraping, automation, high-volume requests. Big difference.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="min-h-[80vh] flex flex-col items-center justify-center px-8 py-32 relative">
        <h2 className="cta-item text-[8vw] font-bold tracking-tight text-center leading-none mb-12 font-[var(--font-syne)]">
          Not everything
          <br />
          <span className="italic font-light opacity-40">should be free</span>
        </h2>
        
        <a href="https://app.ddos.best" className="cta-item group relative px-12 py-4 border border-white/20 hover:border-white/50 transition-all duration-500 overflow-hidden inline-block">
          <span className="relative z-10 text-xs tracking-[0.3em] uppercase">Try DDoS</span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.3em] uppercase text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            Try DDoS
          </span>
        </a>

        <div className="absolute bottom-12 left-8 text-[10px] tracking-[0.3em] uppercase opacity-20">
        </div>
        <div className="absolute bottom-12 right-8 text-[10px] tracking-[0.3em] uppercase opacity-20">
          Experimental
        </div>
      </section>

      <style>{`
        @keyframes scrollDown {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(200%); }
        }
        @keyframes pulse402 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes flowPulse {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(400%); opacity: 0; }
        }
        @keyframes flowPulseVertical {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.1; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Main;