import { useState, useEffect } from "react";

const SUPABASE_URL = "https://dggymhcjtkjlwvyhyvza.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZ3ltaGNqdGtqbHd2eWh5dnphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDI2MzIsImV4cCI6MjA5NTk3ODYzMn0.fBU_bdvOZHzwpc74lG1LwjRrvXzPbeG5pFsYfbzQdv4";

const api = async (method, path, body) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": method === "POST" ? "return=representation" : "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

const INITIAL_ITEMS = [
  { title: "Vivir una temporada en Hawaii", category: "viajes", horizon: "mediano", done: false, notes: "Estar buen rato en las afueras, surfear, ritmo tranquilo. Nada de turismo rápido.", priority: true },
  { title: "Ir a Nueva Zelanda", category: "viajes", horizon: "mediano", done: false, notes: "Viaje tranquilo, conectar con la naturaleza. Sin prisa.", priority: false },
  { title: "Explorar Australia", category: "viajes", horizon: "mediano", done: false, notes: "Combinarlo con Nueva Zelanda. Salir de lo turístico.", priority: false },
  { title: "Hacer el Camino de Santiago solo", category: "viajes", horizon: "mediano", done: false, notes: "Ya lo he acompañado. Esta vez hacerlo para mí, por la experiencia espiritual profunda.", priority: true },
  { title: "Volver a Japón y vivir como local", category: "viajes", horizon: "mediano", done: false, notes: "Sumergirme en la cultura: anime, tecnología, samuráis, comida, rituales.", priority: true },
  { title: "Voluntariado o inmersión cultural larga", category: "viajes", horizon: "largo", done: false, notes: "Tipo ONG, en algún lugar con cultura fuerte. Meses, no días.", priority: false },
  { title: "Viaje grande en familia", category: "viajes", horizon: "mediano", done: false, notes: "Un destino especial, todos juntos. Crear ese recuerdo imborrable.", priority: true },
  { title: "Ir a un Mundial de Fútbol", category: "viajes", horizon: "largo", done: false, notes: "Requiere planeación económica fuerte.", priority: false },
  { title: "Llevar a mis sobrinos de viaje", category: "viajes", horizon: "corto", done: false, notes: "Un viaje especial solo con ellos. Crear ese vínculo y ese recuerdo.", priority: true },
  { title: "Jordania — Petra, Wadi Rum, Mar Muerto", category: "viajes", horizon: "mediano", done: false, notes: "Cultura árabe + actividad física + historia.", priority: false },
  { title: "Dubái y Abu Dhabi", category: "viajes", horizon: "mediano", done: false, notes: "Arquitectura brutal, desierto, mezcla cultural.", priority: false },
  { title: "Marruecos — Sahara, Marrakech, medinas", category: "viajes", horizon: "mediano", done: false, notes: "Desierto en camello, gastronomía increíble. Cultura total.", priority: false },
  { title: "Machu Picchu por el Camino Inca", category: "viajes", horizon: "mediano", done: false, notes: "4 días caminando hasta llegar. Reto + historia + gastronomía.", priority: true },
  { title: "Colombia — Ciudad Perdida trekking", category: "viajes", horizon: "mediano", done: false, notes: "6 días de trekking. Combinarlo con Cartagena.", priority: false },
  { title: "Oaxaca profundo", category: "viajes", horizon: "corto", done: false, notes: "Gastronomía, mezcal, comunidades zapotecas.", priority: false },
  { title: "Patagonia — Torres del Paine", category: "viajes", horizon: "largo", done: false, notes: "Trekking W o circuito O. Naturaleza extrema.", priority: false },
  { title: "Nadar 10 km Cancún-Mujeres", category: "competencias", horizon: "corto", done: false, notes: "Competencia de aguas abiertas. Icónico en México.", priority: true },
  { title: "Correr en el desierto — Los Cabos u otro", category: "competencias", horizon: "corto", done: false, notes: "Carrera larga en paisaje extremo.", priority: false },
  { title: "Spartan Race", category: "competencias", horizon: "corto", done: false, notes: "Empezar por Sprint o Super.", priority: false },
  { title: "Ultras en diferentes países con paisajes únicos", category: "competencias", horizon: "mediano", done: false, notes: "Montaña, costa, desierto. Cada carrera una experiencia.", priority: false },
  { title: "Competir en un Hinox en Japón", category: "competencias", horizon: "mediano", done: false, notes: "Correrlo en Japón y tratar de ganarlo.", priority: true },
  { title: "NBA Playoffs o Finals en vivo", category: "experiencias", horizon: "corto", done: false, notes: "No temporada regular. La energía de un juego que importa.", priority: true },
  { title: "Ver a los Miami Dolphins en vivo", category: "experiencias", horizon: "corto", done: false, notes: "En el Hard Rock Stadium. NFL en persona.", priority: false },
  { title: "Coachella — experiencia completa", category: "experiencias", horizon: "corto", done: false, notes: "Bien planeado, glamping. Vivirlo de verdad.", priority: false },
  { title: "Burning Man", category: "experiencias", horizon: "mediano", done: false, notes: "Quizás con mi futura pareja. Preparación real.", priority: false },
  { title: "Concierto épico en Las Vegas", category: "experiencias", horizon: "corto", done: false, notes: "Un show grande o residencia de artista.", priority: false },
  { title: "Surfear en Hawaii de verdad", category: "experiencias", horizon: "mediano", done: false, notes: "Olas de verdad, no clase para turistas.", priority: false },
  { title: "Peregrinación Kumano Kodo en Japón", category: "experiencias", horizon: "mediano", done: false, notes: "Ruta sagrada de 1000 años.", priority: false },
  { title: "Postularme a un reality show de aventura", category: "experiencias", horizon: "mediano", done: false, notes: "Supervivencia, reto físico o exploración.", priority: false },
  { title: "Aurora Boreal + hotel de hielo", category: "experiencias", horizon: "mediano", done: false, notes: "Finlandia o Noruega. Dormir en habitación de hielo.", priority: true },
  { title: "Sauna + agua helada en el norte de Europa", category: "experiencias", horizon: "mediano", done: false, notes: "Sauna finlandesa y lago helado. Reset físico y mental.", priority: false },
  { title: "Cena bajo las estrellas en el desierto", category: "experiencias", horizon: "mediano", done: false, notes: "Mesa en la arena, cielo despejado. Wadi Rum o Sahara.", priority: false },
  { title: "Resort todo incluido en México — solo", category: "experiencias", horizon: "corto", done: false, notes: "Sin agenda. Spa, relajación total. Un regalo para mí.", priority: false },
  { title: "Retiro de silencio — Vipassana", category: "personal", horizon: "corto", done: false, notes: "10 días sin hablar. Reseteo mental profundo.", priority: true },
  { title: "Ceremonia de temazcal profundo", category: "personal", horizon: "corto", done: false, notes: "No el turístico. Uno real, guiado, con intención.", priority: false },
  { title: "Identificar y romper mi patrón autolimitante más grande", category: "personal", horizon: "corto", done: false, notes: "Parte del trabajo es descubrirlo. Terapia, coaching, introspección.", priority: true },
  { title: "Escribir mi historia de vida completa — sin censura", category: "personal", horizon: "mediano", done: false, notes: "No para publicar. Para verme entero.", priority: false },
  { title: "Explorar EMDR", category: "personal", horizon: "corto", done: false, notes: "Para patrones y bloqueos que siguen activos.", priority: false },
  { title: "Cartas privadas de cierre — para mí", category: "personal", horizon: "corto", done: false, notes: "Para cerrar, reconocer y soltar. Aunque no recuerde sus nombres.", priority: false },
  { title: "Primer millón de pesos libre", category: "personal", horizon: "corto", done: false, notes: "Base de estabilidad económica real.", priority: true },
  { title: "20 millones de pesos — libertad económica real", category: "personal", horizon: "mediano", done: false, notes: "Aquí ya eliges. No trabajas por necesidad.", priority: true },
  { title: "50 millones de pesos — vivir como quiero", category: "personal", horizon: "largo", done: false, notes: "Eliges dónde, cómo y con quién.", priority: false },
  { title: "100 millones de pesos+ — legado", category: "personal", horizon: "sueno", done: false, notes: "Ya no es solo para mí. Es para construir y dejar.", priority: false },
  { title: "Portafolio de inversiones diversificado", category: "personal", horizon: "mediano", done: false, notes: "Que el dinero trabaje sin que yo esté pendiente.", priority: true },
  { title: "Diversificación real de ingresos pasivos", category: "personal", horizon: "mediano", done: false, notes: "Varias fuentes. Que si una falla, las otras sigan.", priority: true },
  { title: "Invertir en bienes raíces", category: "personal", horizon: "mediano", done: false, notes: "Primera propiedad de inversión que genere.", priority: false },
  { title: "Mi casa diseñada a mi medida", category: "personal", horizon: "mediano", done: false, notes: "Jardín zen japonés y gimnasio propio.", priority: true },
  { title: "Mi depa con gran estilo", category: "personal", horizon: "mediano", done: false, notes: "Cada detalle pensado. Que entre y sienta que ese lugar soy yo.", priority: true },
  { title: "Vivir en la playa", category: "personal", horizon: "largo", done: false, notes: "No de vacaciones. Vivir ahí.", priority: false },
  { title: "Encontrar el amor de mi vida", category: "personal", horizon: "mediano", done: false, notes: "", priority: true },
  { title: "Tener una familia", category: "personal", horizon: "largo", done: false, notes: "Lo más importante. Construirla con intención.", priority: true },
  { title: "Tener libertad económica", category: "personal", horizon: "mediano", done: false, notes: "Que el dinero no dicte mis decisiones.", priority: true },
  { title: "Hacer las paces con la muerte", category: "personal", horizon: "mediano", done: false, notes: "No tenerle miedo. Vivir más libre por eso.", priority: true },
  { title: "Tener el cuerpo soñado — fit, marcado y grande", category: "personal", horizon: "mediano", done: false, notes: "No bodybuilder. Grande, musculoso, muy marcado.", priority: true },
  { title: "Ser un ícono de moda — vestirme con identidad propia", category: "personal", horizon: "mediano", done: false, notes: "No seguir tendencias. Crear mi propio estilo.", priority: false },
  { title: "Tatuajes con significado profundo", category: "personal", horizon: "corto", done: false, notes: "Varios, bien pensados. Que cuenten algo real.", priority: false },
  { title: "Ser una persona que transmita paz e inspire", category: "personal", horizon: "sueno", done: false, notes: "Que cuando llegue a un lugar se sienta. No por fama — por quién soy.", priority: true },
  { title: "Escribir un libro", category: "aprendizaje", horizon: "mediano", done: false, notes: "Autobiográfico, de aventuras o filosófico.", priority: true },
  { title: "Recetario de mi madre", category: "aprendizaje", horizon: "corto", done: false, notes: "Documentar sus recetas. Uno de los legados más bonitos.", priority: true },
  { title: "Recetario alto en proteína y saludable", category: "aprendizaje", horizon: "corto", done: false, notes: "Podría ser digital, físico o una marca.", priority: false },
  { title: "Canal de YouTube bien hecho", category: "aprendizaje", horizon: "corto", done: false, notes: "Mi visión, mi arte, mi creatividad. Bien producido.", priority: true },
  { title: "Mini documental de mi vida", category: "aprendizaje", horizon: "mediano", done: false, notes: "Con narrativa real. No un vlog — algo con alma.", priority: false },
  { title: "Aprender hip hop y breakdance", category: "aprendizaje", horizon: "corto", done: false, notes: "Clases formales. No casual.", priority: false },
  { title: "Aprender japonés conversacional", category: "aprendizaje", horizon: "mediano", done: false, notes: "Antes del próximo viaje a Japón.", priority: false },
  { title: "Aprender a cocinar muy bien — rico y saludable", category: "aprendizaje", horizon: "corto", done: false, notes: "Entender sabores, técnicas, improvisar.", priority: false },
  { title: "Ser maestro — compartir lo aprendido", category: "social", horizon: "mediano", done: false, notes: "Mentorar de verdad a alguien que lo necesite.", priority: true },
  { title: "Crear un proyecto de impacto social en Latam", category: "social", horizon: "largo", done: false, notes: "Educación, deporte, nutrición. Algo que perdure.", priority: true },
  { title: "Podcast con mis hermanos", category: "social", horizon: "corto", done: false, notes: "Algo auténtico. No tiene que ser perfecto para empezar.", priority: true },
  { title: "Construir una comunidad fuerte con propósito", category: "social", horizon: "mediano", done: false, notes: "No seguidores — comunidad real con intención.", priority: true },
  { title: "Conversaciones profundas con personas clave de mi familia", category: "social", horizon: "corto", done: false, notes: "Las que me ponen incómodo. Por eso hay que tenerlas.", priority: false },
  { title: "Marca personal posicionada y poderosa", category: "social", horizon: "mediano", done: false, notes: "Que cuando digan Bernardo, haya algo muy claro.", priority: true },
  { title: "Dar una charla TEDx", category: "social", horizon: "mediano", done: false, notes: "Sobre algo que realmente tenga que decir.", priority: true },
  { title: "Salir en portadas por algo que cambié", category: "social", horizon: "largo", done: false, notes: "No por fama vacía. Por impacto real.", priority: false },
  { title: "Ser referente — empresarial, creativo y de moda", category: "social", horizon: "largo", done: false, notes: "Todo lo que es Bernardo, integrado.", priority: true },
  { title: "Hacerme famoso por las razones correctas", category: "social", horizon: "largo", done: false, notes: "Que me conozcan por el impacto y los valores.", priority: false },
  { title: "Colaboraciones con marcas de ropa importantes", category: "social", horizon: "mediano", done: false, notes: "Colaborar o crear prendas propias.", priority: false },
  { title: "Reconectar profundamente con amigos de la infancia", category: "social", horizon: "corto", done: false, notes: "Los veo pero no conozco su vida real. Reconectar de verdad.", priority: true },
  { title: "Reponer regalos de bodas — personal y uno por uno", category: "social", horizon: "mediano", done: false, notes: "Los más cercanos. Algo personal, no genérico.", priority: false },
  { title: "Tener una boda llena de amor y paz", category: "personal", horizon: "largo", done: false, notes: "Que se sienta ese amor en cada detalle.", priority: true },
  { title: "Tener una marca que trascienda", category: "social", horizon: "largo", done: false, notes: "No solo un negocio. Con identidad, valores y propósito.", priority: true },
  { title: "Tener un proyecto propio alrededor de la música", category: "social", horizon: "largo", done: false, notes: "Concierto, sesiones, producción. Que sea auténtico.", priority: false },
];

const CATEGORIES = [
  { id: "viajes", label: "Viajes", icon: "✈️" },
  { id: "experiencias", label: "Experiencias", icon: "✨" },
  { id: "competencias", label: "Competencias", icon: "🏆" },
  { id: "aprendizaje", label: "Aprendizaje", icon: "📚" },
  { id: "personal", label: "Personal", icon: "🌱" },
  { id: "social", label: "Social", icon: "❤️" },
];

const HORIZONS = [
  { id: "corto", label: "Corto plazo", sublabel: "< 1 año", color: "#e8c547" },
  { id: "mediano", label: "Mediano plazo", sublabel: "1–5 años", color: "#e87b47" },
  { id: "largo", label: "Largo plazo", sublabel: "5–15 años", color: "#e84747" },
  { id: "sueno", label: "Sueño de vida", sublabel: "Algún día", color: "#c247e8" },
];

const HORIZON_ORDER = ["corto", "mediano", "largo", "sueno"];

export default function BucketList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [showDone, setShowDone] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: "", category: "experiencias", horizon: "corto", notes: "", priority: false });
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await api("GET", "bucket_items?order=created_at");
      if (data && data.length > 0) {
        setItems(data);
      } else {
        // Seed initial items
        await seedItems();
      }
    } catch (e) {
      setError("Error cargando datos: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const seedItems = async () => {
    try {
      const data = await api("POST", "bucket_items", INITIAL_ITEMS);
      setItems(data || []);
    } catch (e) {
      setError("Error cargando datos iniciales: " + e.message);
    }
  };

  const openAdd = () => {
    setForm({ title: "", category: "experiencias", horizon: "corto", notes: "", priority: false });
    setModal("add");
  };

  const openEdit = (item) => { setForm({ ...item }); setModal(item); };

  const saveItem = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (modal === "add") {
        const { title, category, horizon, notes, priority } = form;
        const data = await api("POST", "bucket_items", { title, category, horizon, notes, priority, done: false });
        setItems(prev => [...prev, ...(Array.isArray(data) ? data : [data])]);
      } else {
        const { title, category, horizon, notes, priority } = form;
        await api("PATCH", `bucket_items?id=eq.${modal.id}`, { title, category, horizon, notes, priority });
        setItems(prev => prev.map(i => i.id === modal.id ? { ...i, title, category, horizon, notes, priority } : i));
      }
      setModal(null);
    } catch (e) {
      setError("Error guardando: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleDone = async (id, current) => {
    try {
      await api("PATCH", `bucket_items?id=eq.${id}`, { done: !current });
      setItems(prev => prev.map(i => i.id === id ? { ...i, done: !current } : i));
    } catch (e) {
      setError("Error actualizando: " + e.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await api("DELETE", `bucket_items?id=eq.${id}`);
      setItems(prev => prev.filter(i => i.id !== id));
      setModal(null);
    } catch (e) {
      setError("Error eliminando: " + e.message);
    }
  };

  const filtered = items.filter(i => {
    if (!showDone && i.done) return false;
    if (filter !== "all" && i.horizon !== filter) return false;
    if (catFilter !== "all" && i.category !== catFilter) return false;
    return true;
  });

  const grouped = HORIZON_ORDER.reduce((acc, h) => {
    const group = filtered.filter(i => i.horizon === h);
    if (group.length > 0) acc[h] = group;
    return acc;
  }, {});

  const totalDone = items.filter(i => i.done).length;
  const pct = items.length ? Math.round((totalDone / items.length) * 100) : 0;
  const getCat = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
  const getHorizon = (id) => HORIZONS.find(h => h.id === id) || HORIZONS[0];

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0d0d0f", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 48, height: 48, border: "3px solid #e8c54733", borderTop: "3px solid #e8c547", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <p style={{ color: "#e8c547", fontFamily: "Georgia", fontSize: 16 }}>Cargando tu bucket list...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={styles.root}>
      <div style={styles.bgNoise} />
      {error && (
        <div style={styles.errorBar}>
          ⚠️ {error}
          <button onClick={() => setError(null)} style={{ marginLeft: 12, background: "none", border: "none", color: "white", cursor: "pointer" }}>✕</button>
        </div>
      )}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <p style={styles.headerEyebrow}>MI</p>
            <h1 style={styles.headerTitle}>BUCKET LIST</h1>
            <p style={styles.headerSub}>Las cosas que harán que valga la pena haber vivido.</p>
          </div>
          <div style={styles.progressBlock}>
            <svg viewBox="0 0 80 80" style={styles.progressRing}>
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="#e8c547" strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
                strokeLinecap="round"
                style={{ transformOrigin: "center", transform: "rotate(-90deg)", transition: "stroke-dashoffset 0.6s ease" }} />
              <text x="40" y="45" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Georgia">{pct}%</text>
            </svg>
            <p style={styles.progressLabel}>{totalDone} / {items.length}<br /><span style={{ fontSize: 11, opacity: 0.6 }}>completados</span></p>
          </div>
        </div>
        <div style={styles.horizonStats}>
          {HORIZONS.map(h => {
            const count = items.filter(i => i.horizon === h.id && !i.done).length;
            return (
              <div key={h.id} style={styles.horizonStat} onClick={() => setFilter(filter === h.id ? "all" : h.id)}>
                <div style={{ ...styles.horizonDot, background: h.color, boxShadow: filter === h.id ? `0 0 12px ${h.color}` : "none" }} />
                <div>
                  <p style={styles.horizonStatNum}>{count}</p>
                  <p style={styles.horizonStatLabel}>{h.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </header>

      <div style={styles.controls}>
        <div style={styles.catFilters}>
          <button style={{ ...styles.catBtn, ...(catFilter === "all" ? styles.catBtnActive : {}) }} onClick={() => setCatFilter("all")}>Todo</button>
          {CATEGORIES.map(c => (
            <button key={c.id} style={{ ...styles.catBtn, ...(catFilter === c.id ? styles.catBtnActive : {}) }} onClick={() => setCatFilter(catFilter === c.id ? "all" : c.id)}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
        <div style={styles.rightControls}>
          <label style={styles.showDoneToggle}>
            <input type="checkbox" checked={showDone} onChange={e => setShowDone(e.target.checked)} style={{ accentColor: "#e8c547" }} />
            <span>Ver completados</span>
          </label>
          <button style={styles.addBtn} onClick={openAdd}>＋ Agregar</button>
        </div>
      </div>

      <main style={styles.main}>
        {Object.entries(grouped).map(([horizonId, horizonItems]) => {
          const horizon = getHorizon(horizonId);
          return (
            <section key={horizonId} style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={{ ...styles.sectionLine, background: horizon.color }} />
                <div>
                  <h2 style={{ ...styles.sectionTitle, color: horizon.color }}>{horizon.label}</h2>
                  <p style={styles.sectionSub}>{horizon.sublabel} · {horizonItems.length} {horizonItems.length === 1 ? "ítem" : "ítems"}</p>
                </div>
              </div>
              <div style={styles.grid}>
                {horizonItems.map(item => {
                  const cat = getCat(item.category);
                  const isExpanded = expandedId === item.id;
                  const h = getHorizon(item.horizon);
                  return (
                    <div key={item.id} style={{ ...styles.card, ...(item.done ? styles.cardDone : {}), ...(item.priority && !item.done ? styles.cardPriority : {}), borderLeftColor: h.color }}>
                      <div style={styles.cardTop}>
                        <button style={{ ...styles.checkBtn, borderColor: h.color, background: item.done ? h.color : "transparent" }} onClick={() => toggleDone(item.id, item.done)}>
                          {item.done && <span style={styles.checkMark}>✓</span>}
                        </button>
                        <div style={styles.cardContent} onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                          <p style={{ ...styles.cardTitle, ...(item.done ? { textDecoration: "line-through", opacity: 0.5 } : {}) }}>
                            {item.priority && !item.done && <span style={styles.priorityStar}>★ </span>}
                            {item.title}
                          </p>
                          <span style={styles.catTag}>{cat.icon} {cat.label}</span>
                        </div>
                        <button style={styles.editBtn} onClick={() => openEdit(item)}>✎</button>
                      </div>
                      {isExpanded && item.notes && (
                        <div style={styles.cardNotes}><p style={styles.notesText}>📝 {item.notes}</p></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
        {filtered.length === 0 && !loading && (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>🌟</p>
            <p style={styles.emptyText}>¡Empieza agregando tu primer sueño!</p>
            <button style={styles.addBtn} onClick={openAdd}>＋ Agregar ítem</button>
          </div>
        )}
      </main>

      {modal !== null && (
        <div style={styles.overlay} onClick={() => setModal(null)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>{modal === "add" ? "Nuevo sueño" : "Editar ítem"}</h2>
            <label style={styles.label}>Título *</label>
            <input style={styles.input} placeholder="¿Qué quieres hacer?" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} autoFocus />
            <label style={styles.label}>Categoría</label>
            <div style={styles.btnGroup}>
              {CATEGORIES.map(c => (
                <button key={c.id} style={{ ...styles.groupBtn, ...(form.category === c.id ? styles.groupBtnActive : {}) }} onClick={() => setForm(f => ({ ...f, category: c.id }))}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
            <label style={styles.label}>Horizonte</label>
            <div style={styles.btnGroup}>
              {HORIZONS.map(h => (
                <button key={h.id} style={{ ...styles.groupBtn, ...(form.horizon === h.id ? { ...styles.groupBtnActive, borderColor: h.color, color: h.color } : {}) }} onClick={() => setForm(f => ({ ...f, horizon: h.id }))}>
                  {h.label}<br /><span style={{ fontSize: 10, opacity: 0.7 }}>{h.sublabel}</span>
                </button>
              ))}
            </div>
            <label style={styles.label}>Notas / Plan</label>
            <textarea style={{ ...styles.input, minHeight: 80, resize: "vertical" }} placeholder="Detalles, fechas tentativas, cómo lograrlo..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
            <label style={styles.priorityLabel}>
              <input type="checkbox" checked={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.checked }))} style={{ accentColor: "#e8c547" }} />
              <span>★ Marcar como prioridad</span>
            </label>
            <div style={styles.modalActions}>
              {modal !== "add" && <button style={styles.deleteBtn} onClick={() => deleteItem(modal.id)}>Eliminar</button>}
              <button style={styles.cancelBtn} onClick={() => setModal(null)}>Cancelar</button>
              <button style={styles.saveBtn} onClick={saveItem} disabled={saving}>{saving ? "Guardando..." : modal === "add" ? "Agregar" : "Guardar"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: { minHeight: "100vh", background: "#0d0d0f", color: "#f0ece3", fontFamily: "'Georgia', serif", position: "relative", overflowX: "hidden" },
  bgNoise: { position: "fixed", inset: 0, zIndex: 0, backgroundImage: `radial-gradient(ellipse at 20% 20%, rgba(232,197,71,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(232,71,71,0.06) 0%, transparent 50%)`, pointerEvents: "none" },
  errorBar: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "#e84747", color: "white", padding: "12px 20px", fontSize: 14, display: "flex", alignItems: "center" },
  header: { position: "relative", zIndex: 1, padding: "48px 40px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" },
  headerTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 },
  headerEyebrow: { fontSize: 11, letterSpacing: "0.4em", color: "#e8c547", margin: "0 0 4px" },
  headerTitle: { fontSize: "clamp(36px, 6vw, 64px)", fontWeight: "bold", margin: 0, letterSpacing: "0.06em", lineHeight: 1, color: "#f0ece3" },
  headerSub: { marginTop: 10, fontSize: 14, color: "rgba(240,236,227,0.5)", fontStyle: "italic" },
  progressBlock: { display: "flex", alignItems: "center", gap: 12, flexShrink: 0 },
  progressRing: { width: 80, height: 80 },
  progressLabel: { fontSize: 13, color: "rgba(240,236,227,0.7)", textAlign: "center", lineHeight: 1.4 },
  horizonStats: { display: "flex", gap: 28, flexWrap: "wrap" },
  horizonStat: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 16px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" },
  horizonDot: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
  horizonStatNum: { fontSize: 20, fontWeight: "bold", margin: 0, lineHeight: 1 },
  horizonStatLabel: { fontSize: 11, opacity: 0.5, margin: 0, letterSpacing: "0.05em" },
  controls: { position: "relative", zIndex: 1, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" },
  catFilters: { display: "flex", gap: 8, flexWrap: "wrap" },
  catBtn: { padding: "6px 14px", borderRadius: 20, fontSize: 12, border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(240,236,227,0.6)", cursor: "pointer", fontFamily: "'Georgia', serif" },
  catBtnActive: { background: "rgba(232,197,71,0.15)", borderColor: "#e8c547", color: "#e8c547" },
  rightControls: { display: "flex", alignItems: "center", gap: 16 },
  showDoneToggle: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(240,236,227,0.5)", cursor: "pointer", userSelect: "none" },
  addBtn: { padding: "8px 20px", borderRadius: 20, background: "#e8c547", color: "#0d0d0f", border: "none", cursor: "pointer", fontSize: 13, fontWeight: "bold", fontFamily: "'Georgia', serif" },
  main: { position: "relative", zIndex: 1, padding: "32px 40px 60px" },
  section: { marginBottom: 48 },
  sectionHeader: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  sectionLine: { width: 4, height: 40, borderRadius: 2, flexShrink: 0 },
  sectionTitle: { fontSize: 13, fontWeight: "bold", letterSpacing: "0.2em", margin: 0, textTransform: "uppercase" },
  sectionSub: { fontSize: 11, margin: "2px 0 0", opacity: 0.4, letterSpacing: "0.05em" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 },
  card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: "3px solid", borderRadius: 10, padding: "14px 16px", transition: "all 0.2s" },
  cardDone: { opacity: 0.45, background: "rgba(255,255,255,0.02)" },
  cardPriority: { background: "rgba(232,197,71,0.06)" },
  cardTop: { display: "flex", alignItems: "flex-start", gap: 12 },
  checkBtn: { width: 22, height: 22, borderRadius: "50%", border: "2px solid", cursor: "pointer", flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 },
  checkMark: { fontSize: 12, color: "#0d0d0f", fontWeight: "bold" },
  cardContent: { flex: 1, cursor: "pointer" },
  cardTitle: { fontSize: 14, margin: "0 0 6px", lineHeight: 1.4, fontWeight: "normal" },
  priorityStar: { color: "#e8c547" },
  catTag: { fontSize: 11, color: "rgba(240,236,227,0.4)" },
  editBtn: { background: "none", border: "none", cursor: "pointer", color: "rgba(240,236,227,0.3)", fontSize: 16, padding: "0 4px", flexShrink: 0 },
  cardNotes: { marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.07)" },
  notesText: { fontSize: 12, color: "rgba(240,236,227,0.5)", margin: 0, lineHeight: 1.5, fontStyle: "italic" },
  emptyState: { textAlign: "center", padding: "80px 20px" },
  emptyIcon: { fontSize: 48, margin: "0 0 16px" },
  emptyText: { fontSize: 16, opacity: 0.5, lineHeight: 1.6, marginBottom: 24, fontStyle: "italic" },
  overlay: { position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modalBox: { background: "#18181c", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 32, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" },
  modalTitle: { fontSize: 22, margin: "0 0 24px", letterSpacing: "0.05em" },
  label: { display: "block", fontSize: 11, letterSpacing: "0.15em", color: "rgba(240,236,227,0.4)", marginBottom: 8, marginTop: 16, textTransform: "uppercase" },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "10px 14px", color: "#f0ece3", fontSize: 14, fontFamily: "'Georgia', serif", boxSizing: "border-box", outline: "none" },
  btnGroup: { display: "flex", flexWrap: "wrap", gap: 8 },
  groupBtn: { padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(240,236,227,0.6)", cursor: "pointer", fontSize: 12, lineHeight: 1.4, fontFamily: "'Georgia', serif", textAlign: "center" },
  groupBtnActive: { background: "rgba(232,197,71,0.12)", borderColor: "#e8c547", color: "#e8c547" },
  priorityLabel: { display: "flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 13, color: "rgba(240,236,227,0.6)", cursor: "pointer", userSelect: "none" },
  modalActions: { display: "flex", gap: 10, marginTop: 28, justifyContent: "flex-end" },
  deleteBtn: { padding: "8px 16px", borderRadius: 8, background: "rgba(232,71,71,0.15)", border: "1px solid rgba(232,71,71,0.3)", color: "#e84747", cursor: "pointer", fontSize: 13, fontFamily: "'Georgia', serif", marginRight: "auto" },
  cancelBtn: { padding: "8px 20px", borderRadius: 8, background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(240,236,227,0.6)", cursor: "pointer", fontSize: 13, fontFamily: "'Georgia', serif" },
  saveBtn: { padding: "8px 24px", borderRadius: 8, background: "#e8c547", color: "#0d0d0f", border: "none", cursor: "pointer", fontSize: 13, fontWeight: "bold", fontFamily: "'Georgia', serif" },
};
