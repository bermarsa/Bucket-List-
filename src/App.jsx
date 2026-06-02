import { useState } from "react";

const initialItems = [
  // VIAJES
  { id: 1, title: "Vivir una temporada en Hawaii", category: "viajes", horizon: "mediano", done: false, notes: "Estar buen rato en las afueras, surfear, ritmo tranquilo. Nada de turismo rápido.", priority: true },
  { id: 2, title: "Ir a Nueva Zelanda", category: "viajes", horizon: "mediano", done: false, notes: "Viaje tranquilo, conectar con la naturaleza. Sin prisa.", priority: false },
  { id: 3, title: "Explorar Australia", category: "viajes", horizon: "mediano", done: false, notes: "Combinarlo con Nueva Zelanda. Salir de lo turístico.", priority: false },
  { id: 4, title: "Hacer el Camino de Santiago solo", category: "viajes", horizon: "mediano", done: false, notes: "Ya lo he acompañado. Esta vez hacerlo para mí, por la experiencia espiritual profunda.", priority: true },
  { id: 5, title: "Volver a Japón y vivir como local", category: "viajes", horizon: "mediano", done: false, notes: "Sumergirme en la cultura: anime, tecnología, samuráis, comida, rituales. Vivir en un barrio, no en hotel.", priority: true },
  { id: 6, title: "Voluntariado o inmersión cultural larga", category: "viajes", horizon: "largo", done: false, notes: "Tipo ONG, en algún lugar con cultura fuerte. Aprender desde adentro. Meses, no días.", priority: false },
  { id: 7, title: "Viaje grande en familia", category: "viajes", horizon: "mediano", done: false, notes: "Un destino especial, todos juntos. Crear ese recuerdo imborrable.", priority: true },
  { id: 8, title: "Ir a un Mundial de Fútbol", category: "viajes", horizon: "largo", done: false, notes: "Requiere planeación económica fuerte. No el próximo, pero sí uno.", priority: false },
  { id: 9, title: "Llevar a mis sobrinos de viaje", category: "viajes", horizon: "corto", done: false, notes: "Un viaje especial solo con ellos. Crear ese vínculo y ese recuerdo.", priority: true },
  { id: 10, title: "Jordania — Petra, Wadi Rum, Mar Muerto", category: "viajes", horizon: "mediano", done: false, notes: "Cultura árabe + actividad física + historia. Petra caminando, noche en el desierto de Wadi Rum.", priority: false },
  { id: 11, title: "Dubái y Abu Dhabi", category: "viajes", horizon: "mediano", done: false, notes: "Arquitectura brutal, desierto, mezcla cultural. Ver el lado real más allá del lujo.", priority: false },
  { id: 12, title: "Marruecos — Sahara, Marrakech, medinas", category: "viajes", horizon: "mediano", done: false, notes: "Desierto en camello, laberintos de medina, gastronomía increíble. Cultura total.", priority: false },
  { id: 13, title: "Machu Picchu por el Camino Inca", category: "viajes", horizon: "mediano", done: false, notes: "4 días caminando hasta llegar. Cultura inca, paisaje de altura, gastronomía peruana. Reto + historia.", priority: true },
  { id: 14, title: "Colombia — Ciudad Perdida trekking", category: "viajes", horizon: "mediano", done: false, notes: "6 días de trekking a ciudad indígena en la Sierra Nevada. Combinarlo con Cartagena.", priority: false },
  { id: 15, title: "Oaxaca profundo", category: "viajes", horizon: "corto", done: false, notes: "Gastronomía de primer nivel, mezcal, comunidades zapotecas. Cultura mexicana en su máxima expresión.", priority: false },
  { id: 16, title: "Patagonia — Torres del Paine", category: "viajes", horizon: "largo", done: false, notes: "Trekking W o circuito O. Naturaleza extrema, desconexión total.", priority: false },

  // COMPETENCIAS
  { id: 17, title: "Nadar 10 km Cancún-Mujeres", category: "competencias", horizon: "corto", done: false, notes: "Competencia de aguas abiertas. Uno de los más icónicos en México.", priority: true },
  { id: 18, title: "Correr en el desierto — Los Cabos u otro", category: "competencias", horizon: "corto", done: false, notes: "Carrera larga en paisaje extremo. La vista como combustible.", priority: false },
  { id: 19, title: "Spartan Race", category: "competencias", horizon: "corto", done: false, notes: "Empezar por Sprint o Super. Disfrutar el proceso.", priority: false },
  { id: 20, title: "Ultras en diferentes países con paisajes únicos", category: "competencias", horizon: "mediano", done: false, notes: "Montaña, costa, desierto. Que cada carrera sea una experiencia en sí misma, no solo una medalla.", priority: false },
  { id: 21, title: "Competir en un Hinox en Japón", category: "competencias", horizon: "mediano", done: false, notes: "Correrlo en Japón y tratar de ganarlo. La combinación perfecta: competencia + cultura.", priority: true },

  // EXPERIENCIAS
  { id: 22, title: "NBA Playoffs o Finals en vivo", category: "experiencias", horizon: "corto", done: false, notes: "No temporada regular. Playoffs o Finals. La energía de un juego que importa.", priority: true },
  { id: 23, title: "Ver a los Miami Dolphins en vivo", category: "experiencias", horizon: "corto", done: false, notes: "En el Hard Rock Stadium. NFL en persona.", priority: false },
  { id: 24, title: "Coachella — experiencia completa", category: "experiencias", horizon: "corto", done: false, notes: "Bien planeado, glamping o buena logística. No ir a medias. Vivirlo de verdad.", priority: false },
  { id: 25, title: "Burning Man", category: "experiencias", horizon: "mediano", done: false, notes: "Quizás con mi futura pareja. Preparación real, entender qué es antes de ir.", priority: false },
  { id: 26, title: "Concierto épico en Las Vegas", category: "experiencias", horizon: "corto", done: false, notes: "Un show grande, residencia de artista o evento único. Las Vegas como experiencia completa.", priority: false },
  { id: 27, title: "Surfear en Hawaii de verdad", category: "experiencias", horizon: "mediano", done: false, notes: "Olas de verdad, no clase para turistas. Ligado al viaje a Hawaii.", priority: false },
  { id: 28, title: "Peregrinación Kumano Kodo en Japón", category: "experiencias", horizon: "mediano", done: false, notes: "Ruta sagrada de 1000 años. Caminata + naturaleza + espiritualidad japonesa.", priority: false },
  { id: 29, title: "Postularme a un reality show de aventura", category: "experiencias", horizon: "mediano", done: false, notes: "Supervivencia, reto físico o exploración. Ver qué hay y qué encaja con mi perfil.", priority: false },
  { id: 68, title: "Aurora Boreal + hotel de hielo", category: "experiencias", horizon: "mediano", done: false, notes: "Finlandia o Noruega. Dormir en habitación de hielo, ver la aurora. Experiencia de otro mundo.", priority: true },
  { id: 69, title: "Sauna + agua helada en el norte de Europa", category: "experiencias", horizon: "mediano", done: false, notes: "Sauna tradicional finlandesa y meterse al lago helado. Reset físico y mental brutal.", priority: false },
  { id: 70, title: "Cena bajo las estrellas en el desierto", category: "experiencias", horizon: "mediano", done: false, notes: "Mesa en la arena, cielo despejado, silencio. Wadi Rum, Sahara o similar.", priority: false },
  { id: 71, title: "Resort todo incluido en México — solo, para descansar", category: "experiencias", horizon: "corto", done: false, notes: "Sin agenda. Spa, convivir con quien aparezca, relajación total. Un regalo para uno mismo.", priority: false },

  // ESPIRITUALIDAD / INNER WORK
  { id: 30, title: "Retiro de silencio — Vipassana", category: "personal", horizon: "corto", done: false, notes: "10 días sin hablar, sin teléfono. Reseteo mental profundo. Requiere preparación.", priority: true },
  { id: 31, title: "Ceremonia de temazcal profundo", category: "personal", horizon: "corto", done: false, notes: "No el turístico. Uno real, guiado, con intención.", priority: false },
  { id: 51, title: "Identificar y romper mi patrón autolimitante más grande", category: "personal", horizon: "corto", done: false, notes: "No sé todavía cuál es — parte del trabajo es descubrirlo. Terapia, coaching, introspección.", priority: true },
  { id: 52, title: "Escribir mi historia de vida completa — sin censura", category: "personal", horizon: "mediano", done: false, notes: "No para publicar. Para verme entero, entender de dónde vengo y elegir a dónde voy.", priority: false },
  { id: 54, title: "Explorar EMDR — soltar lo que otras terapias no movieron", category: "personal", horizon: "corto", done: false, notes: "Complemento al grief recovery. Para patrones, bloqueos o memorias que siguen activas aunque la razón ya las entendió.", priority: false },
  { id: 55, title: "Cartas privadas de cierre — para mí", category: "personal", horizon: "corto", done: false, notes: "Para las mujeres que no traté como merecían. No para mandarlas — para cerrar, reconocer y soltar.", priority: false },

  // LEGADO / CREATIVIDAD
  { id: 32, title: "Escribir un libro", category: "aprendizaje", horizon: "mediano", done: false, notes: "Autobiográfico, de aventuras o filosófico. Lo que tenga que decir, decirlo.", priority: true },
  { id: 33, title: "Recetario de mi madre", category: "aprendizaje", horizon: "corto", done: false, notes: "Documentar sus recetas antes de que se pierdan. Uno de los legados más bonitos que puedo crear.", priority: true },
  { id: 34, title: "Recetario alto en proteína y saludable", category: "aprendizaje", horizon: "corto", done: false, notes: "Combinarlo con mi estilo de vida. Podría ser digital, físico o hasta una marca.", priority: false },
  { id: 61, title: "Canal de YouTube bien hecho", category: "aprendizaje", horizon: "corto", done: false, notes: "Que transmita todo lo que quiero transmitir. Mi visión, mi arte, mi creatividad. Bien producido.", priority: true },
  { id: 62, title: "Mini documental de mi vida", category: "aprendizaje", horizon: "mediano", done: false, notes: "Un proyecto visual con narrativa real. No un vlog — algo con intención y alma.", priority: false },
  { id: 37, title: "Aprender hip hop y breakdance", category: "aprendizaje", horizon: "corto", done: false, notes: "Clases formales, constantes. No casual. Llegar a un nivel donde me sienta cómodo.", priority: false },
  { id: 38, title: "Aprender japonés conversacional", category: "aprendizaje", horizon: "mediano", done: false, notes: "Antes del próximo viaje a Japón. No perfecto, pero funcional para vivir como local.", priority: false },
  { id: 49, title: "Aprender a cocinar muy bien — rico y saludable", category: "aprendizaje", horizon: "corto", done: false, notes: "No solo seguir recetas. Entender sabores, técnicas, improvisar. Que cocinar sea un placer.", priority: false },

  // SOCIAL / IMPACTO
  { id: 35, title: "Ser maestro — compartir lo aprendido", category: "social", horizon: "mediano", done: false, notes: "En deporte, vida, negocios. Mentorar de verdad a alguien que lo necesite.", priority: true },
  { id: 36, title: "Crear un proyecto de impacto social en Latam", category: "social", horizon: "largo", done: false, notes: "Educación, deporte, nutrición. Algo que perdure sin mí.", priority: true },
  { id: 44, title: "Podcast con mis hermanos", category: "social", horizon: "corto", done: false, notes: "Algo auténtico, de lo nuestro. No tiene que ser perfecto para empezar.", priority: true },
  { id: 50, title: "Construir una comunidad fuerte con propósito", category: "social", horizon: "mediano", done: false, notes: "Personas que se impulsan entre sí a mejorar. No seguidores — comunidad real con intención de crecer y ayudar.", priority: true },
  { id: 53, title: "Conversaciones profundas con personas clave de mi familia", category: "social", horizon: "corto", done: false, notes: "Las que me ponen incómodo de solo pensarlas. Por eso hay que tenerlas.", priority: false },
  { id: 60, title: "Marca personal posicionada y poderosa", category: "social", horizon: "mediano", done: false, notes: "Que cuando digan Bernardo, haya algo muy claro ahí. Empresarial, creativo, moda — todo integrado.", priority: true },
  { id: 65, title: "Dar una charla TEDx", category: "social", horizon: "mediano", done: false, notes: "Sobre algo que realmente tenga que decir. Que mueva a quien lo escuche.", priority: true },
  { id: 66, title: "Salir en portadas por algo que cambié o construí", category: "social", horizon: "largo", done: false, notes: "No por fama vacía. Por impacto real.", priority: false },
  { id: 67, title: "Ser referente — empresarial, creativo y de moda", category: "social", horizon: "largo", done: false, notes: "Todo lo que es Bernardo, integrado. Que la gente lo entienda y lo busque.", priority: true },
  { id: 43, title: "Hacerme famoso por las razones correctas", category: "social", horizon: "largo", done: false, notes: "No la fama vacía. Que me conozcan por el impacto, los valores y lo que represento.", priority: false },

  // PERSONAL / VIDA
  { id: 39, title: "Mi casa diseñada a mi medida", category: "personal", horizon: "mediano", done: false, notes: "Jardín zen estilo japonés y gimnasio propio. Un espacio que me dé paz y me represente.", priority: true },
  { id: 40, title: "Vivir en la playa", category: "personal", horizon: "largo", done: false, notes: "No de vacaciones. Vivir ahí, despertar con el mar todos los días.", priority: false },
  { id: 41, title: "Encontrar el amor de mi vida", category: "personal", horizon: "mediano", done: false, notes: "", priority: true },
  { id: 42, title: "Tener una familia", category: "personal", horizon: "largo", done: false, notes: "Lo más importante. Construirla con intención y con la persona correcta.", priority: true },
  { id: 45, title: "Tener libertad económica", category: "personal", horizon: "mediano", done: false, notes: "Que el dinero no dicte mis decisiones. Vivir por elección, no por obligación.", priority: true },
  { id: 46, title: "Hacer las paces con la muerte — estar en paz con lo que sigue", category: "personal", horizon: "mediano", done: false, notes: "No tenerle miedo. Explorar desde la filosofía, espiritualidad o lo que resuene. Vivir más libre por eso.", priority: true },
  { id: 48, title: "Tener el cuerpo soñado — fit, marcado y grande", category: "personal", horizon: "mediano", done: false, notes: "No bodybuilder. Grande, musculoso, muy marcado. Un cuerpo que refleje disciplina y estilo de vida.", priority: true },
  { id: 56, title: "Primer millón de pesos libre", category: "personal", horizon: "corto", done: false, notes: "Base de estabilidad económica real. El primero es el más importante — abre todo lo demás.", priority: true },
  { id: 80, title: "20 millones de pesos — libertad económica real", category: "personal", horizon: "mediano", done: false, notes: "Aquí ya eliges. No trabajas por necesidad, trabajas por propósito.", priority: true },
  { id: 81, title: "50 millones de pesos — vivir como quiero", category: "personal", horizon: "largo", done: false, notes: "Eliges dónde, cómo y con quién. El dinero deja de ser una conversación.", priority: false },
  { id: 82, title: "100 millones de pesos+ — legado e impacto generacional", category: "personal", horizon: "sueno", done: false, notes: "Ya no es solo para mí. Es para construir, para dejar, para impactar a otros.", priority: false },
  { id: 57, title: "Portafolio de inversiones diversificado funcionando solo", category: "personal", horizon: "mediano", done: false, notes: "Que el dinero trabaje sin que yo esté pendiente todo el tiempo.", priority: true },
  { id: 58, title: "Diversificación real de ingresos pasivos", category: "personal", horizon: "mediano", done: false, notes: "Varias fuentes, no una. Que si una falla, las otras sigan.", priority: true },
  { id: 59, title: "Invertir en bienes raíces", category: "personal", horizon: "mediano", done: false, notes: "Primera propiedad de inversión. No solo donde vivir — que genere.", priority: false },
  { id: 63, title: "Ser un ícono de moda — vestirme con identidad propia", category: "personal", horizon: "mediano", done: false, notes: "No seguir tendencias. Crear mi propio estilo tan claro que me identifique al instante.", priority: false },
  { id: 64, title: "Tatuajes con significado profundo", category: "personal", horizon: "corto", done: false, notes: "Varios, bien pensados. Que cada uno cuente algo real de quién soy.", priority: false },
  { id: 72, title: "Colaboraciones con marcas de ropa importantes", category: "social", horizon: "mediano", done: false, notes: "Colaborar con marcas que me gustan o crear prendas propias. Que refleje mi identidad.", priority: false },
  { id: 73, title: "Tener una boda llena de amor y paz", category: "personal", horizon: "largo", done: false, notes: "Que se sienta ese amor en cada detalle. Sin estrés, sin show — que sea la mejor del caso.", priority: true },
  { id: 74, title: "Reconectar profundamente con amigos de la infancia", category: "social", horizon: "corto", done: false, notes: "Los veo, pero no conozco bien a sus hijos ni su vida real. Reconectar de verdad, no superficialmente.", priority: true },
  { id: 79, title: "Tener un proyecto propio alrededor de la música", category: "social", horizon: "largo", done: false, notes: "En la industria musical. Puede ser un concierto, sesiones, producción, management o algo que todavía no tiene nombre. Que sea auténtico.", priority: false },
  { id: 78, title: "Ser una persona que transmita paz e inspire a ser mejor", category: "personal", horizon: "sueno", done: false, notes: "Que cuando llegue a un lugar se sienta. Que cuando hable mueva algo. No por fama — por quién soy de verdad.", priority: true },
  { id: 76, title: "Tener una marca que trascienda y signifique algo", category: "social", horizon: "largo", done: false, notes: "No solo un negocio. Una marca con identidad, valores y propósito que perdure.", priority: true },
  { id: 77, title: "Mi depa con gran estilo — exactamente como lo imagino", category: "personal", horizon: "mediano", done: false, notes: "Cada detalle pensado. Que entre y sienta que ese lugar es completamente yo.", priority: true },
  { id: 75, title: "Reponer regalos de bodas — personal y uno por uno", category: "social", horizon: "mediano", done: false, notes: "Más de 60 bodas sin regalo. No todos, pero sí los más cercanos. Algo personal, no genérico. Hacerlo con intención.", priority: false },
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
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [showDone, setShowDone] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: "", category: "experiencias", horizon: "corto", notes: "", priority: false });
  const [expandedId, setExpandedId] = useState(null);

  const nextId = () => Math.max(0, ...items.map(i => i.id)) + 1;

  const openAdd = () => {
    setForm({ title: "", category: "experiencias", horizon: "corto", notes: "", priority: false });
    setModal("add");
  };

  const openEdit = (item) => {
    setForm({ ...item });
    setModal(item);
  };

  const saveItem = () => {
    if (!form.title.trim()) return;
    if (modal === "add") {
      setItems(prev => [...prev, { ...form, id: nextId(), done: false }]);
    } else {
      setItems(prev => prev.map(i => i.id === modal.id ? { ...i, ...form } : i));
    }
    setModal(null);
  };

  const toggleDone = (id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    setModal(null);
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

  return (
    <div style={styles.root}>
      <div style={styles.bgNoise} />
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
              <circle
                cx="40" cy="40" r="34" fill="none"
                stroke="#e8c547" strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
                strokeLinecap="round"
                style={{ transformOrigin: "center", transform: "rotate(-90deg)", transition: "stroke-dashoffset 0.6s ease" }}
              />
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
                  return (
                    <div
                      key={item.id}
                      style={{
                        ...styles.card,
                        ...(item.done ? styles.cardDone : {}),
                        ...(item.priority && !item.done ? styles.cardPriority : {}),
                        borderLeftColor: horizon.color,
                      }}
                    >
                      <div style={styles.cardTop}>
                        <button
                          style={{ ...styles.checkBtn, borderColor: horizon.color, background: item.done ? horizon.color : "transparent" }}
                          onClick={() => toggleDone(item.id)}
                        >
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
                        <div style={styles.cardNotes}>
                          <p style={styles.notesText}>📝 {item.notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
        {filtered.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>🌟</p>
            <p style={styles.emptyText}>Tu bucket list está vacío.<br />¡Empieza agregando tu primer sueño!</p>
            <button style={styles.addBtn} onClick={openAdd}>＋ Agregar ítem</button>
          </div>
        )}
      </main>

      {modal !== null && (
        <div style={styles.overlay} onClick={() => setModal(null)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>{modal === "add" ? "Nuevo sueño" : "Editar ítem"}</h2>
            <label style={styles.label}>Título *</label>
            <input
              style={styles.input}
              placeholder="¿Qué quieres hacer?"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              autoFocus
            />
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
              <button style={styles.saveBtn} onClick={saveItem}>{modal === "add" ? "Agregar" : "Guardar"}</button>
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
  header: { position: "relative", zIndex: 1, padding: "48px 40px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" },
  headerTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 },
  headerEyebrow: { fontSize: 11, letterSpacing: "0.4em", color: "#e8c547", margin: "0 0 4px" },
  headerTitle: { fontSize: "clamp(36px, 6vw, 64px)", fontWeight: "bold", margin: 0, letterSpacing: "0.06em", lineHeight: 1, color: "#f0ece3" },
  headerSub: { marginTop: 10, fontSize: 14, color: "rgba(240,236,227,0.5)", fontStyle: "italic", letterSpacing: "0.02em" },
  progressBlock: { display: "flex", alignItems: "center", gap: 12, flexShrink: 0 },
  progressRing: { width: 80, height: 80 },
  progressLabel: { fontSize: 13, color: "rgba(240,236,227,0.7)", textAlign: "center", lineHeight: 1.4 },
  horizonStats: { display: "flex", gap: 28, flexWrap: "wrap" },
  horizonStat: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 16px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.2s" },
  horizonDot: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0, transition: "box-shadow 0.2s" },
  horizonStatNum: { fontSize: 20, fontWeight: "bold", margin: 0, lineHeight: 1 },
  horizonStatLabel: { fontSize: 11, opacity: 0.5, margin: 0, letterSpacing: "0.05em" },
  controls: { position: "relative", zIndex: 1, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" },
  catFilters: { display: "flex", gap: 8, flexWrap: "wrap" },
  catBtn: { padding: "6px 14px", borderRadius: 20, fontSize: 12, border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(240,236,227,0.6)", cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.03em", fontFamily: "'Georgia', serif" },
  catBtnActive: { background: "rgba(232,197,71,0.15)", borderColor: "#e8c547", color: "#e8c547" },
  rightControls: { display: "flex", alignItems: "center", gap: 16 },
  showDoneToggle: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(240,236,227,0.5)", cursor: "pointer", userSelect: "none" },
  addBtn: { padding: "8px 20px", borderRadius: 20, background: "#e8c547", color: "#0d0d0f", border: "none", cursor: "pointer", fontSize: 13, fontWeight: "bold", letterSpacing: "0.05em", fontFamily: "'Georgia', serif", transition: "opacity 0.15s" },
  main: { position: "relative", zIndex: 1, padding: "32px 40px 60px" },
  section: { marginBottom: 48 },
  sectionHeader: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  sectionLine: { width: 4, height: 40, borderRadius: 2, flexShrink: 0 },
  sectionTitle: { fontSize: 13, fontWeight: "bold", letterSpacing: "0.2em", margin: 0, textTransform: "uppercase" },
  sectionSub: { fontSize: 11, margin: "2px 0 0", opacity: 0.4, letterSpacing: "0.05em" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 },
  card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: "3px solid", borderRadius: 10, padding: "14px 16px", transition: "all 0.2s" },
  cardDone: { opacity: 0.45, background: "rgba(255,255,255,0.02)" },
  cardPriority: { background: "rgba(232,197,71,0.06)", borderColor: "rgba(255,255,255,0.12)" },
  cardTop: { display: "flex", alignItems: "flex-start", gap: 12 },
  checkBtn: { width: 22, height: 22, borderRadius: "50%", border: "2px solid", cursor: "pointer", flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", padding: 0 },
  checkMark: { fontSize: 12, color: "#0d0d0f", fontWeight: "bold" },
  cardContent: { flex: 1, cursor: "pointer" },
  cardTitle: { fontSize: 14, margin: "0 0 6px", lineHeight: 1.4, fontWeight: "normal" },
  priorityStar: { color: "#e8c547" },
  catTag: { fontSize: 11, color: "rgba(240,236,227,0.4)", letterSpacing: "0.03em" },
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
  groupBtn: { padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(240,236,227,0.6)", cursor: "pointer", fontSize: 12, lineHeight: 1.4, fontFamily: "'Georgia', serif", transition: "all 0.15s", textAlign: "center" },
  groupBtnActive: { background: "rgba(232,197,71,0.12)", borderColor: "#e8c547", color: "#e8c547" },
  priorityLabel: { display: "flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 13, color: "rgba(240,236,227,0.6)", cursor: "pointer", userSelect: "none" },
  modalActions: { display: "flex", gap: 10, marginTop: 28, justifyContent: "flex-end" },
  deleteBtn: { padding: "8px 16px", borderRadius: 8, background: "rgba(232,71,71,0.15)", border: "1px solid rgba(232,71,71,0.3)", color: "#e84747", cursor: "pointer", fontSize: 13, fontFamily: "'Georgia', serif", marginRight: "auto" },
  cancelBtn: { padding: "8px 20px", borderRadius: 8, background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(240,236,227,0.6)", cursor: "pointer", fontSize: 13, fontFamily: "'Georgia', serif" },
  saveBtn: { padding: "8px 24px", borderRadius: 8, background: "#e8c547", color: "#0d0d0f", border: "none", cursor: "pointer", fontSize: 13, fontWeight: "bold", fontFamily: "'Georgia', serif" },
};
