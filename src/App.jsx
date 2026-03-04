// ════════════════════════════════════════════════════════════════════════════════
// GSART — GALERÍA DE ARTE DE LUJO
// Estética morada oscura · Logo real · Boutique exclusiva
// ════════════════════════════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pfobnflqiftrzqiwjvlm.supabase.co",
  "sb_publishable_Mz4024bbvfBF19TYSYi-_w_eL7AFZXt"
);

const SAMPLE_PRODUCTS = [
  { id: "1", name: "Abstracción Nocturna", description: "Óleo sobre lienzo. Serie limitada del artista emergente Marcos Vidal.", price: 1200, stock: 3, category: "Óleo", images: [], is_boutique: false, active: true },
  { id: "2", name: "Geometría del Alma", description: "Acrílico sobre madera. Colección 'Formas Interiores' de Elena Ruiz.", price: 850, stock: 5, category: "Acrílico", images: [], is_boutique: false, active: true },
  { id: "3", name: "Fragmentos de Luz", description: "Técnica mixta sobre papel de algodón. Serie exclusiva de 10 piezas.", price: 650, stock: 8, category: "Técnica Mixta", images: [], is_boutique: false, active: true },
  { id: "4", name: "Retrato del Silencio", description: "Carboncillo y plata en polvo sobre lienzo belga.", price: 2100, stock: 2, category: "Dibujo", images: [], is_boutique: false, active: true },
  { id: "5", name: "Colección Éter — Pieza I", description: "Óleo y pigmentos violeta sobre lienzo. Solo para miembros seleccionados.", price: 4500, stock: 1, category: "Boutique", images: [], is_boutique: true, active: true },
  { id: "6", name: "Colección Éter — Pieza II", description: "Acrílico morado y pigmentos naturales. Edición única.", price: 3800, stock: 1, category: "Boutique", images: [], is_boutique: true, active: true },
];

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --black:   #060608;
      --dark:    #0e0d14;
      --dark2:   #16141f;
      --dark3:   #1e1b2a;
      --border:  rgba(155,79,204,0.15);
      --border2: rgba(155,79,204,0.3);
      --text:    #e8e2f0;
      --text2:   #8a7fa0;
      --purple:  #9b4fcc;
      --purple2: #bf7ef0;
      --purple3: #6b2fa0;
      --purple-glow: rgba(155,79,204,0.2);
      --red:     #c0392b;
      --green:   #27ae60;
      --white:   #f0ecf8;
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Montserrat', sans-serif;
      background: var(--black);
      color: var(--text);
      font-size: 13px;
      line-height: 1.7;
      letter-spacing: 0.02em;
      min-height: 100vh;
    }
    button { font-family: inherit; cursor: pointer; border: none; outline: none; }
    input, textarea, select { font-family: inherit; outline: none; }
    a { text-decoration: none; color: inherit; }
    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--purple); border-radius: 2px; }
    .fade-in { animation: fadeIn 0.6s ease forwards; }
    .slide-up { animation: slideUp 0.5s ease forwards; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes glow { 0%,100% { filter: drop-shadow(0 0 8px rgba(155,79,204,0.6)); } 50% { filter: drop-shadow(0 0 22px rgba(155,79,204,1)); } }
    .logo-glow { animation: glow 3s ease-in-out infinite; }
    .purple-shimmer {
      background: linear-gradient(90deg, #6b2fa0 0%, #bf7ef0 40%, #9b4fcc 60%, #6b2fa0 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.5;
    }
  `}</style>
);

const Btn = ({ children, variant = "purple", size = "md", onClick, style = {}, disabled }) => {
  const v = {
    purple:  { background: "linear-gradient(135deg, #6b2fa0, #9b4fcc)", color: "#f0ecf8", border: "none" },
    outline: { background: "transparent", color: "var(--purple2)", border: "1px solid var(--purple)" },
    ghost:   { background: "transparent", color: "var(--text2)", border: "1px solid var(--border)" },
    dark:    { background: "var(--dark2)", color: "var(--text)", border: "1px solid var(--border2)" },
    danger:  { background: "transparent", color: "var(--red)", border: "1px solid rgba(192,57,43,0.4)" },
    green:   { background: "transparent", color: "var(--green)", border: "1px solid rgba(39,174,96,0.4)" },
  };
  const s = {
    sm: { padding: "6px 14px", fontSize: 10, letterSpacing: "0.12em" },
    md: { padding: "10px 24px", fontSize: 11, letterSpacing: "0.15em" },
    lg: { padding: "14px 36px", fontSize: 11, letterSpacing: "0.2em", width: "100%", justifyContent: "center" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...v[variant], ...s[size], borderRadius: 0, fontWeight: 500,
      textTransform: "uppercase", transition: "all 0.3s ease",
      opacity: disabled ? 0.4 : 1, display: "inline-flex", alignItems: "center", gap: 8, ...style
    }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = "0.8"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
    >{children}</button>
  );
};

const Input = ({ label, error, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text2)" }}>{label}</label>}
    <input {...props} style={{
      padding: "12px 0", borderRadius: 0, border: "none",
      borderBottom: `1px solid ${error ? "var(--red)" : "var(--border2)"}`,
      background: "transparent", color: "var(--text)", fontSize: 13,
      transition: "border-color 0.3s", ...props.style
    }}
      onFocus={e => e.target.style.borderBottomColor = "var(--purple2)"}
      onBlur={e => e.target.style.borderBottomColor = error ? "var(--red)" : "var(--border2)"}
    />
    {error && <span style={{ fontSize: 10, color: "var(--red)" }}>{error}</span>}
  </div>
);

const ArtworkPlaceholder = ({ name, category, isBoutique, size = "md" }) => {
  const sizes = { sm: 160, md: 300, lg: 460 };
  const h = sizes[size];
  const patterns = [
    "radial-gradient(ellipse at 30% 70%, #1a0a2e 0%, #060608 60%)",
    "radial-gradient(ellipse at 70% 30%, #2a0a3a 0%, #060608 60%)",
    "linear-gradient(135deg, #0e0820 0%, #060608 50%, #1a0a2e 100%)",
    "radial-gradient(circle at 50% 50%, #1a1028 0%, #060608 70%)",
  ];
  const pattern = patterns[name.length % patterns.length];
  return (
    <div style={{ width: "100%", height: h, background: pattern, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", border: "1px solid var(--border)" }}>
      {isBoutique && (
        <div style={{ position: "absolute", top: 12, right: 12, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--purple2)", border: "1px solid var(--purple)", padding: "3px 8px" }}>
          Exclusivo
        </div>
      )}
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: size === "lg" ? 26 : 18, fontStyle: "italic", color: "rgba(155,79,204,0.35)", textAlign: "center", padding: "0 20px" }}>{name}</div>
      <div style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(138,127,160,0.4)", marginTop: 12 }}>{category}</div>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(155,79,204,0.05) 0%, transparent 70%)" }} />
    </div>
  );
};

const Navbar = ({ user, cartCount, onCart, onAuth, onLogout, onAdmin, onBoutique, currentPage, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const isAdmin = user?.user_metadata?.role === "admin" || user?.email === "sebastianjhossep@gmail.com";;
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "14px 48px" : "24px 48px",
      background: scrolled ? "rgba(6,6,8,0.96)" : "transparent",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.4s ease", backdropFilter: scrolled ? "blur(20px)" : "none"
    }}>
      <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
        <img src="/gsartLOGO.png" alt="GSART" className="logo-glow" style={{ height: 44, width: 44, objectFit: "contain" }} />
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, letterSpacing: "0.3em", color: "var(--purple2)" }}>GSART</div>
          <div style={{ fontSize: 7, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--text2)", marginTop: -3 }}>Galería de Arte</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {[["Colección","collection"],["Artistas","artists"],["Boutique","boutique"]].map(([label, pg]) => (
          <button key={pg} onClick={() => pg === "boutique" ? onBoutique() : setPage(pg)} style={{
            background: "none", border: "none", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase",
            color: currentPage === pg ? "var(--purple2)" : "var(--text2)", cursor: "pointer", transition: "color 0.3s", padding: 0,
            borderBottom: pg === "boutique" ? "1px solid var(--purple)" : "none", paddingBottom: pg === "boutique" ? 2 : 0
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--purple2)"}
            onMouseLeave={e => e.currentTarget.style.color = currentPage === pg ? "var(--purple2)" : "var(--text2)"}
          >{label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {isAdmin && <button onClick={onAdmin} style={{ background: "none", border: "none", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--purple2)", cursor: "pointer" }}>Admin</button>}
        {user ? (
          <button onClick={onLogout} style={{ background: "none", border: "none", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text2)", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--purple2)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text2)"}
          >Salir</button>
        ) : (
          <button onClick={onAuth} style={{ background: "none", border: "none", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text2)", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--purple2)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text2)"}
          >Acceder</button>
        )}
        <button onClick={onCart} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", position: "relative", fontSize: 16 }}>
          ◻
          {cartCount > 0 && <span style={{ position: "absolute", top: -6, right: -8, width: 14, height: 14, borderRadius: "50%", background: "var(--purple)", color: "white", fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ setPage, onBoutique}) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", textAlign: "center", padding: "0 40px" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, #1a0a2e 0%, #060608 70%)" }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(155,79,204,0.03) 60px, rgba(155,79,204,0.03) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(155,79,204,0.03) 60px, rgba(155,79,204,0.03) 61px)" }} />
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(155,79,204,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
    <div style={{ position: "relative", zIndex: 1 }} className="fade-in">
      <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
        <img src="/gsartLOGO.png" alt="GSART" className="logo-glow" style={{ height: 100, width: 100, objectFit: "contain" }} />
      </div>
      <div style={{ fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 24 }}>Colecciones Exclusivas · Arte de Lujo</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(56px, 10vw, 120px)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: 40, color: "var(--white)" }}>
        Arte que<br /><em className="purple-shimmer" style={{ fontStyle: "italic" }}>transciende</em>
      </h1>
      <p style={{ maxWidth: 480, margin: "0 auto 48px", color: "var(--text2)", fontSize: 14, fontWeight: 300, lineHeight: 1.9, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
        Cuadros únicos de artistas emergentes. Cada obra es una conversación entre el artista y el coleccionista.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <Btn onClick={() => setPage("collection")} size="lg" style={{ width: "auto" }}>Explorar Colección</Btn>
        <Btn variant="outline" onClick={() => onBoutique()} size="lg" style={{ width: "auto" }}>Acceder a Boutique</Btn>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--text2)" }}>Descubrir</div>
      <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--purple), transparent)" }} />
    </div>
  </div>
);

const ProductCard = ({ product, onAddToCart, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", transition: "transform 0.4s ease", transform: hovered ? "translateY(-8px)" : "translateY(0)" }}>
      <div onClick={onClick} style={{ position: "relative", marginBottom: 20, overflow: "hidden" }}>
        <ArtworkPlaceholder name={product.name} category={product.category} isBoutique={product.is_boutique} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(6,6,8,0.7)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--purple2)", borderBottom: "1px solid var(--purple2)", paddingBottom: 4 }}>Ver obra</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 400, marginBottom: 4, color: "var(--white)" }}>{product.name}</div>
          <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text2)" }}>{product.category}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "var(--purple2)" }}>{product.price.toLocaleString("es-ES")} €</div>
          <div style={{ fontSize: 9, color: "var(--text2)", marginTop: 2 }}>{product.stock} disponible{product.stock !== 1 ? "s" : ""}</div>
        </div>
      </div>
      <button onClick={() => onAddToCart(product)} style={{
        marginTop: 16, width: "100%", padding: "10px", background: "transparent",
        border: "1px solid var(--border2)", color: "var(--text2)", fontSize: 9, letterSpacing: "0.2em",
        textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s"
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--purple)"; e.currentTarget.style.color = "var(--purple2)"; e.currentTarget.style.background = "var(--purple-glow)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.background = "transparent"; }}
      >Añadir al carrito</button>
    </div>
  );
};

const CollectionPage = ({ products, onAddToCart, onProductClick }) => {
  const [filter, setFilter] = useState("Todos");
  const categories = ["Todos", ...new Set(products.filter(p => !p.is_boutique).map(p => p.category))];
  const filtered = products.filter(p => !p.is_boutique && p.active && (filter === "Todos" || p.category === filter));
  return (
    <div style={{ padding: "120px 48px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 16 }}>Catálogo</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: "var(--white)", marginBottom: 40 }}>La Colección</h2>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                background: "none", border: "none", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                cursor: "pointer", padding: "0 0 6px", color: filter === cat ? "var(--purple2)" : "var(--text2)",
                borderBottom: filter === cat ? "1px solid var(--purple)" : "1px solid transparent", transition: "all 0.3s"
              }}>{cat}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 48 }}>
          {filtered.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onClick={() => onProductClick(p)} />)}
        </div>
      </div>
    </div>
  );
};

const BoutiqueModal = ({ onClose, onAccess, products }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    const { data, error: err } = await supabase.from("boutique_codes").select("*").eq("code", code.toUpperCase().trim()).eq("used", false).single();
    if (err || !data) { setError("Código inválido o ya utilizado"); setLoading(false); return; }
    await supabase.from("boutique_codes").update({ used: true, used_at: new Date().toISOString() }).eq("id", data.id);
    setUnlocked(true); setLoading(false);
  };

  const boutiqueProducts = products.filter(p => p.is_boutique && p.active);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,6,8,0.97)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="slide-up" style={{ background: "var(--dark)", border: "1px solid var(--border2)", width: "100%", maxWidth: unlocked ? 900 : 480, maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
        {!unlocked ? (
          <div style={{ padding: 60, textAlign: "center" }}>
            <img src="/gsartLOGO.png" alt="GSART" className="logo-glow" style={{ height: 70, marginBottom: 28 }} />
            <div style={{ fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 16 }}>Acceso Exclusivo</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: "var(--white)", marginBottom: 8 }}>La Boutique</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--text2)", fontSize: 15, marginBottom: 48, lineHeight: 1.8 }}>
              Un espacio reservado para coleccionistas seleccionados.<br />Introduce tu código de acceso para descubrir piezas únicas.
            </p>
            <div style={{ maxWidth: 280, margin: "0 auto 32px" }}>
              <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} onKeyDown={e => e.key === "Enter" && handleSubmit()} placeholder="CÓDIGO DE ACCESO"
                style={{ width: "100%", padding: "16px 0", background: "transparent", border: "none", borderBottom: "1px solid var(--border2)", color: "var(--purple2)", fontSize: 18, letterSpacing: "0.4em", textAlign: "center" }}
                onFocus={e => e.target.style.borderBottomColor = "var(--purple2)"}
              />
            </div>
            {error && <div style={{ fontSize: 11, color: "var(--red)", marginBottom: 24 }}>{error}</div>}
            <Btn onClick={handleSubmit} disabled={loading || !code.trim()} size="lg" style={{ width: "auto", margin: "0 auto" }}>
              {loading ? "Verificando..." : "Acceder"}
            </Btn>
            <div style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid var(--border)", fontSize: 10, color: "var(--text2)" }}>
              ¿No tienes código? Contacta con nosotros para ser invitado.
            </div>
          </div>
        ) : (
          <div style={{ padding: 48 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 16 }}>Acceso Concedido</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: "var(--white)" }}>Colección Éter</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--text2)", fontSize: 15, marginTop: 12 }}>Obras únicas disponibles exclusivamente para usted</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 40 }}>
              {boutiqueProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={(prod) => { onAccess(prod); onClose(); }} onClick={() => {}} />)}
            </div>
          </div>
        )}
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "var(--text2)", fontSize: 24, cursor: "pointer" }}>×</button>
      </div>
    </div>
  );
};

const CartDrawer = ({ cart, onClose, onRemove, onCheckout, user, onAuth }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(6,6,8,0.8)" }} onClick={onClose} />
      <div className="slide-up" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100%", maxWidth: 480, background: "var(--dark)", borderLeft: "1px solid var(--border2)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "32px 40px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 4 }}>Tu selección</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300 }}>Carrito</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: 24, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 40px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text2)" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic" }}>Tu carrito está vacío</div>
            </div>
          ) : cart.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 9, color: "var(--text2)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{item.category}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "var(--purple2)" }}>{(item.price * item.qty).toLocaleString("es-ES")} €</div>
                  <button onClick={() => onRemove(i)} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: 11, cursor: "pointer", textDecoration: "underline" }}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: "24px 40px 40px", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text2)" }}>Total</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "var(--purple2)" }}>{total.toLocaleString("es-ES")} €</span>
            </div>
            {user ? <Btn size="lg" onClick={onCheckout}>Proceder al pago</Btn> : (
              <div>
                <Btn size="lg" onClick={onAuth}>Acceder para comprar</Btn>
                <div style={{ fontSize: 10, color: "var(--text2)", textAlign: "center", marginTop: 12 }}>Necesitas una cuenta para finalizar tu compra</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CheckoutModal = ({ cart, user, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ street: "", city: "", zip: "", country: "España" });
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOrder = async () => {
    setLoading(true);
    const { data: order } = await supabase.from("orders").insert({
      user_id: user.id, status: "pending", total,
      payment_method: payMethod, payment_status: "paid", shipping_address: address
    }).select().single();
    if (order) {
      await supabase.from("order_items").insert(
        cart.map(item => ({ order_id: order.id, product_id: item.id, product_name: item.name, quantity: item.qty, price: item.price }))
      );
    }
    setLoading(false); setStep(3);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,6,8,0.97)", zIndex: 600, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="slide-up" style={{ background: "var(--dark)", border: "1px solid var(--border2)", width: "100%", maxWidth: 560, padding: 48, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "var(--text2)", fontSize: 24, cursor: "pointer" }}>×</button>
        {step === 1 && (
          <>
            <div style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 24 }}>Paso 1 de 2</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, marginBottom: 36 }}>Dirección de envío</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Input label="Dirección" value={address.street} onChange={e => setAddress(a => ({ ...a, street: e.target.value }))} placeholder="Calle y número" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Input label="Ciudad" value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} placeholder="Madrid" />
                <Input label="Código postal" value={address.zip} onChange={e => setAddress(a => ({ ...a, zip: e.target.value }))} placeholder="28001" />
              </div>
              <Input label="País" value={address.country} onChange={e => setAddress(a => ({ ...a, country: e.target.value }))} />
            </div>
            <Btn size="lg" onClick={() => setStep(2)} style={{ marginTop: 36 }} disabled={!address.street || !address.city || !address.zip}>Continuar al pago</Btn>
          </>
        )}
        {step === 2 && (
          <>
            <div style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 24 }}>Paso 2 de 2</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, marginBottom: 36 }}>Método de pago</h3>
            <div style={{ display: "flex", gap: 16, marginBottom: 36 }}>
              {[["stripe","💳 Tarjeta"],["paypal","🅿 PayPal"]].map(([id, label]) => (
                <button key={id} onClick={() => setPayMethod(id)} style={{
                  flex: 1, padding: "16px", background: "transparent", cursor: "pointer",
                  border: `1px solid ${payMethod === id ? "var(--purple)" : "var(--border)"}`,
                  color: payMethod === id ? "var(--purple2)" : "var(--text2)", fontSize: 12, transition: "all 0.3s"
                }}>{label}</button>
              ))}
            </div>
            <div style={{ padding: "20px", background: "var(--dark2)", marginBottom: 32 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text2)", marginBottom: 16 }}>Resumen</div>
              {cart.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>{item.name}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "var(--purple2)" }}>{(item.price * item.qty).toLocaleString("es-ES")} €</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--purple2)" }}>{total.toLocaleString("es-ES")} €</span>
              </div>
            </div>
            <Btn size="lg" onClick={handleOrder} disabled={loading}>{loading ? "Procesando..." : `Confirmar — ${total.toLocaleString("es-ES")} €`}</Btn>
            <div style={{ fontSize: 9, color: "var(--text2)", textAlign: "center", marginTop: 16 }}>🔒 Pago seguro y encriptado</div>
          </>
        )}
        {step === 3 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <img src="/gsartLOGO.png" alt="GSART" className="logo-glow" style={{ height: 60, marginBottom: 24 }} />
            <div style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 16 }}>Pedido confirmado</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, marginBottom: 16 }}>Gracias por su confianza</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--text2)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
              Su obra será preparada con el mayor cuidado y enviada en los próximos días.
            </p>
            <Btn onClick={() => { onSuccess(); onClose(); }}>Volver a la galería</Btn>
          </div>
        )}
      </div>
    </div>
  );
};

const AuthModal = ({ onClose, onAuth }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError(""); setSuccess("");
    if (!email || !password) { setError("Completa todos los campos"); return; }
    setLoading(true);
    if (mode === "login") {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError("Email o contraseña incorrectos");
      else { onAuth(data.user); onClose(); }
    } else {
      if (!name) { setError("Escribe tu nombre"); setLoading(false); return; }
      const { error: err } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      if (err) setError(err.message);
      else setSuccess("¡Cuenta creada! Ya puedes iniciar sesión.");
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,6,8,0.97)", zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="slide-up" style={{ background: "var(--dark)", border: "1px solid var(--border2)", width: "100%", maxWidth: 440, padding: 56, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "var(--text2)", fontSize: 24, cursor: "pointer" }}>×</button>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 8 }}>
            <img src="/gsartLOGO.png" alt="GSART" className="logo-glow" style={{ height: 40, width: 40, objectFit: "contain" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: "var(--purple2)" }}>GSART</span>
          </div>
          <div style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--text2)" }}>
            {mode === "login" ? "Bienvenido de nuevo" : "Únete a la galería"}
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: 36, borderBottom: "1px solid var(--border)" }}>
          {[["login","Acceder"],["register","Registrarse"]].map(([m, l]) => (
            <button key={m} onClick={() => { setMode(m); setError(""); setSuccess(""); }} style={{
              flex: 1, padding: "12px", background: "none", border: "none", fontSize: 9,
              letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer",
              color: mode === m ? "var(--purple2)" : "var(--text2)",
              borderBottom: mode === m ? "1px solid var(--purple)" : "none", marginBottom: -1, transition: "color 0.3s"
            }}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {mode === "register" && <Input label="Nombre" type="text" placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} />}
          <Input label="Email" type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Contraseña" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div style={{ fontSize: 11, color: "var(--red)" }}>{error}</div>}
          {success && <div style={{ fontSize: 11, color: "var(--green)" }}>{success}</div>}
          <Btn size="lg" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8 }}>
            {loading ? "..." : mode === "login" ? "Acceder" : "Crear cuenta"}
          </Btn>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = ({ onClose }) => {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [codes, setCodes] = useState([]);
  const [newCode, setNewCode] = useState("");
  const [newCodeEmail, setNewCodeEmail] = useState("");
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", stock: "", category: "", is_boutique: false });

  useEffect(() => {
    supabase.from("products").select("*").order("created_at", { ascending: false }).then(({ data }) => { if (data) setProducts(data); });
    supabase.from("orders").select("*").order("created_at", { ascending: false }).then(({ data }) => { if (data) setOrders(data); });
    supabase.from("boutique_codes").select("*").order("created_at", { ascending: false }).then(({ data }) => { if (data) setCodes(data); });
  }, []);

  const generateCode = () => "GSART-" + Array.from({ length: 8 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]).join("");

  const createCode = async () => {
    const code = newCode || generateCode();
    const { data } = await supabase.from("boutique_codes").insert({ code, email: newCodeEmail || null }).select().single();
    if (data) { setCodes(prev => [data, ...prev]); setNewCode(""); setNewCodeEmail(""); }
  };

  const createProduct = async () => {
    const { data } = await supabase.from("products").insert({
      ...newProduct, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock), images: []
    }).select().single();
    if (data) { setProducts(prev => [data, ...prev]); setShowNewProduct(false); setNewProduct({ name: "", description: "", price: "", stock: "", category: "", is_boutique: false }); }
  };

  const toggleActive = async (product) => {
    const { data } = await supabase.from("products").update({ active: !product.active }).eq("id", product.id).select().single();
    if (data) setProducts(prev => prev.map(p => p.id === product.id ? data : p));
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,6,8,0.99)", zIndex: 800, overflowY: "auto" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src="/gsartLOGO.png" alt="GSART" style={{ height: 48, opacity: 0.9 }} />
            <div>
              <div style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 4 }}>Panel de gestión</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300 }}>Administrador GSART</h2>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "1px solid var(--border)", color: "var(--text2)", padding: "8px 20px", cursor: "pointer", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>Cerrar</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 48 }}>
          {[["Productos", products.length],["Pedidos", orders.length],["Códigos", codes.length],["Ingresos", `${orders.reduce((s, o) => s + (o.total || 0), 0).toLocaleString("es-ES")} €`]].map(([label, value]) => (
            <div key={label} style={{ padding: "24px", background: "var(--dark)", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text2)", marginBottom: 8 }}>{label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: "var(--purple2)" }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 40 }}>
          {[["products","Productos"],["orders","Pedidos"],["codes","Códigos Boutique"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "12px 24px", background: "none", border: "none", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", color: tab === t ? "var(--purple2)" : "var(--text2)", borderBottom: tab === t ? "1px solid var(--purple)" : "none", marginBottom: -1, transition: "color 0.3s" }}>{l}</button>
          ))}
        </div>

        {tab === "products" && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
              <Btn onClick={() => setShowNewProduct(!showNewProduct)}>+ Nuevo producto</Btn>
            </div>
            {showNewProduct && (
              <div style={{ background: "var(--dark)", border: "1px solid var(--border2)", padding: 32, marginBottom: 32 }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, marginBottom: 24 }}>Nuevo producto</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <Input label="Nombre" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} />
                  <Input label="Categoría" value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} />
                  <Input label="Precio (€)" type="number" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} />
                  <Input label="Stock" type="number" value={newProduct.stock} onChange={e => setNewProduct(p => ({ ...p, stock: e.target.value }))} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <Input label="Descripción" value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} />
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 24 }}>
                  <input type="checkbox" checked={newProduct.is_boutique} onChange={e => setNewProduct(p => ({ ...p, is_boutique: e.target.checked }))} />
                  <span style={{ fontSize: 10, color: "var(--purple2)" }}>Producto exclusivo de Boutique</span>
                </label>
                <Btn onClick={createProduct} disabled={!newProduct.name || !newProduct.price}>Crear producto</Btn>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {products.map(p => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "var(--dark)", border: "1px solid var(--border)", opacity: p.active ? 1 : 0.4 }}>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18 }}>{p.name}</div>
                    <div style={{ fontSize: 9, color: "var(--text2)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>
                      {p.category} · {p.price?.toLocaleString("es-ES")} € · Stock: {p.stock}
                      {p.is_boutique && <span style={{ color: "var(--purple2)", marginLeft: 8 }}>✦ Boutique</span>}
                    </div>
                  </div>
                  <Btn variant={p.active ? "ghost" : "outline"} size="sm" onClick={() => toggleActive(p)}>{p.active ? "Desactivar" : "Activar"}</Btn>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text2)", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic" }}>No hay pedidos aún</div>
            ) : orders.map(order => (
              <div key={order.id} style={{ padding: "20px", background: "var(--dark)", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 9, color: "var(--text2)", marginBottom: 4 }}>{new Date(order.created_at).toLocaleDateString("es-ES")}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>Pedido #{order.id.slice(0, 8).toUpperCase()}</div>
                    <div style={{ fontSize: 10, color: "var(--text2)", marginTop: 4 }}>{order.payment_method?.toUpperCase()} · {order.shipping_address?.city}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "var(--purple2)", marginBottom: 4 }}>{order.total?.toLocaleString("es-ES")} €</div>
                    <div style={{ fontSize: 9, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{order.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "codes" && (
          <div>
            <div style={{ background: "var(--dark)", border: "1px solid var(--border2)", padding: 32, marginBottom: 32 }}>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, marginBottom: 24 }}>Generar nuevo código</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <Input label="Código personalizado (opcional)" value={newCode} onChange={e => setNewCode(e.target.value.toUpperCase())} placeholder="Se genera automáticamente" />
                <Input label="Email del destinatario (opcional)" type="email" value={newCodeEmail} onChange={e => setNewCodeEmail(e.target.value)} placeholder="cliente@email.com" />
              </div>
              <Btn onClick={createCode}>Generar código</Btn>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {codes.map(c => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "var(--dark)", border: "1px solid var(--border)", opacity: c.used ? 0.4 : 1 }}>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 16, letterSpacing: "0.2em", color: c.used ? "var(--text2)" : "var(--purple2)" }}>{c.code}</div>
                    {c.email && <div style={{ fontSize: 10, color: "var(--text2)", marginTop: 4 }}>→ {c.email}</div>}
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: c.used ? "var(--red)" : "var(--green)" }}>
                    {c.used ? `Usado ${new Date(c.used_at).toLocaleDateString("es-ES")}` : "Disponible"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = ({ setPage }) => (
  <footer style={{ borderTop: "1px solid var(--border)", padding: "60px 48px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40 }}>
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <img src="/gsartLOGO.png" alt="GSART" style={{ height: 40, opacity: 0.8 }} />
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: "var(--purple2)" }}>GSART</span>
      </div>
      <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.8, maxWidth: 280, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
        Simplemente Estilo Arte. Cuadros únicos de artistas emergentes para coleccionistas exigentes.
      </p>
    </div>
    <div>
      <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 20 }}>Galería</div>
      {[["Colección","collection"],["Artistas","artists"]].map(([l, p]) => (
        <div key={p} style={{ marginBottom: 12 }}>
          <button onClick={() => setPage(p)} style={{ background: "none", border: "none", fontSize: 11, color: "var(--text2)", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--purple2)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text2)"}
          >{l}</button>
        </div>
      ))}
    </div>
    <div>
      <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 20 }}>Contacto</div>
      <div style={{ fontSize: 11, color: "var(--text2)", lineHeight: 2 }}>
        <div>info@gsart.com</div>
        <div>+34 600 000 000</div>
        <div>Madrid, España</div>
      </div>
    </div>
    <div style={{ gridColumn: "1/-1", borderTop: "1px solid var(--border)", paddingTop: 32, display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontSize: 9, color: "var(--text2)" }}>© 2026 GSART · Todos los derechos reservados</div>
      <div style={{ fontSize: 9, color: "var(--text2)" }}>Arte · Exclusividad · Lujo</div>
    </div>
  </footer>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showBoutique, setShowBoutique] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user ?? null); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    supabase.from("products").select("*").eq("active", true).then(({ data }) => { if (data && data.length > 0) setProducts(data); });
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.findIndex(i => i.id === product.id);
      if (existing >= 0) { const u = [...prev]; u[existing] = { ...u[existing], qty: u[existing].qty + 1 }; return u; }
      return [...prev, { ...product, qty: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (index) => setCart(prev => prev.filter((_, i) => i !== index));
  const handleLogout = () => supabase.auth.signOut();
  const isAdmin = user?.user_metadata?.role === "admin" || user?.email === "sebastianjhossep@gmail.com";

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#060608", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <GlobalStyles />
      <div style={{ textAlign: "center" }}>
        <img src="/gsartLOGO.png" alt="GSART" className="logo-glow" style={{ height: 80, marginBottom: 16 }} />
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: "#9b4fcc", letterSpacing: "0.3em" }}>GSART</div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--black)" }}>
      <GlobalStyles />
      <Navbar user={user} cartCount={cart.reduce((s, i) => s + i.qty, 0)} onCart={() => setShowCart(true)} onAuth={() => setShowAuth(true)} onLogout={handleLogout} onAdmin={() => setShowAdmin(true)} onBoutique={() => setShowBoutique(true)} currentPage={page} setPage={setPage} />
      <main>
        {page === "home" && <Hero setPage={setPage} onBoutique={() => setShowBoutique(true)} />}
        {page === "collection" && <CollectionPage products={products} onAddToCart={addToCart} onProductClick={setSelectedProduct} />}
        {page === "artists" && (
          <div style={{ padding: "120px 48px 80px", textAlign: "center" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 16 }}>Próximamente</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: "var(--white)" }}>Nuestros Artistas</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--text2)", fontSize: 18, marginTop: 24 }}>Estamos preparando los perfiles de nuestros artistas emergentes.</p>
          </div>
        )}
      </main>
      <Footer setPage={setPage} />
      {showCart && <CartDrawer cart={cart} onClose={() => setShowCart(false)} onRemove={removeFromCart} onCheckout={() => { setShowCart(false); setShowCheckout(true); }} user={user} onAuth={() => { setShowCart(false); setShowAuth(true); }} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={setUser} />}
      {showBoutique && <BoutiqueModal onClose={() => setShowBoutique(false)} onAccess={addToCart} products={products} />}
      {showCheckout && <CheckoutModal cart={cart} user={user} onClose={() => setShowCheckout(false)} onSuccess={() => setCart([])} />}
      {showAdmin && isAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
}