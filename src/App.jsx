import React, { useEffect, useMemo, useState, useRef } from "react";
import logo from "./assets/SFSF.png";

const NAV = [
  { label: "Home", href: "#/" },
  { label: "System", href: "#/system" },
  { label: "Get Started", href: "#/get-started" },
];

const PARTNERS = ["CHEVRON", "STANFORD MEDICAL", "TRUE HEALTH CENTER", "PG&E"];

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function useHashRoute() {
  const getRoute = () => {
    const h = (window.location.hash || "#/").toLowerCase();
    const r = h.replace(/^#/, "");
    return r.startsWith("/") ? r : `/${r}`;
  };
  const [route, setRoute] = useState("/");
  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function LogoPlaceholder({ className }) {
  return (
    <img 
      src={logo} 
      alt="Social Following Studios" 
      className={cx("object-contain", className)}
    />
  );
}

function Button({ href, children, variant = "primary", size = "default" }) {
  const base = "inline-flex items-center justify-center rounded-2xl font-black transition active:scale-[0.98] shadow-lg hover:shadow-xl uppercase tracking-wide";
  const sizes = {
    default: "px-6 py-4 text-sm md:text-base",
    large: "px-10 py-5 text-base md:text-lg",
  };
  const styles = variant === "primary" ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-stone-950 text-white hover:bg-stone-900 border-2 border-emerald-600/20";
  return (
    <a href={href} className={cx(base, sizes[size], styles)}>
      {children}
    </a>
  );
}

function SectionHead({ eyebrow, title, desc, right }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 text-left">
      <div>
        <div className="text-base font-black tracking-[0.25em] text-emerald-700 uppercase mb-6 leading-none">{eyebrow}</div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1]">{title}</h1>
        {desc ? <p className="mt-8 max-w-3xl text-xl md:text-2xl text-stone-700 leading-relaxed font-medium">{desc}</p> : null}
      </div>
      {right ? <div className="md:shrink-0">{right}</div> : null}
    </div>
  );
}

function Card({ title, eyebrow, children, right }) {
  return (
    <section className="rounded-[2.5rem] border-2 border-stone-900/10 bg-white/75 backdrop-blur-xl p-8 md:p-12 shadow-2xl text-left transition-all duration-500 hover:shadow-emerald-600/5">
      <div className="flex items-start justify-between gap-6">
        <div>
          {eyebrow ? <div className="text-base font-black tracking-[0.25em] text-emerald-700 uppercase mb-6 leading-none">{eyebrow}</div> : null}
          {title ? <h2 className="text-3xl md:text-5xl font-black tracking-tight">{title}</h2> : null}
        </div>
        {right ? <div className="hidden md:block">{right}</div> : null}
      </div>
      <div className="mt-8 text-lg md:text-xl text-stone-700 leading-relaxed font-medium">{children}</div>
    </section>
  );
}

function Stat({ label, value, sub, dark = false }) {
  return (
    <div className={cx("rounded-[2rem] border-2 p-6 md:p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 text-left", dark ? "border-white/10 bg-white/5" : "border-stone-900/10 bg-white")}>
      <div className="flex items-baseline justify-between gap-4">
        <div className={cx("text-xs font-black tracking-[0.2em] uppercase", dark ? "text-white/60" : "text-stone-600")}>{label}</div>
        <div className={cx("text-3xl md:text-5xl font-black tracking-tighter", dark ? "text-white" : "text-stone-900")}>{value}</div>
      </div>
      {sub ? <div className={cx("mt-3 text-sm md:text-base font-bold tracking-tight opacity-70", dark ? "text-white" : "text-stone-600")}>{sub}</div> : null}
    </div>
  );
}

function PartnerMarquee() {
  return (
    <div className="group relative w-full overflow-hidden py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#F5F2EA] via-[#F5F2EA]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#F5F2EA] via-[#F5F2EA]/40 to-transparent" />
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((name, idx) => (
          <div key={`${name}-${idx}`} className="flex items-center px-14 text-sm md:text-base font-black tracking-[0.4em] text-stone-950 uppercase transition-colors duration-500 hover:text-emerald-700">{name}</div>
        ))}
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } } .animate-marquee { animation: marquee 25s linear infinite; }`}</style>
    </div>
  );
}

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    const onMouseMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      requestAnimationFrame(animate);
    };
    const onMouseEnter = () => {
      cursor.style.width = "60px"; cursor.style.height = "60px";
      cursor.style.borderColor = "#10B981"; cursor.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
    };
    const onMouseLeave = () => {
      cursor.style.width = "30px"; cursor.style.height = "30px";
      cursor.style.borderColor = "rgba(28, 25, 23, 0.4)"; cursor.style.backgroundColor = "transparent";
    };
    window.addEventListener("mousemove", onMouseMove);
    document.querySelectorAll("a, button, input, select, textarea").forEach(el => {
      el.addEventListener("mouseenter", onMouseEnter); el.addEventListener("mouseleave", onMouseLeave);
    });
    const raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMouseMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-stone-900/40 transition-[width,height,background-color,border-color] duration-300 hidden lg:block shadow-sm" />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 hidden lg:block" />
    </>
  );
}

function LiquidBackground() {
  const containerRef = useRef(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      const THREE = window.THREE;
      class TouchTexture {
        constructor() {
          this.size = 128; this.width = this.height = this.size;
          this.maxAge = 64; this.radius = 0.15 * this.size;
          this.speed = 1 / this.maxAge; this.trail = []; this.last = null;
          this.initTexture();
        }
        initTexture() {
          this.canvas = document.createElement("canvas");
          this.canvas.width = this.width; this.canvas.height = this.height;
          this.ctx = this.canvas.getContext("2d");
          this.ctx.fillStyle = "black"; this.ctx.fillRect(0, 0, this.width, this.height);
          this.texture = new THREE.Texture(this.canvas);
        }
        update() {
          this.ctx.fillStyle = "black"; this.ctx.fillRect(0, 0, this.width, this.height);
          for (let i = this.trail.length - 1; i >= 0; i--) {
            const point = this.trail[i];
            let f = point.force * this.speed * (1 - point.age / this.maxAge);
            point.x += point.vx * f; point.y += point.vy * f; point.age++;
            if (point.age > this.maxAge) { this.trail.splice(i, 1); } 
            else {
              const pos = { x: point.x * this.width, y: (1 - point.y) * this.height };
              let intensity = point.age < this.maxAge * 0.3 ? Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2)) : 1.0 - (point.age / this.maxAge);
              intensity *= point.force;
              let offset = this.size * 5;
              this.ctx.shadowOffsetX = this.ctx.shadowOffsetY = offset;
              this.ctx.shadowBlur = this.radius;
              this.ctx.shadowColor = `rgba(${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}, ${0.3 * intensity})`;
              this.ctx.beginPath(); this.ctx.fillStyle = "rgba(255,0,0,1)";
              this.ctx.arc(pos.x - offset, pos.y - offset, this.radius, 0, Math.PI * 2); this.ctx.fill();
            }
          }
          this.texture.needsUpdate = true;
        }
        addTouch(point) {
          if (this.last) {
            const dx = point.x - this.last.x, dy = point.y - this.last.y;
            if (dx === 0 && dy === 0) return;
            const dd = dx * dx + dy * dy;
            let d = Math.sqrt(dd);
            this.trail.push({ x: point.x, y: point.y, age: 0, force: Math.min(dd * 20000, 2.0), vx: dx / d, vy: dy / d });
          }
          this.last = { x: point.x, y: point.y };
        }
      }
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 50;
      const touchTexture = new TouchTexture();
      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uColor1: { value: new THREE.Vector3(0.062, 0.725, 0.505) }, 
        uColor2: { value: new THREE.Vector3(0.039, 0.055, 0.153) }, 
        uSpeed: { value: 1.5 }, uIntensity: { value: 2.2 }, uTouchTexture: { value: touchTexture.texture }, uGrainIntensity: { value: 0.06 },
        uDarkNavy: { value: new THREE.Vector3(0.039, 0.055, 0.153) }, uGradientSize: { value: 0.45 }, uGradientCount: { value: 12.0 },
        uColor1Weight: { value: 0.55 }, uColor2Weight: { value: 1.6 }
      };
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `
          uniform float uTime; uniform vec2 uResolution; uniform vec3 uColor1, uColor2, uDarkNavy;
          uniform float uSpeed, uIntensity, uGrainIntensity, uGradientSize, uColor1Weight, uColor2Weight;
          uniform sampler2D uTouchTexture; varying vec2 vUv;
          float grain(vec2 uv, float time) { vec2 grainUv = uv * uResolution * 0.5; return fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0; }
          vec3 getGradientColor(vec2 uv, float time) {
            float s = uSpeed; vec3 color = vec3(0.0);
            for(int i=0; i<12; i++) {
                float fi = float(i);
                vec2 c = vec2(0.5 + sin(time * s * (0.4 + fi * 0.02)) * 0.45, 0.5 + cos(time * s * (0.5 + fi * 0.03)) * 0.45);
                float inf = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c));
                color += ((i % 2 == 0) ? uColor1 : uColor2) * inf * (0.5 + 0.5 * sin(time * s * (0.8 + fi*0.1))) * ((i % 2 == 0) ? uColor1Weight : uColor2Weight);
            }
            color = clamp(color * uIntensity, 0.0, 1.0);
            return clamp(mix(uDarkNavy, color, max(length(color), 0.2)), 0.0, 1.0);
          }
          void main() {
            vec2 uv = vUv; vec4 touchTex = texture2D(uTouchTexture, uv);
            uv += vec2(-(touchTex.r * 2.0 - 1.0), -(touchTex.g * 2.0 - 1.0)) * 0.8 * touchTex.b;
            vec3 color = getGradientColor(uv, uTime); color += grain(uv, uTime) * uGrainIntensity;
            gl_FragColor = vec4(color, 1.0);
          }
        `
      });
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(120, 120, 1, 1), material));
      const clock = new THREE.Clock();
      const animate = () => { uniforms.uTime.value += clock.getDelta(); touchTexture.update(); renderer.render(scene, camera); requestAnimationFrame(animate); };
      animate();
      const handleMove = (e) => {
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) / window.innerWidth;
        const y = 1 - (e.clientY || (e.touches && e.touches[0].clientY)) / window.innerHeight;
        touchTexture.addTouch({ x, y });
      };
      window.addEventListener("mousemove", handleMove); window.addEventListener("touchmove", handleMove);
      window.addEventListener("resize", () => { renderer.setSize(window.innerWidth, window.innerHeight); camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); });
    };
    return () => { const s = document.querySelector('script[src*="three.min.js"]'); if (s) document.head.removeChild(s); };
  }, []);
  return <div ref={containerRef} className="fixed inset-0 -z-20 bg-stone-950" />;
}

function Grid() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="#1C1917" strokeWidth="1" /></pattern></defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <LiquidBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(28,25,23,0.03),transparent_70%)]" />
      <Grid />
    </div>
  );
}

function Input({ label, placeholder, type = "text" }) {
  return (
    <label className="block text-left">
      <div className="text-sm font-black tracking-widest text-stone-500 uppercase mb-3">{label}</div>
      <input type={type} placeholder={placeholder} className="w-full rounded-[1.25rem] border-2 border-stone-900/10 bg-white px-6 py-5 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all shadow-inner placeholder:text-stone-300" />
    </label>
  );
}

function Home() {
  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden rounded-[3rem] border-2 border-stone-900/15 bg-stone-950 p-8 md:p-24 shadow-2xl text-left">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.2]">
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "140px 140px" }} />
          </div>
        </div>
        <div className="relative mx-auto text-left max-w-5xl">
          <div className="inline-flex items-center gap-4 rounded-full border-2 border-white/10 bg-white/5 px-6 py-3 text-sm font-black tracking-[0.3em] text-emerald-400 shadow-2xl uppercase">Unified Conversion Systems</div>
          <h1 className="mt-12 text-5xl md:text-8xl font-black tracking-tighter leading-[1.05] text-white">Capture every opportunity.<br />Convert faster.<br /><span className="text-emerald-500">Scale predictably.</span></h1>
          <p className="mt-10 text-xl md:text-2xl text-white/60 leading-relaxed font-medium max-w-3xl">Our system ensures every lead is captured, sent to the right place, and nurtured until revenue growth becomes the standard outcome.</p>
          <div className="mt-14 flex flex-wrap gap-6">
            <Button href="#/get-started" variant="primary" size="large">GET STARTED</Button>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl">
          {[
            { l: "Intake", v: "24/7", s: "Continuous intake and routing" }, 
            { l: "Handling", v: "First", s: "First touch handling" }, 
            { l: "Outcomes", v: "Booked", s: "Booked outcomes" }, 
            { l: "Workload", v: "Reduced", s: "Manual workload reduced" }
          ].map((x) => (<Stat key={x.l} dark label={x.l} value={x.v} sub={x.s} />))}
        </div>
      </section>

      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white/70 backdrop-blur overflow-hidden shadow-2xl pt-14 pb-10 text-left">
        <div className="px-14">
          <div className="text-base font-black tracking-[0.4em] text-emerald-700 uppercase mb-8 leading-none text-left">TRUSTED BY INDUSTRY LEADERS</div>
        </div>
        <div className="mt-2">
          <PartnerMarquee />
        </div>
      </section>
    </div>
  );
}

function System() {
  const pillars = [
    {
      title: "ACCESS",
      subtitle: "24/7 call answer",
      eyebrow: "SPEED TO RESPONSE",
      happens: "Every call answered, qualified, and routed instantly.",
      get: "Complete contact record. Zero missed revenue.",
    },
    {
      title: "CONVERSION",
      subtitle: "Real-time booking",
      eyebrow: "INTENT REALIZED",
      happens: "Appointments scheduled on the call with instant calendar sync and confirmation.",
      get: "More appointments booked. No back-and-forth.",
    },
    {
      title: "INTAKE",
      subtitle: "Structured data capture",
      eyebrow: "RECORD INTEGRITY",
      happens: "Every lead logged with full details, source tracking, and priority scoring.",
      get: "Clean records. Sales-ready information.",
    },
    {
      title: "CONTINUITY",
      subtitle: "Automated follow-through",
      eyebrow: "LIFECYCLE PROTECTION",
      happens: "Appointment confirmations, SMS reminders, and follow-up sequences run automatically.",
      get: "Fewer no-shows. Higher repeat business.",
    },
  ];
  
  return (
    <div className="space-y-12">
      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-12 md:p-16 shadow-2xl text-left">
        <SectionHead eyebrow="SYSTEM" title="The System" desc="Four conversion pillars working as one system." right={<Button href="#/get-started" variant="primary">GET STARTED</Button>} />
      </section>

      <div className="grid gap-8 text-left">
        {pillars.map((pillar) => (
          <Card key={pillar.title} title={pillar.subtitle} eyebrow={pillar.eyebrow}>
            <div className="space-y-6">
              <div>
                <div className="text-sm font-black tracking-widest text-stone-950 mb-3 uppercase text-left">What happens</div>
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-medium">{pillar.happens}</p>
              </div>
              
              <div>
                <div className="text-sm font-black tracking-widest text-stone-950 mb-3 uppercase text-left">What you get</div>
                <p className="text-lg md:text-xl text-stone-900 font-black leading-relaxed">{pillar.get}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white p-12 md:p-16 shadow-2xl text-left">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mt-12">
            <Button href="#/get-started" variant="primary" size="large">Get Started</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function GetStarted() {
  const [formData, setFormData] = useState({ businessName: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-12">
        <section className="rounded-[3rem] border-2 border-emerald-600 bg-white/80 backdrop-blur-xl p-12 md:p-16 shadow-2xl text-left">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1] mb-6">Thank You</h1>
            <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-medium">We'll call you within one business day to configure your system.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-12 md:p-16 shadow-2xl text-left">
        <SectionHead eyebrow="GET STARTED" title="Get Started" desc="Two questions. 48 hours to launch." />
      </section>

      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white p-12 md:p-16 shadow-2xl text-left">
        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl text-left">
          <Input 
            label="Business name" 
            placeholder="Enter business name" 
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
          <Input 
            label="Primary phone" 
            placeholder="Enter primary phone" 
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          
          <button 
            type="submit"
            className="w-full rounded-[1.5rem] bg-emerald-600 px-12 py-6 text-base font-black tracking-[0.2em] text-white transition-all duration-500 hover:bg-emerald-700 hover:scale-[1.02] shadow-2xl uppercase"
          >
            START NOW
          </button>

          <p className="text-center text-sm text-stone-500 font-medium">
            We'll call you within one business day to configure your system.
          </p>
        </form>
      </section>
    </div>
  );
}

function Shell({ route, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = route === "/" || route === "";
  
  const active = (href) => {
    const r = href.replace(/^#/, "").toLowerCase();
    return route === r || (route === "/" && r === "/");
  };

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-stone-900 overflow-x-hidden selection:bg-emerald-600 selection:text-white">
      {isHome && <Background />}
      <CustomCursor />

      <header className="sticky top-0 z-50 border-b-2 border-stone-900/10 bg-[#F5F2EA]/85 backdrop-blur-2xl shadow-sm text-left">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-left">
          <a href="#/" className="flex items-center gap-4 group">
            <LogoPlaceholder className="h-10 w-10 md:h-14 md:w-14 shadow-2xl" />
            <div className="leading-none text-left">
              <div className="text-lg md:text-xl font-black tracking-tighter text-left">Social Following Studios</div>
              <div className="text-sm md:text-base font-black tracking-[0.2em] text-emerald-700 mt-1 uppercase text-left">Unified Conversion Systems</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1 text-left">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className={cx("rounded-2xl px-5 py-3 text-base md:text-lg font-black tracking-wide uppercase transition-all duration-300", active(item.href) ? "bg-stone-950 text-white shadow-2xl" : "text-white hover:text-stone-950 hover:bg-white/50")}>{item.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button href="#/get-started" variant="primary" size="default">GET STARTED</Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex items-center justify-center h-12 w-12 rounded-2xl bg-stone-950 text-white" aria-label="Toggle menu">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />)}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-stone-900/10 bg-[#F5F2EA]/95 backdrop-blur-2xl">
            <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-2">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className={cx("rounded-2xl px-5 py-4 text-lg font-black tracking-wide uppercase transition-all duration-300 text-center", active(item.href) ? "bg-stone-950 text-white shadow-2xl" : "text-white hover:text-stone-950 hover:bg-white/50")}>{item.label}</a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24 text-left">{children}</main>

      <footer className="border-t-2 border-stone-900/10 py-16 text-left">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 text-left">
            <div className="flex items-center gap-4 text-left">
              <LogoPlaceholder className="h-12 w-12 border-stone-900/20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
              <div className="text-left">
                <div className="text-xl font-black tracking-tighter text-left">Social Following Studios</div>
                <div className="text-sm md:text-base font-black tracking-[0.2em] text-emerald-700 uppercase mt-1 text-left">Unified Conversion Systems</div>
              </div>
            </div>
            <div className="flex items-center gap-10 text-sm font-black tracking-widest text-stone-500 uppercase">
              <a href="#" className="hover:text-stone-950 transition-colors">Terms</a>
              <a href="#" className="hover:text-stone-950 transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const route = useHashRoute();
  const page = useMemo(() => {
    switch (route) {
      case "/system": return <System />;
      case "/get-started": return <GetStarted />;
      default: return <Home />;
    }
  }, [route]);
  return <Shell route={route}>{page}</Shell>;
}
