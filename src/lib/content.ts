import {
  BarChart3,
  Database,
  ShieldCheck,
  Workflow,
  Code2,
  Target,
  Building2,
  Check,
  MessageSquare,
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
  "Salud",
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
    desc: "Dashboards y reportes confiables que todos entienden. Una sola fuente de verdad para tu operación.",
    icon: BarChart3,
  },
  {
    title: "Data Analytics & Engineering",
    desc: "Integramos tus sistemas, limpiamos y modelamos los datos para que dejen de vivir en planillas sueltas.",
    icon: Database,
  },
  {
    title: "Calidad y Gobierno de Datos",
    desc: "Definimos qué dato es el correcto y por qué. Trazabilidad, reglas y confianza en cada indicador.",
    icon: ShieldCheck,
  },
  {
    title: "Automatización de procesos",
    desc: "Eliminamos tareas manuales repetitivas con flujos automáticos y confiables. Menos Excel, más tiempo.",
    icon: Workflow,
  },
  {
    title: "Desarrollo de software",
    desc: "Aplicaciones internas y soluciones cloud construidas para durar, mantenerse y escalar con tu operación.",
    icon: Code2,
  },
];

export type Value = { title: string; desc: string; icon: LucideIcon };

export const values: Value[] = [
  {
    title: "La ingeniería primero",
    desc: "Las decisiones técnicas están fundamentadas. La calidad del software importa tanto como el resultado visual.",
    icon: Target,
  },
  {
    title: "El negocio primero",
    desc: "Toda solución responde a una necesidad concreta. Nunca desarrollamos tecnología por moda.",
    icon: Building2,
  },
  {
    title: "Simplicidad",
    desc: "Si algo puede resolverse de forma simple, esa será siempre la opción preferida. La complejidad se justifica.",
    icon: Check,
  },
  {
    title: "Transparencia",
    desc: "Explicamos nuestras decisiones y documentamos el trabajo. Hablamos claro, sin lenguaje innecesario.",
    icon: MessageSquare,
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
  phone: "+54 9 11 1234 5678",
  location: "Gualeguaychu, Argentina",
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
      { href: "#servicios", label: "Data Analytics" },
      { href: "#servicios", label: "Automatización" },
      { href: "#servicios", label: "Desarrollo de software" },
    ],
  },
];
