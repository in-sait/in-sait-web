import {
  BarChart3,
  Database,
  ShieldCheck,
  Workflow,
  Sparkles,
  Target,
  Building2,
  Check,
  Route,
  type LucideIcon,
} from "lucide-react";

export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#enfoque", label: "Enfoque" },
  { href: "#dashboard", label: "Plataforma" },
  { href: "#proceso", label: "Proceso" },
  { href: "#faq", label: "FAQ" },
] as const;

export const sectors = [
  "Logística",
  "Retail",
  "Manufactura",
  "Seguros",
  "Finanzas",
  "Servicios Profesionales",
];

export type Service = { title: string; desc: string; icon: LucideIcon };

export const services: Service[] = [
  {
    title: "Business Intelligence",
    desc: "Todo tu negocio en un tablero que se entiende sin que nadie lo explique. Ventas, costos y operación al día, en la misma pantalla.",
    icon: BarChart3,
  },
  {
    title: "Integración de sistemas y datos",
    desc: "Conectamos los sistemas que hoy no se hablan. Se termina el cruce manual de planillas y cada dato aparece una sola vez, bien.",
    icon: Database,
  },
  {
    title: "Calidad y gobierno de datos",
    desc: "Un solo número por indicador, con dueño y con origen. Se termina la reunión donde cada área trae su propia versión.",
    icon: ShieldCheck,
  },
  {
    title: "Automatización de procesos",
    desc: "Lo que hoy alguien arma a mano todos los meses deja de armarse. Recuperás horas de gente cara para trabajo que sí rinde.",
    icon: Workflow,
  },
  {
    title: "Inteligencia artificial aplicada",
    desc: "IA donde da resultado: clasificar documentos, responder consultas sobre tus propios datos, anticipar demanda. No donde queda bien en una presentación.",
    icon: Sparkles,
  },
];

export type Value = { title: string; desc: string; icon: LucideIcon };

export const values: Value[] = [
  {
    title: "Un solo número",
    desc: "Cada indicador tiene una definición, un dueño y un origen. Si dos áreas informan distinto, ese es el primer problema que resolvemos.",
    icon: Target,
  },
  {
    title: "El negocio primero",
    desc: "Ningún proyecto arranca por la herramienta. Arranca por la decisión que hoy se toma tarde o a ciegas.",
    icon: Building2,
  },
  {
    title: "Simplicidad deliberada",
    desc: "Si se resuelve simple, se resuelve simple. No te vendemos complejidad que después tenés que mantener.",
    icon: Check,
  },
  {
    title: "Trazabilidad",
    desc: "Todo número se puede seguir hasta su origen. Si alguien pregunta de dónde sale, hay respuesta.",
    icon: Route,
  },
];

export type ProcessStep = { n: number; title: string; desc: string };

export const processSteps: ProcessStep[] = [
  {
    n: 1,
    title: "Comprender",
    desc: "Entendemos el negocio y el problema real antes de tocar tecnología.",
  },
  {
    n: 2,
    title: "Analizar",
    desc: "Revisamos la información disponible, sus fuentes y su calidad.",
  },
  {
    n: 3,
    title: "Diseñar",
    desc: "Definimos la solución más simple que resuelve el problema.",
  },
  {
    n: 4,
    title: "Implementar",
    desc: "Construimos con criterio de ingeniería y validamos junto al cliente.",
  },
  {
    n: 5,
    title: "Acompañar",
    desc: "Capacitamos al equipo y acompañamos la evolución de la solución.",
  },
];

export type Metric = {
  value: number | string;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: 40, prefix: "+", suffix: "%", label: "Más velocidad de reporting" },
  { value: 95, suffix: "%", label: "Calidad de datos objetivo" },
  { value: 60, prefix: "−", suffix: "%", label: "Menos trabajo manual" },
  { value: "24/7", label: "Monitoreo automatizado" },
];

export const technologies = [
  "Power BI",
  "Python",
  "PostgreSQL",
  "React",
  "TypeScript",
  "Node.js",
  "FastAPI",
  "Flutter",
  "Docker",
  "Git",
];

export const painPoints = [
  "No sabemos cuál dato es el correcto.",
  "Todo termina en Excel.",
  "Nuestros sistemas no se hablan.",
  "Perdemos horas armando reportes.",
  "No confiamos en nuestros indicadores.",
  "No sabemos por dónde empezar.",
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "¿Trabajan con empresas de cualquier tamaño?",
    a: "Trabajamos principalmente con empresas medianas y grandes que manejan volúmenes de información relevantes. Si tenés procesos manuales o sistemas desconectados, podemos ayudarte sin importar el tamaño.",
  },
  {
    q: "¿Necesito tener los datos ordenados para empezar?",
    a: "No. Parte de nuestro trabajo es justamente ordenar, integrar y mejorar la calidad de la información. Empezamos desde donde estés hoy.",
  },
  {
    q: "¿Trabajan con nuestras herramientas actuales?",
    a: "Sí. Nos integramos a tu stack actual siempre que sea posible. Elegimos la tecnología según el problema, no al revés, y evitamos reemplazos innecesarios.",
  },
  {
    q: "¿Qué pasa después de la implementación?",
    a: "Capacitamos a tu equipo y acompañamos la evolución de la solución. Buscamos una relación de largo plazo, no entregar y desaparecer.",
  },
  {
    q: "¿Cómo son los acuerdos de trabajo?",
    a: "Definimos el alcance juntos según el problema a resolver. Podemos trabajar por proyecto o de forma continua como tu socio tecnológico. Todo se acuerda con claridad desde el inicio.",
  },
];

export const contact = {
  email: "contacto@insait.com.ar",
  phone: "+54 9 11 2593 1939",
  location: "Argentina",
};

export const footerColumns = [
  {
    title: "NAVEGACIÓN",
    links: [
      { href: "#servicios", label: "Servicios" },
      { href: "#enfoque", label: "Enfoque" },
      { href: "#dashboard", label: "Plataforma" },
      { href: "#proceso", label: "Proceso" },
    ],
  },
  {
    title: "SERVICIOS",
    links: [
      { href: "#servicios", label: "Business Intelligence" },
      { href: "#servicios", label: "Integración de sistemas" },
      { href: "#servicios", label: "Automatización" },
      { href: "#servicios", label: "IA aplicada" },
    ],
  },
];
