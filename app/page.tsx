"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

/* ─── Pexels image URLs ─── */
const IMAGES = {
  hero: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
  chef: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
  philosophy: "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  dish1: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  dish2: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  dish3: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  dish4: "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  dish5: "https://images.pexels.com/photos/1860208/pexels-photo-1860208.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  dish6: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  gallery1: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  gallery2: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  gallery3: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  gallery4: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  reservation: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
};

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ─── Section Reveal wrapper ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Container helper ─── */
function Container({
  children,
  className = "",
  size = "default",
  style: extraStyle = {},
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
  style?: React.CSSProperties;
}) {
  const maxW =
    size === "wide"
      ? "1280px"
      : size === "narrow"
        ? "900px"
        : "1100px";
  return (
    <div
      className={className}
      style={{
        maxWidth: maxW,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "clamp(16px, 4vw, 24px)",
        paddingRight: "clamp(16px, 4vw, 24px)",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Menu data ─── */
const DISHES = [
  {
    img: IMAGES.dish1,
    title: "Oursin de Bretagne",
    desc: "Crème d'oursin, gelée d'agrumes yuzu, tuile de sarrasin noir et embruns iodés",
    tag: "Mise en bouche",
  },
  {
    img: IMAGES.dish2,
    title: "Langoustine Royale",
    desc: "Carpaccio de langoustine, caviar osciètre, vinaigrette au champagne et fleurs de capucine",
    tag: "Entrée froide",
  },
  {
    img: IMAGES.dish3,
    title: "Foie Gras de Canard",
    desc: "Poêlé au sauternes, chutney de figues rôties, pain d'épices toasté et réduction balsamique",
    tag: "Entrée chaude",
  },
  {
    img: IMAGES.dish4,
    title: "Turbot Sauvage",
    desc: "Rôti sur l'arête, sauce vin jaune, morilles farcies et émulsion de persil plat",
    tag: "Poisson",
  },
  {
    img: IMAGES.dish5,
    title: "Pigeon de Racan",
    desc: "En deux cuissons, jus corsé au cassis, céleri-rave en textures et truffe noire du Périgord",
    tag: "Viande",
  },
  {
    img: IMAGES.dish6,
    title: "Sphère au Chocolat Araguani",
    desc: "Cœur coulant praliné noisette, éclats de feuillantine, sorbet framboise et feuille d'or",
    tag: "Dessert",
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setParallaxY(window.scrollY * 0.35);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <main>
      {/* ─── NAVIGATION ─── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.7s ease",
          backgroundColor: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,169,110,0.15)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80px",
          }}
        >
          <a
            href="#"
            className="nav-logo"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.5rem",
              letterSpacing: "0.15em",
              color: "var(--color-cream)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            La table d&apos;Hugo
          </a>

          {/* Desktop nav links */}
          <div
            className="hidden md:flex"
            style={{
              alignItems: "center",
              gap: "40px",
              fontFamily: "var(--font-cormorant)",
              fontSize: "15px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {[
              ["Philosophie", "#philosophie"],
              ["La Carte", "#carte"],
              ["Galerie", "#galerie"],
              ["Réserver", "#reservation"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  color: "rgba(245,240,232,0.7)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop réserver button */}
          <a
            href="#reservation"
            className="hidden md:block"
            style={{
              border: "1px solid rgba(201,169,110,0.4)",
              color: "var(--color-gold)",
              padding: "10px 24px",
              fontSize: "12px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-cormorant)",
              transition: "all 0.5s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-gold)";
              e.currentTarget.style.color = "var(--color-deep-black)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--color-gold)";
            }}
          >
            Réserver
          </a>

          {/* Hamburger button (mobile only) */}
          <button
            className={`hamburger${menuOpen ? " active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(10, 10, 10, 0.98)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            style={{
              position: "absolute",
              top: "28px",
              right: "24px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <line x1="4" y1="4" x2="24" y2="24" stroke="#c9a96e" strokeWidth="1.5" />
              <line x1="24" y1="4" x2="4" y2="24" stroke="#c9a96e" strokeWidth="1.5" />
            </svg>
          </button>
          {[
            ["Philosophie", "#philosophie"],
            ["La Carte", "#carte"],
            ["Galerie", "#galerie"],
            ["Réserver", "#reservation"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--color-cream)",
                textDecoration: "none",
                fontSize: "1.5rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 300,
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      {/* ─── HERO: CINEMATIC IMMERSIVE ─── */}
      <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#000" }}>

        {/* ── Anamorphic letterbox bars ── */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: heroLoaded ? "10vh" : "50vh", background: "#000", zIndex: 30, pointerEvents: "none", transition: "height 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: heroLoaded ? "10vh" : "50vh", background: "#000", zIndex: 30, pointerEvents: "none", transition: "height 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)" }} />

        {/* ── Slow Ken Burns zoom on background ── */}
        <div
          style={{
            position: "absolute",
            inset: "-10%",
            transform: `translateY(${parallaxY}px)`,
            animation: heroLoaded ? "kenBurns 25s ease-in-out infinite alternate" : "none",
          }}
        >
          <Image src={IMAGES.hero} alt="Ambiance du restaurant La table d'Hugo" fill priority className="object-cover" sizes="100vw" />
          {/* Warm cinematic color grading */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(30, 15, 0, 0.15)", mixBlendMode: "multiply" }} />
        </div>

        {/* ── Cinematic overlays stack ── */}
        {/* Heavy vignette like a real lens */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.85) 100%)", zIndex: 5 }} />
        {/* Top-bottom darkness */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.85) 100%)", zIndex: 5 }} />
        {/* Side darkness - anamorphic feel */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.6) 100%)", zIndex: 5 }} />
        {/* Warm center glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 48%, rgba(201,169,110,0.07) 0%, transparent 70%)", zIndex: 6 }} />

        {/* ── Anamorphic lens flare ── */}
        <div style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120vw",
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, transparent 20%, rgba(201,169,110,0.03) 35%, rgba(201,169,110,0.12) 48%, rgba(245,230,200,0.2) 50%, rgba(201,169,110,0.12) 52%, rgba(201,169,110,0.03) 65%, transparent 80%, transparent 100%)",
          zIndex: 7,
          opacity: heroLoaded ? 1 : 0,
          transition: "opacity 3s ease 1.5s",
        }} />
        {/* Secondary flare streak */}
        <div style={{
          position: "absolute",
          top: "47%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "40px",
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
          zIndex: 7,
          filter: "blur(8px)",
          opacity: heroLoaded ? 1 : 0,
          transition: "opacity 4s ease 2s",
        }} />

        {/* ── Film grain on hero ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 8,
          opacity: 0.35,
          pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }} />

        {/* ── Hero content ── */}
        <div style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
          padding: "0 24px",
        }}>
          {/* Subtitle */}
          <div style={{
            transition: "all 2.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
            transitionDelay: "1.2s",
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
          }}>
            <p style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--color-gold)",
              fontSize: "clamp(10px, 2.5vw, 13px)",
              letterSpacing: "clamp(0.2em, 2vw, 0.6em)",
              textTransform: "uppercase",
              marginBottom: "28px",
              fontWeight: 400,
              textShadow: "0 0 30px rgba(201,169,110,0.3)",
            }}>
              Restaurant Gastronomique &mdash; Paris
            </p>
          </div>

          {/* Main title */}
          <h1 style={{
            fontFamily: "var(--font-playfair)",
            transition: "all 2.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
            transitionDelay: "0.8s",
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
          }}>
            <span style={{
              display: "block",
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              fontWeight: 300,
              letterSpacing: "0.12em",
              color: "var(--color-cream)",
              lineHeight: 0.9,
              textShadow: "0 0 80px rgba(201,169,110,0.15), 0 4px 20px rgba(0,0,0,0.5)",
            }}>
              La table d&apos;Hugo
            </span>
          </h1>

          {/* Gold divider line */}
          <div style={{
            width: "100px",
            height: "1px",
            margin: "36px 0",
            transition: "all 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
            transitionDelay: "1.6s",
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "scaleX(1)" : "scaleX(0)",
            background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
          }} />

          {/* Tagline */}
          <p style={{
            fontFamily: "var(--font-cormorant)",
            maxWidth: "520px",
            color: "rgba(245,240,232,0.55)",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.8,
            letterSpacing: "0.05em",
            transition: "all 2.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
            transitionDelay: "2s",
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}>
            &laquo; Là où chaque plat raconte une histoire,
            <br />
            chaque saveur devient un souvenir &raquo;
          </p>

          {/* Scroll indicator */}
          <div style={{
            position: "absolute",
            bottom: "13vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            transition: "all 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
            transitionDelay: "3s",
            opacity: heroLoaded ? 0.6 : 0,
          }}>
            <span style={{
              fontFamily: "var(--font-cormorant)",
              color: "rgba(245,240,232,0.35)",
              fontSize: "10px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
            }}>
              Découvrir
            </span>
            <div className="hero-scroll-line" style={{
              width: "1px",
              height: "50px",
              background: "linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)",
            }} />
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY SECTION ─── */}
      <section id="philosophie" style={{ padding: "clamp(80px, 12vw, 176px) 0", background: "#f7f3ec" }}>
        <Container size="wide">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "64px", alignItems: "center" }}>
            {/* Text */}
            <Reveal>
              <div>
                <p style={{ fontFamily: "var(--font-cormorant)", color: "#a07d4a", fontSize: "12px", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "24px" }}>
                  Notre Philosophie
                </p>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#2c2824", lineHeight: 1.2, marginBottom: "32px" }}>
                  L&apos;art de
                  <br />
                  <span style={{ fontStyle: "italic", color: "#a07d4a" }}>sublimer</span>
                  <br />
                  l&apos;éphémère
                </h2>
                <div style={{ width: "64px", height: "1px", background: "rgba(160,125,74,0.4)", marginBottom: "32px" }} />
                <p style={{ fontFamily: "var(--font-cormorant)", color: "#5a544c", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "24px", fontWeight: 400 }}>
                  Depuis 2012, le Chef Aurélien Marchand compose une cuisine
                  d&apos;auteur où chaque assiette est une ode aux terroirs
                  français. Formé dans les plus grandes maisons étoilées, il
                  puise son inspiration dans la nature, les saisons et
                  l&apos;inattendu.
                </p>
                <p style={{ fontFamily: "var(--font-cormorant)", color: "#5a544c", fontSize: "1.125rem", lineHeight: 1.7, fontWeight: 400 }}>
                  Chez La table d&apos;Hugo, la gastronomie n&apos;est pas un simple repas
                  — c&apos;est un voyage sensoriel. Nos producteurs, sélectionnés
                  avec une exigence absolue, sont les premiers artisans de cette
                  quête d&apos;excellence.
                </p>
              </div>
            </Reveal>

            {/* Chef image */}
            <Reveal delay={200}>
              <div style={{ position: "relative", paddingBottom: "48px" }}>
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                  <Image src={IMAGES.chef} alt="Chef Aurélien Marchand" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.6), transparent)" }} />
                </div>
                {/* Accent card */}
                <div style={{ position: "absolute", bottom: "-32px", left: "0", right: "0", background: "#fff", border: "1px solid rgba(160,125,74,0.2)", padding: "16px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", color: "#a07d4a", fontSize: "clamp(11px, 2.5vw, 14px)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    Chef Aurélien Marchand
                  </p>
                  <p style={{ fontFamily: "var(--font-cormorant)", color: "#8a8480", fontSize: "clamp(10px, 2vw, 12px)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "4px" }}>
                    2 étoiles Michelin
                  </p>
                </div>
                {/* Gold corner - hidden on small screens to avoid overflow */}
                <div className="hidden md:block" style={{ position: "absolute", top: "-12px", right: "-12px", width: "48px", height: "48px", borderTop: "1px solid rgba(201,169,110,0.3)", borderRight: "1px solid rgba(201,169,110,0.3)" }} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─── QUOTE DIVIDER ─── */}
      <section style={{ position: "relative", padding: "clamp(48px, 10vw, 96px) 0", background: "#eae4d9" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
          <Image src={IMAGES.philosophy} alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <Container size="narrow" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <Reveal>
            <div className="ornament" style={{ marginBottom: "32px" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z" fill="#c9a96e" />
              </svg>
            </div>
            <blockquote style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)", fontWeight: 300, fontStyle: "italic", color: "#2c2824", lineHeight: 1.5 }}>
              &laquo; La cuisine est un art éphémère. C&apos;est dans cette
              fugacité que réside toute sa beauté. &raquo;
            </blockquote>
            <p style={{ fontFamily: "var(--font-cormorant)", marginTop: "32px", color: "#a07d4a", fontSize: "14px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              — Aurélien Marchand
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ─── MENU / LA CARTE ─── */}
      <section id="carte" style={{ padding: "clamp(80px, 12vw, 176px) 0", background: "#f7f3ec" }}>
        <Container>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", color: "#a07d4a", fontSize: "12px", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "24px" }}>
                La Carte
              </p>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#2c2824" }}>
                Menu <span style={{ fontStyle: "italic" }}>Dégustation</span>
              </h2>
              <div style={{ width: "64px", height: "1px", background: "rgba(160,125,74,0.4)", margin: "32px auto 0" }} />
              <p style={{ fontFamily: "var(--font-cormorant)", marginTop: "24px", color: "#8a8480", fontSize: "14px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Menu en 7 services — 185€
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "32px 64px" }}>
            {DISHES.map((dish, i) => (
              <Reveal key={dish.title} delay={i * 100}>
                <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div className="dish-image-mobile" style={{ position: "relative", width: "100px", height: "100px", flexShrink: 0, overflow: "hidden" }}>
                    <Image src={dish.img} alt={dish.title} fill className="object-cover" sizes="100px" />
                  </div>
                  <div style={{ flex: 1, paddingTop: "4px" }}>
                    <p style={{ fontFamily: "var(--font-cormorant)", color: "#a07d4a", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "8px" }}>
                      {dish.tag}
                    </p>
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 300, color: "#2c2824", marginBottom: "8px" }}>
                      {dish.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-cormorant)", color: "#6a645c", fontSize: "14px", lineHeight: 1.6, fontWeight: 400 }}>
                      {dish.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <p style={{ fontFamily: "var(--font-cormorant)", textAlign: "center", marginTop: "80px", color: "#a09a92", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", fontStyle: "italic" }}>
              Menu végétal disponible sur demande — Allergènes communiqués en salle
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="galerie" style={{ padding: "clamp(80px, 10vw, 128px) 0", background: "#eae4d9" }}>
        <Container size="wide">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", color: "#a07d4a", fontSize: "12px", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "24px" }}>
                Galerie
              </p>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "#2c2824" }}>
                L&apos;univers <span style={{ fontStyle: "italic" }}>La table d&apos;Hugo</span>
              </h2>
            </div>
          </Reveal>

          <div className="gallery-grid">
            {[
              { src: IMAGES.gallery1, alt: "Intérieur du restaurant" },
              { src: IMAGES.gallery2, alt: "Salle de réception" },
              { src: IMAGES.gallery3, alt: "Détails de table" },
              { src: IMAGES.gallery4, alt: "Ambiance du bar" },
            ].map((img, i) => (
              <Reveal key={img.alt} delay={i * 150}>
                <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "200px", overflow: "hidden" }}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-[1200ms]" sizes="(max-width: 768px) 100vw, 25vw" />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", transition: "background 0.7s" }} className="hover:bg-transparent" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── RESERVATION CTA ─── */}
      <section id="reservation" style={{ position: "relative", padding: "clamp(100px, 15vw, 208px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src={IMAGES.reservation} alt="Ambiance de soirée" fill className="object-cover" sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>
          <Container size="narrow">
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <div className="ornament" style={{ marginBottom: "32px" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z" fill="#c9a96e" />
                  </svg>
                </div>
                <p style={{ fontFamily: "var(--font-cormorant)", color: "var(--color-gold)", fontSize: "12px", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "24px" }}>
                  Réservation
                </p>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "var(--color-cream)", marginBottom: "24px" }}>
                  Vivez <span style={{ fontStyle: "italic" }}>l&apos;expérience</span>
                </h2>
                <p style={{ fontFamily: "var(--font-cormorant)", color: "rgba(245,240,232,0.5)", fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.7, marginBottom: "48px", fontWeight: 300 }}>
                  Nous vous accueillons du mardi au samedi, pour le déjeuner et le
                  dîner. Chaque service est limité à 24 couverts afin de préserver
                  l&apos;intimité de votre expérience.
                </p>
                <div className="cta-buttons" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px" }}>
                  <a
                    href="tel:+33142861234"
                    style={{ border: "1px solid var(--color-gold)", color: "var(--color-gold)", padding: "16px 32px", fontSize: "clamp(12px, 2.5vw, 14px)", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", fontFamily: "var(--font-playfair)", transition: "all 0.5s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-gold)"; e.currentTarget.style.color = "var(--color-deep-black)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-gold)"; }}
                  >
                    +33 1 42 86 12 34
                  </a>
                  <a
                    href="#"
                    style={{ background: "var(--color-gold)", color: "var(--color-deep-black)", padding: "16px 32px", fontSize: "clamp(12px, 2.5vw, 14px)", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", fontFamily: "var(--font-cormorant)", transition: "all 0.5s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-gold-light)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-gold)"; }}
                  >
                    Réserver en ligne
                  </a>
                </div>
              </div>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "var(--color-deep-black)", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <Container size="wide">
          <div style={{ padding: "clamp(48px, 8vw, 80px) 0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "48px" }}>
              {/* Brand */}
              <div>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", letterSpacing: "0.15em", color: "var(--color-cream)", textTransform: "uppercase", marginBottom: "24px" }}>
                  La table d&apos;Hugo
                </h3>
                <p style={{ fontFamily: "var(--font-cormorant)", color: "rgba(245,240,232,0.4)", fontSize: "14px", lineHeight: 1.7, fontWeight: 300 }}>
                  Restaurant gastronomique
                  <br />
                  2 étoiles au Guide Michelin
                  <br />
                  <span style={{ color: "rgba(201,169,110,0.6)" }}>
                    Membre des Grandes Tables du Monde
                  </span>
                </p>
              </div>

              {/* Address */}
              <div>
                <p style={{ fontFamily: "var(--font-cormorant)", color: "var(--color-gold)", fontSize: "12px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "24px" }}>
                  Nous trouver
                </p>
                <address style={{ fontFamily: "var(--font-cormorant)", fontStyle: "normal", color: "rgba(245,240,232,0.4)", fontSize: "14px", lineHeight: 1.7, fontWeight: 300 }}>
                  17, rue de Varenne
                  <br />
                  75007 Paris, France
                  <br />
                  <br />
                  Mardi — Samedi
                  <br />
                  Déjeuner : 12h00 — 14h00
                  <br />
                  Dîner : 19h30 — 22h00
                </address>
              </div>

              {/* Contact */}
              <div>
                <p style={{ fontFamily: "var(--font-cormorant)", color: "var(--color-gold)", fontSize: "12px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "24px" }}>
                  Contact
                </p>
                <div style={{ fontFamily: "var(--font-cormorant)", color: "rgba(245,240,232,0.4)", fontSize: "14px", lineHeight: 2, fontWeight: 300 }}>
                  <p><a href="tel:+33142861234" style={{ color: "inherit", textDecoration: "none" }}>+33 1 42 86 12 34</a></p>
                  <p><a href="mailto:contact@lessence-paris.fr" style={{ color: "inherit", textDecoration: "none" }}>contact@lessence-paris.fr</a></p>
                  <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
                    {["Instagram", "Facebook"].map((social) => (
                      <a key={social} href="#" style={{ color: "rgba(245,240,232,0.3)", textDecoration: "none", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", transition: "color 0.3s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.3)")}
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-bottom" style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid rgba(201,169,110,0.05)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", color: "rgba(245,240,232,0.2)", fontSize: "12px", letterSpacing: "0.2em" }}>
                &copy; 2024 La table d&apos;Hugo — Tous droits réservés
              </p>
              <p style={{ fontFamily: "var(--font-cormorant)", color: "rgba(245,240,232,0.2)", fontSize: "12px", letterSpacing: "0.2em", fontStyle: "italic" }}>
                Conçu avec passion à Paris
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
