"use client";

import { useState, useEffect } from 'react';

const Main = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const parallax = (speed: number) => scrollY * speed;

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
          <a href="#why" className="hover:opacity-50 transition-opacity">Why</a>
          <a href="#how" className="hover:opacity-50 transition-opacity">How</a>
          <a href="https://app.ddos.best" className="hover:opacity-50 transition-opacity">App →</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center relative px-8">
        <div className="absolute top-1/4 left-8 text-[10px] tracking-[0.5em] uppercase opacity-30"
          style={{ transform: `translateY(${parallax(-0.1)}px)` }}>
          Middleware
        </div>
        
        <div className="text-center relative">
          <div className="overflow-hidden">
            <h1 
              className={`text-[12vw] leading-[0.85] font-bold tracking-[-0.04em] font-[var(--font-syne)] transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
            >
              Don't block
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 
              className={`text-[12vw] leading-[0.85] font-light tracking-[-0.04em] font-[var(--font-syne)] transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} pb-10`}
            >
              <span className="italic text-[#888]">charge</span>
            </h1>
          </div>
        </div>

        <p className={`mt-16 max-w-md text-center text-sm leading-relaxed opacity-50 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-50' : 'opacity-0'}`}>
          A protective layer that monetizes bot traffic instead of blocking it. AI scrapers pay to access. You get compensated.
        </p>

        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-30' : 'opacity-0'}`}>
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-pulse" 
              style={{ animation: 'scrollDown 1.5s ease-in-out infinite' }}
            />
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section id="why" className="min-h-screen flex items-center px-8 py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-30 block mb-8">The Problem</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight font-[var(--font-syne)]">
              AI companies scrape.
              <br />
              <span className="opacity-30 font-light">You get nothing.</span>
            </h2>
          </div>
          <div className="space-y-6 text-sm opacity-60 leading-relaxed">
            <p>Every day, AI agents crawl your content. They train models worth billions on your data.</p>
            <p>No credit. No payment. Just vibes.</p>
            <p className="text-white opacity-100 font-medium">That feels broken.</p>
          </div>
        </div>
      </section>

      {/* Flow Visualization */}
   {/* Flow Visualization */}
<section className="min-h-screen flex items-center justify-center px-8 py-32 relative overflow-hidden">
  
  {/* Animated 402 Background */}
  <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
    <span 
      className="text-[50vw] font-bold font-[var(--font-syne)] text-transparent animate-pulse"
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
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ))}
  </div>

  <div className="relative z-10 max-w-5xl w-full">
    
    {/* Section Label */}
    <div className="text-center mb-16">
      <span className="text-[10px] tracking-[0.5em] uppercase opacity-30">The Flow</span>
    </div>

    {/* Flow Diagram */}
    <div className="relative">
      
      {/* Horizontal connecting line */}
      <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 z-0">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Animated pulse on line */}
        <div 
          className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{ animation: 'flowPulse 3s ease-in-out infinite' }}
        />
      </div>

      <div className="grid grid-cols-5 gap-4 items-center">
        
        {/* Left - Sources */}
        <div className="space-y-4 col-span-1">
          <div className="group border border-white/10 p-5 hover:border-white/30 transition-all duration-500 hover:bg-white/[0.02] relative">
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-px bg-white/20 group-hover:w-4 group-hover:bg-white/40 transition-all" />
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Human</div>
            <div className="text-base font-[var(--font-syne)]">Browser</div>
          </div>
          <div className="group border border-white/10 p-5 hover:border-white/30 transition-all duration-500 hover:bg-white/[0.02] relative">
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-px bg-white/20 group-hover:w-4 group-hover:bg-white/40 transition-all" />
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Bot</div>
            <div className="text-base font-[var(--font-syne)]">AI Agent</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center col-span-1">
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-8 h-px bg-white/50" />
            <span className="text-xs">→</span>
          </div>
        </div>

        {/* Middle - The Gate */}
        <div className="relative col-span-1 flex justify-center">
          {/* Glow behind gate */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          </div>
          
          <div className="bg-[#0a0a0a] border border-white/20 p-6 relative z-10 text-center hover:border-white/40 transition-all duration-500 group">
            {/* Corner accents */}
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
        <div className="flex items-center justify-center col-span-1">
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
          <div className="group border border-white/10 p-5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 relative">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-px bg-white/20" />
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Humans</div>
            <div className="text-base opacity-60 font-[var(--font-syne)]">→ Origin</div>
          </div>
          <div className="group border border-white/20 p-5 hover:border-white/40 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-px bg-white/20" />
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Bots</div>
            <div className="text-base text-white font-[var(--font-syne)] relative z-10">→ Pay & Access</div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom info */}
    <div className="mt-20 flex justify-center items-center gap-8">
      <code className="text-[10px] tracking-widest opacity-20 uppercase">HTTP 402</code>
      <div className="w-px h-4 bg-white/10" />
      <code className="text-[10px] tracking-widest opacity-20 uppercase">Payment Required</code>
      <div className="w-px h-4 bg-white/10" />
      <code className="text-[10px] tracking-widest opacity-20 uppercase">x402 Protocol</code>
    </div>

  </div>

  <style>{`
    @keyframes pulse402 {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes flowPulse {
      0% { transform: translateX(-100%); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateX(400%); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) scale(1); opacity: 0.1; }
      50% { transform: translateY(-20px) scale(1.5); opacity: 0.3; }
    }
  `}</style>
</section>

      {/* How It Works */}
      <section id="how" className="min-h-screen flex items-center px-8 py-32">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-[10px] tracking-[0.5em] uppercase opacity-30 block mb-16">Implementation</span>
          
          <div className="space-y-0">
            {[
              { num: '01', title: 'Point DNS', desc: 'Route your domain through our gate. No SDK. No code changes.' },
              { num: '02', title: 'We inspect', desc: 'Every request passes through middleware. Humans flow. Bots get flagged.' },
              { num: '03', title: 'Bots pay', desc: 'HTTP 402 response. x402 protocol via Coinbase. Micro-payment. Access granted.' },
              { num: '04', title: 'You earn', desc: 'Every scrape, every crawl, every automated request — compensated.' },
            ].map((item, i) => (
              <div key={i} className="border-t border-white/10 py-12 grid grid-cols-12 gap-8 items-start hover:bg-white/[0.02] transition-colors px-4 -mx-4">
                <div className="col-span-1 text-xs opacity-30">{item.num}</div>
                <div className="col-span-4 text-2xl font-semibold font-[var(--font-syne)]">{item.title}</div>
                <div className="col-span-7 text-sm opacity-50 pt-2">{item.desc}</div>
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
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-8 py-32 relative">
        <h2 className="text-[8vw] font-bold tracking-tight text-center leading-none mb-12 font-[var(--font-syne)]">
          Not everything
          <br />
          <span className="italic font-light opacity-40">should be free</span>
        </h2>
        
        <a href="https://app.ddos.best" className="group relative px-12 py-4 border border-white/20 hover:border-white/50 transition-all duration-500 overflow-hidden inline-block">
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
      `}</style>
    </div>
  );
};

export default Main;