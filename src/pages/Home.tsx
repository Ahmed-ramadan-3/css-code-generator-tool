import { useEffect, useMemo, useState } from "react";
import { Copy, Layers3, Plus, Sparkles, Square, Type, WandSparkles } from "lucide-react";
import { toast } from "sonner";

/* Cyber Foundry page: asymmetric 3-panel RTL control deck, electric dark glass, strong hierarchy, tactile interactions. */

type Mode = "button" | "card" | "text";
type ButtonPreset = "ghost" | "glass" | "neon" | "retro" | "skew" | "gradient-solid";
type HoverEffect = "tilt" | "shine" | "border-draw" | "liquid" | "magnetic" | "spotlight" | "glitch" | "pulse" | "flip";
type CanvasPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
type FlexDirection = "row" | "column";
type JustifyContent = "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
type AlignItems = "flex-start" | "center" | "flex-end" | "stretch";
type BorderStyle = "solid" | "dashed" | "dotted" | "double";
type CardImagePlacement = "top" | "left" | "background";
type TextPreset = "aurora" | "outline" | "glitch-text" | "chrome" | "stacked" | "pricing-headline" | "editorial-headline" | "product-title" | "cta-copy";
type CardPreset = "glass-card" | "spotlight-card" | "pricing-card" | "editorial-card" | "product-card" | "cta-card";
type ExportMode = "css" | "html-css";

interface HomeProps {
  targetSection?: string;
}

interface GeneratorState {
  mode: Mode;
  buttonPreset: ButtonPreset;
  hoverEffect: HoverEffect;
  width: number;
  height: number;
  fontSize: number;
  letterSpacing: number;
  borderRadius: number;
  borderWidth: number;
  borderStyle: BorderStyle;
  borderColor: string;
  textColor: string;
  solidColor: string;
  backgroundOpacity: number;
  gradientAngle: number;
  gradientStops: string[];
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  shadowColor: string;
  backdropBlur: number;
  paddingX: number;
  paddingY: number;
  canvasPlacement: CanvasPlacement;
  flexDirection: FlexDirection;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
  gap: number;
  buttonText: string;
  cardTitle: string;
  cardDescription: string;
  textContent: string;
  showCardImage: boolean;
  cardImagePlacement: CardImagePlacement;
  textPreset: TextPreset;
  cardPreset: CardPreset;
  exportMode: ExportMode;
}

const modeOptions = [
  { value: "button", label: "تصميم زر", icon: WandSparkles },
  { value: "card", label: "تصميم كارد", icon: Square },
  { value: "text", label: "تصميم نص", icon: Type },
] as const;

const buttonPresetOptions = [
  { value: "ghost", label: "Ghost / Outline" },
  { value: "glass", label: "Glassmorphism" },
  { value: "neon", label: "Neon Glow" },
  { value: "retro", label: "Retro / Brutalist 3D" },
  { value: "skew", label: "Modern Border Skew" },
  { value: "gradient-solid", label: "Gradient Fill-to-Solid" },
] as const;

const hoverEffectOptions = [
  { value: "tilt", label: "3D Tilt / Parallax" },
  { value: "shine", label: "Shine / Swipe" },
  { value: "border-draw", label: "Border Draw" },
  { value: "liquid", label: "Liquid Fill" },
  { value: "magnetic", label: "Magnetic Lift" },
  { value: "spotlight", label: "Spotlight Sweep" },
  { value: "glitch", label: "Glitch Burst" },
  { value: "pulse", label: "Pulse Ring" },
  { value: "flip", label: "Flip Lift" },
] as const;

const borderStyleOptions = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
] as const;

const justifyOptions = [
  { value: "flex-start", label: "من البداية" },
  { value: "center", label: "في المنتصف" },
  { value: "flex-end", label: "من النهاية" },
  { value: "space-between", label: "توزيع بيني" },
  { value: "space-around", label: "توزيع محيط" },
] as const;

const alignOptions = [
  { value: "flex-start", label: "بداية" },
  { value: "center", label: "وسط" },
  { value: "flex-end", label: "نهاية" },
  { value: "stretch", label: "تمدد" },
] as const;

const cardImageOptions = [
  { value: "top", label: "أعلى الكارد" },
  { value: "left", label: "يسار الكارد" },
  { value: "background", label: "خلفية كاملة" },
] as const;

const textPresetOptions = [
  { value: "aurora", label: "Aurora Glow" },
  { value: "outline", label: "Outline Stroke" },
  { value: "glitch-text", label: "Glitch Type" },
  { value: "chrome", label: "Chrome Shine" },
  { value: "stacked", label: "Stacked Shadow" },
  { value: "pricing-headline", label: "Pricing Headline" },
  { value: "editorial-headline", label: "Editorial Headline" },
  { value: "product-title", label: "Product Title" },
  { value: "cta-copy", label: "CTA Copy" },
] as const;

const cardPresetOptions = [
  { value: "glass-card", label: "Glass Info Card" },
  { value: "spotlight-card", label: "Spotlight Feature" },
  { value: "pricing-card", label: "Pricing Block" },
  { value: "editorial-card", label: "Editorial Panel" },
  { value: "product-card", label: "Product Showcase" },
  { value: "cta-card", label: "CTA Conversion Card" },
] as const;

const exportModeOptions = [
  { value: "css", label: "CSS فقط" },
  { value: "html-css", label: "نسخ HTML + CSS" },
] as const;

const placementGrid = [
  { value: "top-left", row: 0, col: 0 },
  { value: "top-center", row: 0, col: 1 },
  { value: "top-right", row: 0, col: 2 },
  { value: "center-left", row: 1, col: 0 },
  { value: "center", row: 1, col: 1 },
  { value: "center-right", row: 1, col: 2 },
  { value: "bottom-left", row: 2, col: 0 },
  { value: "bottom-center", row: 2, col: 1 },
  { value: "bottom-right", row: 2, col: 2 },
] as const;

const initialState: GeneratorState = {
  mode: "button",
  buttonPreset: "glass",
  hoverEffect: "shine",
  width: 260,
  height: 78,
  fontSize: 24,
  letterSpacing: 0.4,
  borderRadius: 22,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#5ee6ff",
  textColor: "#f7fbff",
  solidColor: "#0ea5e9",
  backgroundOpacity: 0.72,
  gradientAngle: 135,
  gradientStops: ["#22d3ee", "#3b82f6", "#8b5cf6"],
  shadowBlur: 34,
  shadowSpread: 0,
  shadowOpacity: 0.55,
  shadowColor: "#22d3ee",
  backdropBlur: 18,
  paddingX: 28,
  paddingY: 18,
  canvasPlacement: "center",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 14,
  buttonText: "ابدأ الآن",
  cardTitle: "منصة تصميم CSS متقدمة",
  cardDescription: "جرّب التأثيرات لحظيًا، عدّل كل التفاصيل، ثم انسخ الكود النظيف مباشرة إلى مشروعك.",
  textContent: "نص مستقبلي مبهر",
  showCardImage: true,
  cardImagePlacement: "top",
  textPreset: "aurora",
  cardPreset: "glass-card",
  exportMode: "css",
};

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const normalized = clean.length === 3 ? clean.split("").map((char) => `${char}${char}`).join("") : clean;
  const bigint = Number.parseInt(normalized, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatCssValue(value: string | number) {
  return typeof value === "number" ? String(value) : value;
}

function buildBlock(selector: string, declarations: Array<[string, string | number | undefined | null]>) {
  const lines = declarations.reduce<Array<[string, string | number]>>((accumulator, [property, value]) => {
    if (value !== undefined && value !== null && value !== "") accumulator.push([property, value]);
    return accumulator;
  }, []);
  if (!lines.length) return "";
  return `${selector} {\n${lines.map(([property, value]) => `  ${property}: ${formatCssValue(value)};`).join("\n")}\n}`;
}

function buildGradient(angle: number, stops: string[]) {
  const resolvedStops = stops.length > 1 ? stops : [stops[0], stops[0]];
  const spacing = 100 / Math.max(1, resolvedStops.length - 1);
  return `linear-gradient(${angle}deg, ${resolvedStops
    .map((stop, index) => `${stop} ${Math.round(index * spacing)}%`)
    .join(", ")})`;
}

function previewPlacement(value: CanvasPlacement) {
  const map: Record<CanvasPlacement, { justifyContent: string; alignItems: string }> = {
    "top-left": { justifyContent: "flex-start", alignItems: "flex-start" },
    "top-center": { justifyContent: "center", alignItems: "flex-start" },
    "top-right": { justifyContent: "flex-end", alignItems: "flex-start" },
    "center-left": { justifyContent: "flex-start", alignItems: "center" },
    center: { justifyContent: "center", alignItems: "center" },
    "center-right": { justifyContent: "flex-end", alignItems: "center" },
    "bottom-left": { justifyContent: "flex-start", alignItems: "flex-end" },
    "bottom-center": { justifyContent: "center", alignItems: "flex-end" },
    "bottom-right": { justifyContent: "flex-end", alignItems: "flex-end" },
  };
  return map[value];
}

function SliderControl({
  label,
  hint,
  min,
  max,
  step,
  value,
  onChange,
  suffix = "px",
}: {
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="control-label">{label}</label>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-cyan-100">
          {value}
          {suffix}
        </span>
      </div>
      <input
        className="cyber-range"
        max={max}
        min={min}
        step={step}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <p className="control-hint">{hint}</p>
    </div>
  );
}

function FieldShell({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <section className="control-shell space-y-5 rounded-[1.4rem] p-4 sm:p-5">
      <div className="space-y-1.5">
        <p className="section-kicker">Control Zone</p>
        <h3 className="section-title text-lg">{title}</h3>
        <p className="text-sm leading-7 text-slate-300/78">{hint}</p>
      </div>
      {children}
    </section>
  );
}

function TextPresetLibrary({ value, onChange }: { value: TextPreset; onChange: (value: TextPreset) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {textPresetOptions.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-[1.2rem] border p-3 text-right transition ${active ? "border-cyan-300/50 bg-cyan-300/14 text-white" : "border-white/10 bg-white/4 text-slate-300 hover:border-cyan-300/25 hover:bg-white/8"}`}
          >
            <div className="mb-3 flex h-20 items-center justify-center overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(5,8,22,0.96),rgba(11,18,34,0.88))]">
              <span className={`text-lg font-black tracking-wide ${
                option.value === "aurora"
                  ? "bg-linear-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent"
                  : option.value === "outline"
                    ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.9)]"
                    : option.value === "glitch-text"
                      ? "text-cyan-100 [text-shadow:2px_0_0_rgba(34,211,238,0.7),-2px_0_0_rgba(244,114,182,0.65)]"
                      : option.value === "chrome"
                        ? "bg-linear-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
                        : option.value === "pricing-headline"
                          ? "bg-linear-to-r from-violet-200 via-sky-300 to-cyan-300 bg-clip-text text-transparent uppercase"
                          : option.value === "editorial-headline"
                            ? "text-slate-100 tracking-[0.25em]"
                            : option.value === "product-title"
                              ? "bg-linear-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent"
                              : option.value === "cta-copy"
                                ? "text-white [text-shadow:0_0_18px_rgba(34,211,238,0.5)]"
                                : "text-white [text-shadow:3px_3px_0_rgba(34,211,238,0.35),6px_6px_0_rgba(0,0,0,0.35)]"
              }`}>Aa</span>
            </div>
            <div className="text-sm font-black text-white">{option.label}</div>
          </button>
        );
      })}
    </div>
  );
}

function CardPresetLibrary({ value, onChange }: { value: CardPreset; onChange: (value: CardPreset) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cardPresetOptions.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-[1.2rem] border p-3 text-right transition ${active ? "border-cyan-300/50 bg-cyan-300/14 text-white" : "border-white/10 bg-white/4 text-slate-300 hover:border-cyan-300/25 hover:bg-white/8"}`}
          >
            <div className="mb-3 overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(5,8,22,0.96),rgba(11,18,34,0.88))] p-3">
              <div className={`rounded-[0.9rem] border border-white/10 p-3 ${
                option.value === "glass-card"
                  ? "bg-white/8 backdrop-blur-md"
                  : option.value === "spotlight-card"
                    ? "bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.22),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]"
                    : option.value === "pricing-card"
                      ? "bg-linear-to-b from-violet-500/18 to-slate-950"
                      : option.value === "editorial-card"
                        ? "bg-linear-to-br from-slate-900 to-slate-800"
                        : option.value === "product-card"
                          ? "bg-linear-to-br from-sky-500/18 to-violet-500/15"
                          : "bg-linear-to-r from-cyan-500/22 via-sky-500/18 to-violet-500/22"
              }`}>
                <div className="mb-2 h-8 w-12 rounded-lg bg-white/12" />
                <div className="mb-1 h-2.5 w-3/4 rounded-full bg-white/18" />
                <div className="h-2.5 w-1/2 rounded-full bg-white/12" />
              </div>
            </div>
            <div className="text-sm font-black text-white">{option.label}</div>
          </button>
        );
      })}
    </div>
  );
}

function HoverTemplateLibrary({
  value,
  onChange,
}: {
  value: HoverEffect;
  onChange: (value: HoverEffect) => void;
}) {
  const [pressedPreview, setPressedPreview] = useState<HoverEffect | null>(null);
  const [pinnedPreview, setPinnedPreview] = useState<HoverEffect | null>(null);

  const activateTouchPreview = (effect: HoverEffect) => {
    setPressedPreview(effect);
    window.clearTimeout((activateTouchPreview as unknown as { timer?: number }).timer);
    (activateTouchPreview as unknown as { timer?: number }).timer = window.setTimeout(() => setPressedPreview(null), 900);
  };

  const togglePinnedPreview = (effect: HoverEffect) => {
    setPinnedPreview((current) => (current === effect ? null : effect));
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {hoverEffectOptions.map((option) => {
        const active = value === option.value;
        const isPinnedPreview = pinnedPreview === option.value;
        const isTouchPreview = pressedPreview === option.value || isPinnedPreview;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            onPointerDown={() => {
              if (option.value === "shine" || option.value === "liquid") {
                activateTouchPreview(option.value);
                togglePinnedPreview(option.value);
              }
            }}
            className={`group rounded-[1.2rem] border p-3 text-right transition ${
              active
                ? "border-cyan-300/50 bg-cyan-300/14 shadow-[0_0_0_1px_rgba(103,232,249,0.16)_inset]"
                : "border-white/10 bg-white/4 hover:border-cyan-300/25 hover:bg-white/8"
            }`}
          >
            <div className="relative mb-3 overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(5,8,22,0.96),rgba(11,18,34,0.88))] p-3">
              <div className="relative flex h-20 items-center justify-center rounded-[0.9rem] border border-dashed border-cyan-200/15 bg-[radial-gradient(circle_at_50%_10%,rgba(34,211,238,0.16),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]">
                <div
                  className={`relative flex h-11 min-w-28 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/30 px-4 text-xs font-extrabold text-white transition duration-500 ${
                    option.value === "tilt"
                      ? "bg-linear-to-r from-cyan-400/25 via-sky-500/25 to-violet-500/25 group-hover:-translate-y-1 group-hover:rotate-1"
                      : option.value === "shine"
                        ? `bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 before:absolute before:inset-y-0 before:w-10 before:skew-x-[-24deg] before:bg-white/60 before:blur-sm before:content-[''] group-hover:before:translate-x-40 ${isTouchPreview ? "before:translate-x-40" : "before:-translate-x-16"}`
                        : option.value === "border-draw"
                          ? "bg-slate-950 after:absolute after:inset-1 after:scale-x-40 after:rounded-xl after:border after:border-cyan-300/70 after:opacity-0 after:transition group-hover:after:scale-100 group-hover:after:opacity-100 after:content-['']"
                          : option.value === "liquid"
                            ? `bg-slate-950 before:absolute before:inset-x-0 before:bottom-0 before:bg-linear-to-t before:from-cyan-400/70 before:to-sky-500/70 before:transition-all before:duration-500 before:content-[''] group-hover:before:h-full ${isTouchPreview ? "before:h-full" : "before:h-0"}`
                            : option.value === "spotlight"
                              ? "bg-slate-950 before:absolute before:inset-[-20%] before:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.55),transparent_30%)] before:opacity-0 before:transition before:duration-500 before:content-[''] group-hover:before:opacity-100 group-hover:before:translate-x-3"
                              : option.value === "glitch"
                                ? "bg-slate-950 [text-shadow:2px_0_0_rgba(34,211,238,0.65),-2px_0_0_rgba(244,114,182,0.55)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                : option.value === "pulse"
                                  ? "bg-linear-to-r from-cyan-500/18 to-sky-500/18 shadow-[0_0_0_0_rgba(34,211,238,0.35)] group-hover:shadow-[0_0_0_10px_rgba(34,211,238,0)]"
                                  : option.value === "flip"
                                    ? "bg-linear-to-r from-slate-900 via-sky-950 to-slate-900 [transform:perspective(700px)_rotateX(0deg)] group-hover:[transform:perspective(700px)_rotateX(12deg)_translateY(-4px)]"
                                    : "bg-linear-to-r from-slate-900 via-sky-950 to-slate-900 shadow-[0_14px_30px_rgba(34,211,238,0.16)] group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_40px_rgba(34,211,238,0.28)]"
                  }`}
                >
                  <span className="relative z-10">Preview</span>
                </div>
              </div>
              {(option.value === "shine" || option.value === "liquid") && isPinnedPreview && (
                <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-cyan-300/35 bg-cyan-300/15 px-2.5 py-1 text-[10px] font-black tracking-[0.18em] text-cyan-100">
                  مثبت
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-sm font-black text-white">{option.label}</div>
              <div className="text-xs leading-6 text-slate-300/72">
                {option.value === "tilt"
                  ? "ميل ثلاثي الأبعاد خفيف مع إحساس parallax."
                  : option.value === "shine"
                    ? "لمعة قطرية سريعة تمر فوق العنصر، وتعمل أيضًا عند اللمس مع إمكانية تثبيت المعاينة داخل الكارت."
                    : option.value === "border-draw"
                      ? "رسم تدريجي للحدود حول العنصر."
                      : option.value === "liquid"
                        ? "امتلاء سائل من الأسفل إلى الأعلى، ويظهر أيضًا باللمس مع تثبيت المعاينة داخل الكارت."
                        : option.value === "spotlight"
                          ? "إضاءة موضعية متحركة تركّز الانتباه على العنصر."
                          : option.value === "glitch"
                            ? "نبضة glitch رقمية سريعة ولمسة cyber."
                            : option.value === "pulse"
                              ? "حلقة pulse متوسعة تلفت الانتباه للعنصر."
                              : option.value === "flip"
                                ? "رفع مع قلبة خفيفة تعطي عمقًا إضافيًا."
                                : "ارتفاع مغناطيسي بظل متسع وواضح."}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function Home({ targetSection }: HomeProps) {
  const [state, setState] = useState<GeneratorState>(initialState);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (targetSection) document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
  }, [targetSection]);

  const gradient = useMemo(() => buildGradient(state.gradientAngle, state.gradientStops), [state.gradientAngle, state.gradientStops]);
  const shadowColorRgba = useMemo(() => rgba(state.shadowColor, clamp(state.shadowOpacity, 0.05, 1)), [state.shadowColor, state.shadowOpacity]);
  const fillColor = useMemo(() => rgba(state.solidColor, clamp(state.backgroundOpacity, 0.08, 1)), [state.backgroundOpacity, state.solidColor]);
  const canvasFlex = previewPlacement(state.canvasPlacement);

  const applyTextPreset = (preset: TextPreset) => {
    setState((previous) => {
      const common = { ...previous, textPreset: preset, mode: "text" as Mode };
      switch (preset) {
        case "outline":
          return { ...common, textColor: "#f8fafc", shadowColor: "#38bdf8", fontSize: 58, letterSpacing: 1.6, borderWidth: 0, gradientStops: ["#e2e8f0", "#94a3b8", "#38bdf8"] };
        case "glitch-text":
          return { ...common, textColor: "#e0f2fe", shadowColor: "#f472b6", fontSize: 54, letterSpacing: 1.2, gradientStops: ["#22d3ee", "#f472b6", "#818cf8"] };
        case "chrome":
          return { ...common, textColor: "#f8fafc", shadowColor: "#cbd5e1", fontSize: 60, letterSpacing: 1, gradientStops: ["#ffffff", "#cbd5e1", "#475569"] };
        case "stacked":
          return { ...common, textColor: "#f8fafc", shadowColor: "#22d3ee", fontSize: 56, letterSpacing: 2, gradientStops: ["#ffffff", "#67e8f9", "#0f172a"] };
        case "pricing-headline":
          return { ...common, textContent: "ابدأ بالخطة المناسبة", textColor: "#f8fafc", shadowColor: "#818cf8", fontSize: 52, letterSpacing: 1.1, gradientStops: ["#c4b5fd", "#818cf8", "#22d3ee"] };
        case "editorial-headline":
          return { ...common, textContent: "رؤية تحريرية واضحة", textColor: "#f8fafc", shadowColor: "#94a3b8", fontSize: 58, letterSpacing: 2.2, gradientStops: ["#ffffff", "#cbd5e1", "#64748b"] };
        case "product-title":
          return { ...common, textContent: "منتج مصمم للإبهار", textColor: "#f8fafc", shadowColor: "#38bdf8", fontSize: 54, letterSpacing: 1.2, gradientStops: ["#67e8f9", "#38bdf8", "#0f172a"] };
        case "cta-copy":
          return { ...common, textContent: "ابدأ التجربة الآن", textColor: "#ffffff", shadowColor: "#22d3ee", fontSize: 50, letterSpacing: 1.8, gradientStops: ["#ffffff", "#67e8f9", "#22d3ee"] };
        default:
          return { ...common, textColor: "#f7fbff", shadowColor: "#22d3ee", fontSize: 56, letterSpacing: 1.4, gradientStops: ["#22d3ee", "#3b82f6", "#8b5cf6"] };
      }
    });
  };

  const applyCardPreset = (preset: CardPreset) => {
    setState((previous) => {
      const common = { ...previous, cardPreset: preset, mode: "card" as Mode };
      switch (preset) {
        case "spotlight-card":
          return { ...common, showCardImage: true, cardImagePlacement: "background", paddingX: 30, paddingY: 28, borderRadius: 28, gap: 16, shadowColor: "#22d3ee" };
        case "pricing-card":
          return { ...common, showCardImage: false, paddingX: 28, paddingY: 30, borderRadius: 24, gap: 12, shadowColor: "#818cf8", cardTitle: "الخطة الاحترافية", cardDescription: "حل متكامل للمشاريع التي تحتاج تحكمًا عميقًا في الشكل والتفاعل." };
        case "editorial-card":
          return { ...common, showCardImage: true, cardImagePlacement: "left", paddingX: 26, paddingY: 24, borderRadius: 12, gap: 18, shadowColor: "#94a3b8", cardTitle: "افتتاحية رقمية أنيقة", cardDescription: "تصميم تحريري يوازن بين الوضوح والبنية البصرية النظيفة." };
        case "product-card":
          return { ...common, showCardImage: true, cardImagePlacement: "top", paddingX: 24, paddingY: 24, borderRadius: 26, gap: 14, shadowColor: "#38bdf8", cardTitle: "واجهة عرض منتج", cardDescription: "قالب يبرز المنتج والعنوان والوصف مع حضور بصري قوي." };
        case "cta-card":
          return { ...common, showCardImage: false, cardImagePlacement: "top", paddingX: 30, paddingY: 28, borderRadius: 30, gap: 14, shadowColor: "#22d3ee", cardTitle: "جاهز للانطلاق؟", cardDescription: "بطاقة تحويل موجهة لاتخاذ إجراء سريع مع تركيز بصري على الرسالة الأساسية." };
        default:
          return { ...common, showCardImage: true, cardImagePlacement: "top", paddingX: 28, paddingY: 24, borderRadius: 24, gap: 14, shadowColor: "#22d3ee" };
      }
    });
  };

  const visualProfile = useMemo(() => {
    const base = {
      background: gradient,
      textFill: state.textColor,
      extra: [] as Array<[string, string]>,
      hover: [] as Array<[string, string]>,
      active: [] as Array<[string, string]>,
    };

    if (state.mode === "button") {
      switch (state.buttonPreset) {
        case "ghost":
          base.background = "transparent";
          base.extra.push(["box-shadow", `inset 0 0 0 1px ${rgba(state.borderColor, 0.4)}`]);
          base.hover.push(["background", gradient]);
          base.hover.push(["color", "#ffffff"]);
          break;
        case "glass":
          base.background = `linear-gradient(180deg, ${rgba("#ffffff", 0.16)}, ${rgba(state.solidColor, 0.16)}), ${rgba("#0f172a", 0.42)}`;
          base.extra.push(["backdrop-filter", `blur(${state.backdropBlur}px)`]);
          base.extra.push(["-webkit-backdrop-filter", `blur(${state.backdropBlur}px)`]);
          base.extra.push(["box-shadow", `inset 0 1px 0 rgba(255,255,255,0.22), 0 18px ${state.shadowBlur}px ${shadowColorRgba}`]);
          base.hover.push(["box-shadow", `inset 0 1px 0 rgba(255,255,255,0.28), 0 24px ${state.shadowBlur + 10}px ${rgba(state.shadowColor, 0.72)}`]);
          break;
        case "neon":
          base.background = `linear-gradient(180deg, ${rgba("#020617", 0.96)}, ${rgba("#0f172a", 0.92)})`;
          base.extra.push(["box-shadow", `0 0 ${state.shadowBlur}px ${rgba(state.shadowColor, 0.46)}, 0 0 ${state.shadowBlur * 1.5}px ${rgba(state.shadowColor, 0.2)}, inset 0 0 0 1px ${rgba(state.borderColor, 0.4)}`]);
          base.hover.push(["box-shadow", `0 0 ${state.shadowBlur + 8}px ${rgba(state.shadowColor, 0.8)}, 0 0 ${state.shadowBlur * 2}px ${rgba(state.shadowColor, 0.45)}, inset 0 0 0 1px ${rgba(state.borderColor, 0.75)}`]);
          break;
        case "retro":
          base.background = fillColor;
          base.extra.push(["box-shadow", `8px 8px 0 rgba(0, 0, 0, 0.8)`]);
          base.extra.push(["border-width", `${Math.max(2, state.borderWidth + 1)}px`]);
          base.extra.push(["border-color", "#020617"]);
          base.extra.push(["border-style", "solid"]);
          base.hover.push(["transform", "translate3d(-2px, -2px, 0)"]);
          base.active.push(["transform", "translate3d(6px, 6px, 0)"]);
          base.active.push(["box-shadow", `2px 2px 0 rgba(0, 0, 0, 0.85)`]);
          break;
        case "skew":
          base.background = `linear-gradient(180deg, ${rgba("#0f172a", 0.82)}, ${rgba("#0f172a", 0.6)})`;
          base.extra.push(["overflow", "visible"]);
          base.hover.push(["transform", "translateY(-6px) skewX(-8deg)"]);
          break;
        case "gradient-solid":
          base.background = gradient;
          base.hover.push(["background", state.solidColor]);
          break;
      }
    }

    if (state.mode === "card") {
      base.background = state.showCardImage && state.cardImagePlacement === "background"
        ? `linear-gradient(180deg, ${rgba("#020617", 0.28)}, ${rgba("#020617", 0.84)}), ${gradient}`
        : `linear-gradient(180deg, ${rgba("#ffffff", 0.08)}, ${rgba("#0f172a", 0.18)}), ${rgba("#0f172a", 0.76)}`;
      base.extra.push(["text-align", "start"]);
      base.extra.push(["align-items", state.cardImagePlacement === "left" ? "stretch" : state.alignItems]);
      base.extra.push(["justify-content", state.justifyContent]);
      base.hover.push(["transform", "translateY(-10px) scale(1.012)"]);
      base.hover.push(["box-shadow", `0 26px ${state.shadowBlur + 20}px ${rgba(state.shadowColor, 0.36)}`]);
      if (state.cardPreset === "pricing-card") {
        base.background = `linear-gradient(180deg, ${rgba("#0f172a", 0.98)}, ${rgba("#111827", 0.94)})`;
        base.extra.push(["border-color", rgba("#818cf8", 0.5)]);
        base.extra.push(["box-shadow", `0 22px ${state.shadowBlur}px ${rgba("#818cf8", 0.18)}`]);
      }
      if (state.cardPreset === "editorial-card") {
        base.background = `linear-gradient(135deg, ${rgba("#111827", 0.96)}, ${rgba("#020617", 0.88)})`;
        base.extra.push(["border-radius", `${Math.max(8, state.borderRadius - 10)}px`]);
      }
      if (state.cardPreset === "spotlight-card") {
        base.extra.push(["box-shadow", `0 28px ${state.shadowBlur + 12}px ${rgba(state.shadowColor, 0.32)}, inset 0 1px 0 rgba(255,255,255,0.12)`]);
      }
      if (state.cardPreset === "product-card") {
        base.extra.push(["background", `linear-gradient(180deg, ${rgba("#082f49", 0.48)}, ${rgba("#020617", 0.9)})`]);
      }
      if (state.cardPreset === "cta-card") {
        base.extra.push(["background", gradient]);
        base.extra.push(["border-color", rgba("#ffffff", 0.22)]);
        base.hover.push(["transform", "translateY(-12px) scale(1.02)"]);
      }
    }

    if (state.mode === "text") {
      base.background = gradient;
      base.textFill = "transparent";
      base.extra.push(["background-clip", "text"]);
      base.extra.push(["-webkit-background-clip", "text"]);
      base.extra.push(["color", "transparent"]);
      base.extra.push(["text-shadow", `0 0 ${Math.max(10, state.shadowBlur)}px ${rgba(state.shadowColor, 0.36)}`]);
      base.extra.push(["box-shadow", "none"]);
      base.hover.push(["filter", `drop-shadow(0 0 ${Math.max(12, state.shadowBlur)}px ${rgba(state.shadowColor, 0.55)})`]);
      base.hover.push(["transform", "translateY(-6px) scale(1.02)"]);
      if (state.textPreset === "outline") {
        base.background = "transparent";
        base.textFill = "transparent";
        base.extra.push(["-webkit-text-stroke", `1.5px ${state.textColor}`]);
        base.extra.push(["text-shadow", `0 0 ${Math.max(6, state.shadowBlur - 8)}px ${rgba(state.shadowColor, 0.24)}`]);
      }
      if (state.textPreset === "glitch-text") {
        base.extra.push(["text-shadow", `2px 0 0 ${rgba("#22d3ee", 0.75)}, -2px 0 0 ${rgba("#f472b6", 0.72)}, 0 0 ${Math.max(8, state.shadowBlur - 4)}px ${rgba(state.shadowColor, 0.22)}`]);
      }
      if (state.textPreset === "chrome") {
        base.extra.push(["filter", "contrast(1.2) saturate(0.9)"]);
      }
      if (state.textPreset === "stacked") {
        base.extra.push(["text-shadow", `3px 3px 0 ${rgba("#22d3ee", 0.35)}, 6px 6px 0 rgba(0,0,0,0.28)`]);
      }
      if (state.textPreset === "pricing-headline") {
        base.extra.push(["text-transform", "uppercase"]);
      }
      if (state.textPreset === "editorial-headline") {
        base.extra.push(["letter-spacing", `${Math.max(1.4, state.letterSpacing)}px`]);
      }
      if (state.textPreset === "product-title") {
        base.hover.push(["filter", `drop-shadow(0 0 ${Math.max(14, state.shadowBlur)}px ${rgba("#38bdf8", 0.45)})`]);
      }
      if (state.textPreset === "cta-copy") {
        base.hover.push(["transform", "translateY(-4px) scale(1.03)"]);
      }
    }

    return base;
  }, [fillColor, gradient, shadowColorRgba, state]);

  const baseDeclarations = useMemo(() => {
    const declarations: Array<[string, string]> = [
      ["position", "relative"],
      ["display", "inline-flex"],
      ["isolation", "isolate"],
      ["align-items", state.alignItems],
      ["justify-content", state.justifyContent],
      ["flex-direction", state.flexDirection],
      ["gap", `${state.gap}px`],
      ["width", `${state.width}px`],
      ["min-height", `${state.height}px`],
      ["padding", `${state.paddingY}px ${state.paddingX}px`],
      ["border-radius", `${state.borderRadius}px`],
      ["border-width", `${state.borderWidth}px`],
      ["border-style", state.borderStyle],
      ["border-color", state.borderColor],
      ["background", visualProfile.background],
      ["color", visualProfile.textFill],
      ["font-size", `${state.fontSize}px`],
      ["font-weight", state.mode === "text" ? "900" : "800"],
      ["letter-spacing", `${state.letterSpacing}px`],
      ["line-height", state.mode === "card" ? "1.4" : "1"],
      ["text-decoration", "none"],
      ["overflow", state.buttonPreset === "skew" ? "visible" : "hidden"],
      ["cursor", "pointer"],
      ["user-select", "none"],
      ["transition", "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 320ms cubic-bezier(0.22, 1, 0.36, 1), color 320ms cubic-bezier(0.22, 1, 0.36, 1), filter 320ms cubic-bezier(0.22, 1, 0.36, 1)"],
      ["transform-style", "preserve-3d"],
      ["box-shadow", state.mode === "text" ? "none" : `0 14px ${state.shadowBlur}px ${state.shadowSpread}px ${shadowColorRgba}`],
      ["backdrop-filter", state.mode === "button" && state.buttonPreset === "glass" ? `blur(${state.backdropBlur}px)` : `blur(${Math.max(0, state.backdropBlur * 0.35)}px)`],
      ["-webkit-backdrop-filter", state.mode === "button" && state.buttonPreset === "glass" ? `blur(${state.backdropBlur}px)` : `blur(${Math.max(0, state.backdropBlur * 0.35)}px)`],
    ];
    visualProfile.extra.forEach((declaration) => declarations.push(declaration));
    if (state.hoverEffect === "tilt") declarations.push(["transform", "perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translate3d(0, 0, 0)"]);
    if (state.mode === "text") {
      declarations.push(["width", "auto"]);
      declarations.push(["min-height", "auto"]);
      declarations.push(["padding", `${Math.max(8, state.paddingY / 2)}px ${Math.max(6, state.paddingX / 3)}px`]);
      declarations.push(["border-width", "0px"]);
    }
    return declarations;
  }, [shadowColorRgba, state, visualProfile]);

  const hoverDeclarations = useMemo(() => {
    const declarations: Array<[string, string]> = [
      ["border-color", rgba(state.borderColor, 0.96)],
      ["box-shadow", state.mode === "text" ? "none" : `0 22px ${state.shadowBlur + 12}px ${state.shadowSpread + 2}px ${rgba(state.shadowColor, clamp(state.shadowOpacity + 0.12, 0.12, 1))}`],
      ["transform", state.mode === "text" ? "translateY(-6px) scale(1.02)" : "translateY(-8px) scale(1.02)"],
    ];
    if (state.hoverEffect === "tilt") declarations[2] = ["transform", "perspective(1100px) rotateX(var(--rx, -8deg)) rotateY(var(--ry, 8deg)) translate3d(0, -10px, 0) scale(1.02)"];
    if (state.hoverEffect === "magnetic") {
      declarations[2] = ["transform", "translate3d(0, -12px, 0) scale(1.03)"];
      declarations.push(["box-shadow", `0 28px ${state.shadowBlur + 18}px ${state.shadowSpread + 6}px ${rgba(state.shadowColor, 0.52)}`]);
    }
    if (state.hoverEffect === "spotlight") declarations.push(["filter", `brightness(1.08) drop-shadow(0 0 ${Math.max(12, state.shadowBlur)}px ${rgba(state.shadowColor, 0.28)})`]);
    if (state.hoverEffect === "glitch") declarations[2] = ["transform", "translate3d(2px, -2px, 0) scale(1.015)"];
    if (state.hoverEffect === "pulse") declarations.push(["box-shadow", `0 0 0 10px ${rgba(state.shadowColor, 0)}, 0 0 0 2px ${rgba(state.shadowColor, 0.45)}`]);
    if (state.hoverEffect === "flip") declarations[2] = ["transform", "perspective(1000px) rotateX(12deg) translateY(-8px) scale(1.02)"];
    visualProfile.hover.forEach((declaration) => declarations.push(declaration));
    return declarations;
  }, [state, visualProfile.hover]);

  const activeDeclarations = useMemo(() => {
    const declarations: Array<[string, string]> = [
      ["transform", state.mode === "text" ? "translateY(0) scale(0.985)" : "translateY(2px) scale(0.985)"],
      ["box-shadow", state.mode === "text" ? "none" : `0 10px ${Math.max(8, state.shadowBlur - 8)}px ${Math.max(0, state.shadowSpread)}px ${rgba(state.shadowColor, 0.26)}`],
    ];
    visualProfile.active.forEach((declaration) => declarations.push(declaration));
    return declarations;
  }, [state, visualProfile.active]);

  const beforeDeclarations = useMemo(() => {
    const declarations: Array<[string, string]> = [
      ["content", '""'],
      ["position", "absolute"],
      ["inset", "0"],
      ["border-radius", "inherit"],
      ["pointer-events", "none"],
      ["transition", "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), inset 320ms cubic-bezier(0.22, 1, 0.36, 1), clip-path 420ms cubic-bezier(0.22, 1, 0.36, 1)"],
      ["z-index", "0"],
    ];
    switch (state.hoverEffect) {
      case "shine":
        declarations.push(["background", "linear-gradient(120deg, transparent 22%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0.68) 49%, rgba(255,255,255,0.08) 60%, transparent 76%)"]);
        declarations.push(["transform", "translateX(140%) skewX(-24deg)"]);
        declarations.push(["opacity", "0"]);
        break;
      case "border-draw":
        declarations.push(["inset", "8px"]);
        declarations.push(["border", `1px solid ${rgba(state.borderColor, 0.85)}`]);
        declarations.push(["transform", "scaleX(0.2) scaleY(0.55)"]);
        declarations.push(["opacity", "0"]);
        break;
      case "liquid":
        declarations.push(["background", gradient]);
        declarations.push(["transform", "translateY(100%)"]);
        declarations.push(["opacity", "1"]);
        break;
      case "magnetic":
        declarations.push(["background", `radial-gradient(circle at 50% 50%, ${rgba(state.shadowColor, 0.28)}, transparent 70%)`]);
        declarations.push(["opacity", "0"]);
        declarations.push(["transform", "scale(0.84)"]);
        break;
      case "spotlight":
        declarations.push(["background", `radial-gradient(circle at 20% 20%, ${rgba("#ffffff", 0.55)}, transparent 22%)`]);
        declarations.push(["opacity", "0"]);
        declarations.push(["transform", "translateX(-20%) translateY(-10%) scale(1.2)"]);
        break;
      case "glitch":
        declarations.push(["background", `linear-gradient(90deg, transparent, ${rgba("#22d3ee", 0.2)}, transparent)`]);
        declarations.push(["opacity", "0"]);
        declarations.push(["transform", "translateX(-20%) skewX(-16deg)"]);
        break;
      case "pulse":
        declarations.push(["border", `1px solid ${rgba(state.borderColor, 0.75)}`]);
        declarations.push(["opacity", "0"]);
        declarations.push(["transform", "scale(0.75)"]);
        break;
      case "flip":
        declarations.push(["background", `linear-gradient(180deg, ${rgba("#ffffff", 0.08)}, transparent)`]);
        declarations.push(["opacity", "0.8"]);
        declarations.push(["transform-origin", "top center"]);
        break;
      default:
        declarations.push(["background", `radial-gradient(circle at 50% 0%, ${rgba("#ffffff", 0.18)}, transparent 60%)`]);
        declarations.push(["opacity", state.mode === "text" ? "0" : "1"]);
        break;
    }
    if (state.buttonPreset === "skew") {
      declarations.push(["border", `1px solid ${rgba(state.borderColor, 0.75)}`]);
      declarations.push(["transform", "skewX(-16deg)"]);
      declarations.push(["inset", "-10px -14px 10px -14px"]);
      declarations.push(["background", "transparent"]);
      declarations.push(["opacity", "1"]);
    }
    return declarations;
  }, [gradient, state]);

  const beforeHoverDeclarations = useMemo(() => {
    switch (state.hoverEffect) {
      case "shine":
        return [["transform", "translateX(-140%) skewX(-24deg)"], ["opacity", "1"]] as Array<[string, string]>;
      case "border-draw":
        return [["transform", "scaleX(1) scaleY(1)"], ["inset", "0px"], ["opacity", "1"]] as Array<[string, string]>;
      case "liquid":
        return [["transform", "translateY(0%)"]] as Array<[string, string]>;
      case "magnetic":
        return [["transform", "scale(1.15)"], ["opacity", "1"]] as Array<[string, string]>;
      case "spotlight":
        return [["transform", "translateX(110%) translateY(20%) scale(1.5)"], ["opacity", "1"]] as Array<[string, string]>;
      case "glitch":
        return [["transform", "translateX(120%) skewX(-16deg)"], ["opacity", "1"]] as Array<[string, string]>;
      case "pulse":
        return [["transform", "scale(1.35)"], ["opacity", "1"]] as Array<[string, string]>;
      case "flip":
        return [["transform", "rotateX(180deg)"], ["opacity", "0.1"]] as Array<[string, string]>;
      default:
        return [] as Array<[string, string]>;
    }
  }, [state.hoverEffect]);

  const afterDeclarations = useMemo(() => {
    const declarations: Array<[string, string]> = [
      ["content", '""'],
      ["position", "absolute"],
      ["inset", "auto 14px 12px 14px"],
      ["height", "1px"],
      ["background", `linear-gradient(90deg, transparent, ${rgba(state.borderColor, 0.88)}, transparent)`],
      ["opacity", state.mode === "text" ? "0.9" : "0.6"],
      ["transform", "scaleX(0.6)"],
      ["transition", "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms cubic-bezier(0.22, 1, 0.36, 1)"],
      ["pointer-events", "none"],
    ];
    if (state.hoverEffect === "border-draw") {
      declarations.push(["inset", "12px auto 12px 12px"]);
      declarations.push(["width", "1px"]);
      declarations.push(["height", "calc(100% - 24px)"]);
      declarations.push(["transform", "scaleY(0.15)"]);
      declarations.push(["background", `linear-gradient(180deg, transparent, ${rgba(state.borderColor, 0.95)}, transparent)`]);
    }
    if (state.hoverEffect === "glitch") declarations.push(["background", `linear-gradient(90deg, transparent, ${rgba("#f472b6", 0.7)}, transparent)`]);
    if (state.hoverEffect === "pulse") declarations.push(["opacity", "0"]);
    if (state.buttonPreset === "skew") {
      declarations.push(["transform", "skewX(-18deg) scaleX(0.82)"]);
      declarations.push(["inset", "auto 10px -6px 10px"]);
      declarations.push(["height", "calc(100% + 12px)"]);
      declarations.push(["background", `linear-gradient(180deg, transparent, ${rgba(state.borderColor, 0.3)}, transparent)`]);
    }
    return declarations;
  }, [state]);

  const afterHoverDeclarations = useMemo(() => {
    if (state.hoverEffect === "border-draw") return [["transform", "scaleY(1)"]] as Array<[string, string]>;
    if (state.hoverEffect === "pulse") return [["transform", "scale(1.4)"], ["opacity", "1"]] as Array<[string, string]>;
    return [["transform", state.buttonPreset === "skew" ? "skewX(-18deg) scaleX(1)" : "scaleX(1)"], ["opacity", "1"]] as Array<[string, string]>;
  }, [state.buttonPreset, state.hoverEffect]);

  const previewCss = useMemo(() => {
    const scope = ".playground-scope ";
    return [
      buildBlock(`${scope}.custom-design`, baseDeclarations),
      buildBlock(`${scope}.custom-design .inner-stack`, [
        ["position", "relative"],
        ["z-index", "2"],
        ["display", "flex"],
        ["width", "100%"],
        ["flex-direction", state.flexDirection],
        ["align-items", state.alignItems],
        ["justify-content", state.justifyContent],
        ["gap", `${state.gap}px`],
      ]),
      buildBlock(`${scope}.custom-design .sample-pill`, [
        ["display", state.mode === "button" ? "inline-flex" : "none"],
        ["align-items", "center"],
        ["justify-content", "center"],
        ["width", `${Math.max(20, state.fontSize + 10)}px`],
        ["height", `${Math.max(20, state.fontSize + 10)}px`],
        ["border-radius", "999px"],
        ["background", rgba("#ffffff", 0.12)],
        ["border", `1px solid ${rgba("#ffffff", 0.22)}`],
        ["font-size", `${Math.max(10, state.fontSize - 8)}px`],
        ["font-weight", "800"],
      ]),
      buildBlock(`${scope}.custom-design .card-media`, [
        ["display", state.mode === "card" && state.showCardImage ? "block" : "none"],
        ["width", state.cardImagePlacement === "left" ? "34%" : "100%"],
        ["min-height", state.cardImagePlacement === "top" ? "140px" : "160px"],
        ["border-radius", `${Math.max(18, state.borderRadius - 4)}px`],
        ["background", `linear-gradient(135deg, ${rgba("#ffffff", 0.1)}, ${rgba("#ffffff", 0.03)}), ${gradient}`],
        ["border", `1px solid ${rgba(state.borderColor, 0.32)}`],
        ["box-shadow", `inset 0 1px 0 rgba(255,255,255,0.12), 0 18px 44px ${rgba(state.shadowColor, 0.16)}`],
        ["position", state.cardImagePlacement === "background" ? "absolute" : "relative"],
        ["inset", state.cardImagePlacement === "background" ? "0" : "auto"],
        ["opacity", state.cardImagePlacement === "background" ? "0.38" : "1"],
        ["z-index", state.cardImagePlacement === "background" ? "0" : "1"],
        ["overflow", "hidden"],
      ]),
      buildBlock(`${scope}.custom-design .card-media::before`, [
        ["content", '""'],
        ["position", "absolute"],
        ["inset", "12% 14% auto auto"],
        ["width", "40%"],
        ["aspect-ratio", "1 / 1"],
        ["border-radius", "999px"],
        ["background", rgba("#ffffff", 0.12)],
        ["filter", "blur(10px)"],
      ]),
      buildBlock(`${scope}.custom-design .card-media::after`, [
        ["content", '""'],
        ["position", "absolute"],
        ["inset", "0"],
        ["background-image", "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)"],
        ["background-size", "24px 24px"],
        ["mix-blend-mode", "overlay"],
        ["opacity", "0.32"],
      ]),
      buildBlock(`${scope}.custom-design .card-copy`, [
        ["position", "relative"],
        ["z-index", "2"],
        ["display", "flex"],
        ["flex-direction", "column"],
        ["gap", `${Math.max(8, state.gap - 4)}px`],
        ["flex", "1"],
      ]),
      buildBlock(`${scope}.custom-design .card-title`, [
        ["font-size", `${Math.max(20, state.fontSize)}px`],
        ["font-weight", "900"],
        ["line-height", "1.25"],
        ["color", state.textColor],
      ]),
      buildBlock(`${scope}.custom-design .card-description`, [
        ["font-size", `${Math.max(13, state.fontSize - 8)}px`],
        ["font-weight", "500"],
        ["line-height", "1.9"],
        ["color", rgba("#ffffff", 0.8)],
      ]),
      buildBlock(`${scope}.custom-design:hover, ${scope}.custom-design.is-hover`, hoverDeclarations),
      buildBlock(`${scope}.custom-design:active, ${scope}.custom-design.is-active`, activeDeclarations),
      buildBlock(`${scope}.custom-design::before`, beforeDeclarations),
      buildBlock(`${scope}.custom-design:hover::before, ${scope}.custom-design.is-hover::before`, beforeHoverDeclarations),
      buildBlock(`${scope}.custom-design::after`, afterDeclarations),
      buildBlock(`${scope}.custom-design:hover::after, ${scope}.custom-design.is-hover::after`, afterHoverDeclarations),
      buildBlock(`${scope}.custom-design .text-content`, [
        ["position", "relative"],
        ["z-index", "2"],
        ["display", "inline-block"],
        ["filter", `drop-shadow(0 0 ${Math.max(10, state.shadowBlur)}px ${rgba(state.shadowColor, 0.18)})`],
      ]),
      buildBlock(`${scope}.custom-design .inner-stack.skew-fix`, [["transform", state.buttonPreset === "skew" ? "skewX(16deg)" : "none"]]),
      buildBlock(`${scope}.custom-design.card-layout .inner-stack`, [
        ["align-items", state.cardImagePlacement === "left" ? "stretch" : state.alignItems],
        ["flex-direction", state.cardImagePlacement === "left" ? "row" : "column"],
      ]),
    ].filter(Boolean).join("\n\n");
  }, [activeDeclarations, afterDeclarations, afterHoverDeclarations, baseDeclarations, beforeDeclarations, beforeHoverDeclarations, gradient, hoverDeclarations, state]);

  const exportedCss = useMemo(() => {
    const helpers = [
      buildBlock(`.custom-design .inner-stack`, [
        ["position", "relative"],
        ["z-index", "2"],
        ["display", "flex"],
        ["width", "100%"],
        ["flex-direction", state.flexDirection],
        ["align-items", state.alignItems],
        ["justify-content", state.justifyContent],
        ["gap", `${state.gap}px`],
      ]),
      buildBlock(`.custom-design .sample-pill`, [
        ["display", state.mode === "button" ? "inline-flex" : "none"],
        ["align-items", "center"],
        ["justify-content", "center"],
        ["width", `${Math.max(20, state.fontSize + 10)}px`],
        ["height", `${Math.max(20, state.fontSize + 10)}px`],
        ["border-radius", "999px"],
        ["background", rgba("#ffffff", 0.12)],
        ["border", `1px solid ${rgba("#ffffff", 0.22)}`],
        ["font-size", `${Math.max(10, state.fontSize - 8)}px`],
        ["font-weight", "800"],
      ]),
      buildBlock(`.custom-design .text-content`, [
        ["position", "relative"],
        ["z-index", "2"],
        ["display", "inline-block"],
      ]),
      buildBlock(`.custom-design .inner-stack.skew-fix`, [["transform", state.buttonPreset === "skew" ? "skewX(16deg)" : "none"]]),
      state.mode === "card"
        ? buildBlock(`.custom-design.card-layout .inner-stack`, [
            ["align-items", state.cardImagePlacement === "left" ? "stretch" : state.alignItems],
            ["flex-direction", state.cardImagePlacement === "left" ? "row" : "column"],
          ])
        : "",
      state.mode === "card" && state.showCardImage
        ? buildBlock(`.custom-design .card-media`, [
            ["display", "block"],
            ["width", state.cardImagePlacement === "left" ? "34%" : "100%"],
            ["min-height", state.cardImagePlacement === "top" ? "140px" : "160px"],
            ["border-radius", `${Math.max(18, state.borderRadius - 4)}px`],
            ["background", `linear-gradient(135deg, ${rgba("#ffffff", 0.1)}, ${rgba("#ffffff", 0.03)}), ${gradient}`],
            ["border", `1px solid ${rgba(state.borderColor, 0.32)}`],
            ["box-shadow", `inset 0 1px 0 rgba(255,255,255,0.12), 0 18px 44px ${rgba(state.shadowColor, 0.16)}`],
            ["position", state.cardImagePlacement === "background" ? "absolute" : "relative"],
            ["inset", state.cardImagePlacement === "background" ? "0" : "auto"],
            ["opacity", state.cardImagePlacement === "background" ? "0.38" : "1"],
            ["z-index", state.cardImagePlacement === "background" ? "0" : "1"],
            ["overflow", "hidden"],
          ])
        : "",
      state.mode === "card" && state.showCardImage
        ? buildBlock(`.custom-design .card-media::before`, [
            ["content", '""'],
            ["position", "absolute"],
            ["inset", "12% 14% auto auto"],
            ["width", "40%"],
            ["aspect-ratio", "1 / 1"],
            ["border-radius", "999px"],
            ["background", rgba("#ffffff", 0.12)],
            ["filter", "blur(10px)"],
          ])
        : "",
      state.mode === "card" && state.showCardImage
        ? buildBlock(`.custom-design .card-media::after`, [
            ["content", '""'],
            ["position", "absolute"],
            ["inset", "0"],
            ["background-image", "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)"],
            ["background-size", "24px 24px"],
            ["mix-blend-mode", "overlay"],
            ["opacity", "0.32"],
          ])
        : "",
      state.mode === "card"
        ? buildBlock(`.custom-design .card-copy`, [
            ["position", "relative"],
            ["z-index", "2"],
            ["display", "flex"],
            ["flex-direction", "column"],
            ["gap", `${Math.max(8, state.gap - 4)}px`],
            ["flex", "1"],
          ])
        : "",
      state.mode === "card"
        ? buildBlock(`.custom-design .card-title`, [
            ["font-size", `${Math.max(20, state.fontSize)}px`],
            ["font-weight", "900"],
            ["line-height", "1.25"],
            ["color", state.textColor],
          ])
        : "",
      state.mode === "card"
        ? buildBlock(`.custom-design .card-description`, [
            ["font-size", `${Math.max(13, state.fontSize - 8)}px`],
            ["font-weight", "500"],
            ["line-height", "1.9"],
            ["color", rgba("#ffffff", 0.8)],
          ])
        : "",
    ].filter(Boolean).join("\n\n");

    return [
      "/* Generated by Cyber Foundry CSS Tool */",
      buildBlock(`.custom-design`, baseDeclarations),
      helpers,
      buildBlock(`.custom-design::before`, beforeDeclarations),
      buildBlock(`.custom-design:hover::before`, beforeHoverDeclarations),
      buildBlock(`.custom-design::after`, afterDeclarations),
      buildBlock(`.custom-design:hover::after`, afterHoverDeclarations),
      buildBlock(`.custom-design:hover`, hoverDeclarations),
      buildBlock(`.custom-design:active`, activeDeclarations),
    ].filter(Boolean).join("\n\n");
  }, [activeDeclarations, afterDeclarations, afterHoverDeclarations, baseDeclarations, beforeDeclarations, beforeHoverDeclarations, gradient, hoverDeclarations, state]);

  const exportedHtmlWrapper = useMemo(() => {
    if (state.mode === "button") {
      return `<button class="custom-design">\n  <span class="inner-stack ${state.buttonPreset === "skew" ? "skew-fix" : ""}">\n    <span class="sample-pill">+</span>\n    <span>${state.buttonText}</span>\n  </span>\n</button>`;
    }

    if (state.mode === "card") {
      return `<article class="custom-design card-layout">\n  <div class="inner-stack">\n    ${state.showCardImage ? '<div class="card-media" aria-hidden="true"></div>\n    ' : ""}<div class="card-copy">\n      <span class="chip">واجهة حيّة</span>\n      <div class="card-title">${state.cardTitle}</div>\n      <div class="card-description">${state.cardDescription}</div>\n    </div>\n  </div>\n</article>`;
    }

    return `<div class="custom-design">\n  <div class="inner-stack">\n    <span class="text-content">${state.textContent}</span>\n  </div>\n</div>`;
  }, [state]);

  const exportedFullSnippet = useMemo(() => {
    return [
      `<div class="css-generator-wrapper">`,
      `  ${exportedHtmlWrapper.replace(/\n/g, "\n  ")}`,
      `</div>`,
      ``,
      `<style>`,
      `.css-generator-wrapper {`,
      `  min-height: 100vh;`,
      `  display: grid;`,
      `  place-items: center;`,
      `  padding: 32px;`,
      `  background: radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.16), transparent 22%), radial-gradient(circle at 80% 0%, rgba(139, 92, 246, 0.12), transparent 20%), linear-gradient(180deg, #050816 0%, #091120 50%, #04060d 100%);`,
      `}`,
      ``,
      `.css-generator-wrapper .chip {`,
      `  display: inline-flex;`,
      `  width: fit-content;`,
      `  align-items: center;`,
      `  border-radius: 999px;`,
      `  border: 1px solid rgba(255,255,255,0.1);`,
      `  background: rgba(255,255,255,0.06);`,
      `  padding: 6px 12px;`,
      `  font-size: 12px;`,
      `  font-weight: 800;`,
      `  color: #cffafe;`,
      `}`,
      ``,
      exportedCss,
      `</style>`,
    ].join("\n");
  }, [exportedCss, exportedHtmlWrapper]);

  const activeOutput = state.exportMode === "html-css" ? exportedFullSnippet : exportedCss;

  const highlightedCode = useMemo(
    () =>
      activeOutput.split("\n").map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div className="code-line rounded-lg px-3 py-0.5" key={`blank-${index}`}>&nbsp;</div>;
        if (trimmed.startsWith("/*")) return <div className="code-line rounded-lg px-3 py-0.5 text-slate-400" key={index}>{line}</div>;
        if (trimmed.endsWith("{") || trimmed === "}") return <div className="code-line rounded-lg px-3 py-0.5 text-cyan-300" key={index}>{line}</div>;
        const [property, value] = trimmed.split(/:(.+)/);
        return (
          <div className="code-line rounded-lg px-3 py-0.5" key={index}>
            <span className="text-blue-300">{property}</span>
            <span className="text-slate-500">:</span>
            <span className="text-slate-100">{value}</span>
          </div>
        );
      }),
    [activeOutput],
  );

  const updateState = <K extends keyof GeneratorState>(key: K, value: GeneratorState[K]) => setState((previous) => ({ ...previous, [key]: value }));
  const updateGradientStop = (index: number, color: string) => setState((previous) => ({ ...previous, gradientStops: previous.gradientStops.map((stop, i) => (i === index ? color : stop)) }));
  const addGradientStop = () => setState((previous) => previous.gradientStops.length >= 6 ? previous : { ...previous, gradientStops: [...previous.gradientStops, previous.gradientStops[previous.gradientStops.length - 1] ?? "#ffffff"] });
  const removeGradientStop = (index: number) => setState((previous) => previous.gradientStops.length <= 2 ? previous : { ...previous, gradientStops: previous.gradientStops.filter((_, i) => i !== index) });
  const resetTool = () => { setState(initialState); toast.success("تمت إعادة الضبط إلى الإعدادات الافتراضية"); };
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeOutput);
      toast.success(state.exportMode === "html-css" ? "تم نسخ HTML + CSS مع الـ wrapper" : "تم نسخ كود CSS بنجاح");
    } catch {
      toast.error("تعذّر النسخ التلقائي، جرّب النسخ يدويًا");
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (state.hoverEffect !== "tilt") return;
    const target = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - target.left) / target.width;
    const relativeY = (event.clientY - target.top) / target.height;
    setTilt({ x: clamp((0.5 - relativeY) * 18, -10, 10), y: clamp((relativeX - 0.5) * 22, -12, 12) });
  };

  const triggerTouchHover = () => {
    setIsHovering(true);
    window.clearTimeout((triggerTouchHover as unknown as { timer?: number }).timer);
    (triggerTouchHover as unknown as { timer?: number }).timer = window.setTimeout(() => setIsHovering(false), 1300);
  };

  const previewClassName = ["custom-design", state.mode === "card" ? "card-layout" : "", isHovering ? "is-hover" : "", isPressed ? "is-active" : ""].filter(Boolean).join(" ");
  const displayTitle = state.mode === "button" ? state.buttonText : state.mode === "card" ? state.cardTitle : state.textContent;

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <style>{previewCss}</style>
      <div className="mx-auto flex w-full max-w-[1850px] flex-col gap-5">
        <header className="glass-panel grid-glow overflow-hidden rounded-[1.8rem] px-5 py-5 sm:px-7 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-extrabold tracking-[0.24em] text-cyan-100/90"><Sparkles className="h-4 w-4" />CSS FUTURE LAB</div>
              <div className="space-y-2">
                <h1 className="text-2xl font-black text-white sm:text-4xl">مولد أكواد CSS الاحترافي</h1>
                <p className="max-w-3xl text-sm leading-8 text-slate-300/85 sm:text-base">ملعب بصري متكامل لتصميم الأزرار والكروت وتأثيرات النص، مع معاينة فورية، تخطيط RTL عربي كامل، وتصدير كود نظيف جاهز للنسخ.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-[minmax(0,220px)_auto] sm:items-end">
              <div className="space-y-2">
                <label className="control-label">اختر وضع التصميم</label>
                <select className="cyber-select" value={state.mode} onChange={(event) => updateState("mode", event.target.value as Mode)}>
                  {modeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </div>
              <button className="rounded-2xl border border-white/12 bg-white/6 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/10" onClick={resetTool} type="button">إعادة ضبط سريعة</button>
            </div>
          </div>
        </header>

        <main className="grid gap-5 xl:grid-cols-[minmax(300px,1.02fr)_minmax(420px,1.25fr)_minmax(330px,1fr)]">
          <section className="glass-panel order-3 flex min-h-[760px] flex-col rounded-[1.7rem] xl:order-1">
            <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
              <div><p className="section-kicker">Code Output</p><h2 className="section-title text-xl">الكود الناتج</h2></div>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-2.5 text-sm font-extrabold text-cyan-50 transition hover:-translate-y-0.5 hover:bg-cyan-300/18" onClick={copyCode} type="button"><Copy className="h-4 w-4" />{state.exportMode === "html-css" ? "نسخ HTML + CSS" : "نسخ الكود"}</button>
            </div>
            <div className="px-5 pb-5 pt-4 sm:px-6">
              <div className="mb-4 space-y-3">
                <div className="grid grid-cols-2 gap-2 rounded-[1.2rem] border border-white/8 bg-white/4 p-2">
                  {exportModeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateState("exportMode", option.value)}
                      className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${state.exportMode === option.value ? "border border-cyan-300/45 bg-cyan-300/14 text-white" : "border border-transparent bg-black/10 text-slate-300 hover:border-cyan-300/20 hover:bg-white/8"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-300/75">
                <div className="rounded-2xl border border-white/8 bg-white/4 px-3 py-3"><div className="font-black text-white">{state.gradientStops.length}</div><div>ألوان التدرج</div></div>
                <div className="rounded-2xl border border-white/8 bg-white/4 px-3 py-3"><div className="font-black text-white">{state.hoverEffect}</div><div>نوع التفاعل</div></div>
                <div className="rounded-2xl border border-white/8 bg-white/4 px-3 py-3"><div className="font-black text-white">{state.mode}</div><div>الوضع الحالي</div></div>
                </div>
              </div>
              <div className="scrollbar-thin overflow-auto rounded-[1.5rem] border border-cyan-300/12 bg-[#050913]/90 p-4 font-mono text-[13px] leading-7 sm:p-5">{highlightedCode}</div>
            </div>
          </section>

          <section className="glass-panel order-1 flex min-h-[760px] flex-col overflow-hidden rounded-[1.7rem] xl:order-2">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
              <div><p className="section-kicker">Live Canvas</p><h2 className="section-title text-xl">المعاينة الحية</h2></div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200"><Layers3 className="h-4 w-4 text-cyan-300" />{displayTitle}</div>
            </div>
            <div className="playground-scope relative flex flex-1 flex-col gap-4 p-4 sm:p-6">
              <div className="grid h-full min-h-[560px] flex-1 overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.14),transparent_26%),linear-gradient(180deg,rgba(6,10,20,0.96),rgba(9,14,26,0.88))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:34px_34px] opacity-40" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
                <div className="relative z-10 flex h-full min-h-[520px] w-full rounded-[1.4rem] border border-dashed border-cyan-200/15 p-4 sm:p-8" style={canvasFlex}>
                  <div
                    className={previewClassName}
                    onClick={triggerTouchHover}
                    onPointerDown={() => setIsPressed(true)}
                    onPointerEnter={() => setIsHovering(true)}
                    onPointerLeave={() => { setIsHovering(false); setIsPressed(false); setTilt({ x: 0, y: 0 }); }}
                    onPointerMove={handlePointerMove}
                    onPointerUp={() => setIsPressed(false)}
                    style={{ ["--rx" as string]: `${tilt.x}deg`, ["--ry" as string]: `${tilt.y}deg` }}
                  >
                    {state.mode === "button" && <div className={`inner-stack ${state.buttonPreset === "skew" ? "skew-fix" : ""}`}><span className="sample-pill">+</span><span>{state.buttonText}</span></div>}
                    {state.mode === "card" && <div className="inner-stack">{state.showCardImage && <div aria-hidden="true" className="card-media" />}
                      <div className="card-copy">
                        <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/7 px-3 py-1 text-xs font-black text-cyan-100">واجهة حيّة</span>
                        <div className="card-title">{state.cardTitle}</div>
                        <div className="card-description">{state.cardDescription}</div>
                      </div>
                    </div>}
                    {state.mode === "text" && <div className="inner-stack"><span className="text-content">{state.textContent}</span></div>}
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.3rem] border border-white/8 bg-white/4 px-4 py-3"><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/75">Hover State</p><p className="mt-2 text-sm text-slate-200">{hoverEffectOptions.find((item) => item.value === state.hoverEffect)?.label}</p></div>
                <div className="rounded-[1.3rem] border border-white/8 bg-white/4 px-4 py-3"><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/75">Preset</p><p className="mt-2 text-sm text-slate-200">{buttonPresetOptions.find((item) => item.value === state.buttonPreset)?.label}</p></div>
                <div className="rounded-[1.3rem] border border-white/8 bg-white/4 px-4 py-3"><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/75">Canvas</p><p className="mt-2 text-sm text-slate-200">{state.canvasPlacement}</p></div>
              </div>
            </div>
          </section>

          <section className="glass-panel order-2 min-h-[760px] rounded-[1.7rem] xl:order-3">
            <div className="border-b border-white/8 px-5 py-4 sm:px-6"><p className="section-kicker">Control Deck</p><h2 className="section-title text-xl">لوحة التحكم</h2></div>
            <div className="scrollbar-thin flex max-h-[calc(100vh-13rem)] flex-col gap-4 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
              <FieldShell hint="بدّل بسرعة بين الأزرار والكروت وتأثيرات النص مع إعدادات مناسبة لكل وضع." title="الوضع الرئيسي">
                <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                  {modeOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = state.mode === option.value;
                    return <button className={`rounded-[1.2rem] border px-4 py-4 text-right transition ${isActive ? "border-cyan-300/50 bg-cyan-300/14 text-white shadow-[0_0_0_1px_rgba(103,232,249,0.16)_inset]" : "border-white/10 bg-white/4 text-slate-300 hover:border-cyan-300/25 hover:bg-white/8"}`} key={option.value} onClick={() => updateState("mode", option.value)} type="button"><div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-black/20 p-2.5"><Icon className="h-5 w-5" /></div><div className="font-extrabold">{option.label}</div></button>;
                  })}
                </div>
                {state.mode === "button" && <div className="space-y-2"><label className="control-label">نمط الزر</label><select className="cyber-select" value={state.buttonPreset} onChange={(event) => updateState("buttonPreset", event.target.value as ButtonPreset)}>{buttonPresetOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>}
                <div className="space-y-3">
                  <label className="control-label">مكتبة تأثيرات Hover الجاهزة</label>
                  <p className="control-hint">اختر التأثير من بطاقات معاينة مصغّرة بدل القائمة النصية التقليدية.</p>
                  <HoverTemplateLibrary value={state.hoverEffect} onChange={(value) => updateState("hoverEffect", value)} />
                </div>
              </FieldShell>

              <FieldShell hint="تحكم في موضع العنصر داخل ساحة المعاينة، ثم اضبط اتجاه ومحاذاة عناصره الداخلية بدقة." title="موقع العنصر والتحاذي (Alignment & Layout)">
                <div className="space-y-3"><label className="control-label">موضع العنصر داخل الـ Canvas</label><div className="grid grid-cols-3 gap-2 rounded-[1.2rem] border border-white/8 bg-black/10 p-2">{placementGrid.map((placement) => { const active = state.canvasPlacement === placement.value; return <button className={`aspect-square rounded-xl border transition ${active ? "border-cyan-300/55 bg-cyan-300/14 shadow-[0_0_0_1px_rgba(103,232,249,0.16)_inset]" : "border-white/8 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10"}`} key={placement.value} onClick={() => updateState("canvasPlacement", placement.value)} type="button"><div className="grid h-full place-items-center"><span className={`block h-3 w-3 rounded-full ${active ? "bg-cyan-300" : "bg-slate-500/70"}`} /></div></button>; })}</div></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><label className="control-label">اتجاه Flex</label><div className="grid grid-cols-2 gap-2"><button className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${state.flexDirection === "row" ? "border-cyan-300/50 bg-cyan-300/14 text-white" : "border-white/10 bg-white/4 text-slate-300 hover:border-cyan-300/25"}`} onClick={() => updateState("flexDirection", "row")} type="button">أفقي</button><button className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${state.flexDirection === "column" ? "border-cyan-300/50 bg-cyan-300/14 text-white" : "border-white/10 bg-white/4 text-slate-300 hover:border-cyan-300/25"}`} onClick={() => updateState("flexDirection", "column")} type="button">عمودي</button></div></div>
                  <SliderControl hint="المسافة الداخلية بين عناصر العنصر نفسه." label="Gap" max={50} min={0} step={1} value={state.gap} onChange={(value) => updateState("gap", value)} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><label className="control-label">Justify Content</label><select className="cyber-select" value={state.justifyContent} onChange={(event) => updateState("justifyContent", event.target.value as JustifyContent)}>{justifyOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
                  <div className="space-y-2"><label className="control-label">Align Items</label><select className="cyber-select" value={state.alignItems} onChange={(event) => updateState("alignItems", event.target.value as AlignItems)}>{alignOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
                </div>
              </FieldShell>

              <FieldShell hint="كل الخصائص الأساسية الدقيقة التي تبني شكل العنصر، من المقاس إلى الحواف والحروف." title="Micro-Controls الأساسية">
                <SliderControl hint="عرض العنصر الرئيسي في المعاينة والكود." label="العرض" max={520} min={120} step={1} value={state.width} onChange={(value) => updateState("width", value)} />
                <SliderControl hint="الارتفاع الأدنى للزر أو الكارد أو الحاوية النصية." label="الارتفاع" max={360} min={40} step={1} value={state.height} onChange={(value) => updateState("height", value)} />
                <SliderControl hint="درجة بروز النص داخل التصميم." label="حجم الخط" max={72} min={12} step={1} value={state.fontSize} onChange={(value) => updateState("fontSize", value)} />
                <SliderControl hint="تحكم إضافي في اتساع الحروف." label="Letter Spacing" max={12} min={-1} step={0.1} value={state.letterSpacing} onChange={(value) => updateState("letterSpacing", value)} />
                <SliderControl hint="استدارة الحواف من حاد إلى ناعم." label="Border Radius" max={80} min={0} step={1} value={state.borderRadius} onChange={(value) => updateState("borderRadius", value)} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><label className="control-label">لون النص</label><input className="cyber-input h-14 p-2" type="color" value={state.textColor} onChange={(event) => updateState("textColor", event.target.value)} /></div>
                  <div className="space-y-2"><label className="control-label">اللون الأساسي</label><input className="cyber-input h-14 p-2" type="color" value={state.solidColor} onChange={(event) => updateState("solidColor", event.target.value)} /></div>
                </div>
              </FieldShell>

              <FieldShell hint="ارسم حدودًا احترافية وتحكم في الظلال والتشويش الخلفي لإنتاج إحساس زجاجي أو نيون أو حاد." title="الحدود والظلال والـ Blur">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><label className="control-label">لون الحدود</label><input className="cyber-input h-14 p-2" type="color" value={state.borderColor} onChange={(event) => updateState("borderColor", event.target.value)} /></div>
                  <div className="space-y-2"><label className="control-label">نوع الحدود</label><select className="cyber-select" value={state.borderStyle} onChange={(event) => updateState("borderStyle", event.target.value as BorderStyle)}>{borderStyleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
                </div>
                <SliderControl hint="سمك الحدود حول العنصر." label="عرض الحدود" max={12} min={0} step={1} value={state.borderWidth} onChange={(value) => updateState("borderWidth", value)} />
                <SliderControl hint="نعومة الظل وانتشاره." label="Blur الظل" max={90} min={0} step={1} value={state.shadowBlur} onChange={(value) => updateState("shadowBlur", value)} />
                <SliderControl hint="انتشار الظل حول العنصر." label="Spread الظل" max={40} min={0} step={1} value={state.shadowSpread} onChange={(value) => updateState("shadowSpread", value)} />
                <SliderControl hint="حدة اللون في الظل." label="Opacity الظل" max={100} min={5} step={1} suffix="%" value={Math.round(state.shadowOpacity * 100)} onChange={(value) => updateState("shadowOpacity", value / 100)} />
                <SliderControl hint="قوة الـ backdrop blur، مهم جدًا مع الزجاجية." label="Backdrop Blur" max={40} min={0} step={1} value={state.backdropBlur} onChange={(value) => updateState("backdropBlur", value)} />
                <div className="space-y-2"><label className="control-label">لون الظل</label><input className="cyber-input h-14 p-2" type="color" value={state.shadowColor} onChange={(event) => updateState("shadowColor", event.target.value)} /></div>
              </FieldShell>

              <FieldShell hint="أنشئ تدرجًا غنيًا متعدد الوقفات مع تحكم حتى 6 ألوان وزاوية دوران كاملة." title="Dynamic Color Palette & Gradient">
                <SliderControl hint="زاوية التدرج من 0° إلى 360°." label="زاوية التدرج" max={360} min={0} step={1} suffix="°" value={state.gradientAngle} onChange={(value) => updateState("gradientAngle", value)} />
                <div className="rounded-[1.2rem] border border-white/8 bg-black/10 p-3"><div className="mb-3 h-14 rounded-2xl border border-white/10" style={{ background: gradient }} />
                  <div className="space-y-3">{state.gradientStops.map((stop, index) => <div className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3" key={`${stop}-${index}`}><input className="cyber-input h-12 p-1.5" type="color" value={stop} onChange={(event) => updateGradientStop(index, event.target.value)} /><input className="cyber-input" type="text" value={stop} onChange={(event) => updateGradientStop(index, event.target.value)} /><button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-slate-200 transition hover:border-red-300/30 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40" disabled={state.gradientStops.length <= 2} onClick={() => removeGradientStop(index)} type="button">حذف</button></div>)}</div>
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/24 bg-cyan-300/10 px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-cyan-300/18 disabled:cursor-not-allowed disabled:opacity-50" disabled={state.gradientStops.length >= 6} onClick={addGradientStop} type="button"><Plus className="h-4 w-4" />إضافة لون جديد</button>
              </FieldShell>

              {state.mode === "button" && <FieldShell hint="تفاصيل الزر نفسه، بما فيها النص والحشوات لتشكيل حضور بصري مختلف من CTA إلى زر صغير." title="إعدادات الزر"><div className="space-y-2"><label className="control-label">نص الزر</label><input className="cyber-input" type="text" value={state.buttonText} onChange={(event) => updateState("buttonText", event.target.value)} /></div><SliderControl hint="الحشو الأفقي الداخلي." label="Padding أفقي" max={70} min={8} step={1} value={state.paddingX} onChange={(value) => updateState("paddingX", value)} /><SliderControl hint="الحشو العمودي الداخلي." label="Padding عمودي" max={48} min={4} step={1} value={state.paddingY} onChange={(value) => updateState("paddingY", value)} /><SliderControl hint="شفافية الخلفية الأساسية لبعض الأنماط." label="Opacity الخلفية" max={100} min={5} step={1} suffix="%" value={Math.round(state.backgroundOpacity * 100)} onChange={(value) => updateState("backgroundOpacity", value / 100)} /></FieldShell>}

              {state.mode === "card" && <FieldShell hint="خصائص خاصة بالكروت، مع مكتبة جاهزة لأنماط كاملة ونصوص داخلية وموضع صورة وهمية." title="إعدادات الكارد"><div className="space-y-3"><label className="control-label">مكتبة قوالب الكارد</label><p className="control-hint">اختَر قالبًا جاهزًا وسيتم ضبط عدة خصائص تلقائيًا، وبعدها عدّل يدويًا كما تريد.</p><CardPresetLibrary value={state.cardPreset} onChange={applyCardPreset} /></div><div className="space-y-2"><label className="control-label">العنوان الرئيسي</label><input className="cyber-input" type="text" value={state.cardTitle} onChange={(event) => updateState("cardTitle", event.target.value)} /></div><div className="space-y-2"><label className="control-label">الوصف الفرعي</label><textarea className="cyber-textarea min-h-28" value={state.cardDescription} onChange={(event) => updateState("cardDescription", event.target.value)} /></div><SliderControl hint="المسافة الداخلية الأفقيّة للكارد." label="Padding أفقي" max={90} min={12} step={1} value={state.paddingX} onChange={(value) => updateState("paddingX", value)} /><SliderControl hint="المسافة الداخلية العموديّة للكارد." label="Padding عمودي" max={80} min={12} step={1} value={state.paddingY} onChange={(value) => updateState("paddingY", value)} /><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><label className="control-label">إظهار Placeholder بصري</label><div className="grid grid-cols-2 gap-2"><button className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${state.showCardImage ? "border-cyan-300/50 bg-cyan-300/14 text-white" : "border-white/10 bg-white/4 text-slate-300 hover:border-cyan-300/25"}`} onClick={() => updateState("showCardImage", true)} type="button">نعم</button><button className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${!state.showCardImage ? "border-cyan-300/50 bg-cyan-300/14 text-white" : "border-white/10 bg-white/4 text-slate-300 hover:border-cyan-300/25"}`} onClick={() => updateState("showCardImage", false)} type="button">لا</button></div></div><div className="space-y-2"><label className="control-label">موضع Placeholder</label><select className="cyber-select" value={state.cardImagePlacement} onChange={(event) => updateState("cardImagePlacement", event.target.value as CardImagePlacement)}>{cardImageOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div></div></FieldShell>}

              {state.mode === "text" && <FieldShell hint="مخصص لتأثيرات النص مع مكتبة جاهزة لأنماط متعددة وقابلية نسخ كود نظيف وخفيف." title="إعدادات النص"><div className="space-y-3"><label className="control-label">مكتبة تأثيرات النص</label><p className="control-hint">اختَر نمطًا جاهزًا للنص ثم كمّل التخصيص بالمقاسات والألوان.</p><TextPresetLibrary value={state.textPreset} onChange={applyTextPreset} /></div><div className="space-y-2"><label className="control-label">النص المعروض</label><input className="cyber-input" type="text" value={state.textContent} onChange={(event) => updateState("textContent", event.target.value)} /></div><SliderControl hint="الحشو حول النص في العرض التفاعلي." label="Padding أفقي" max={40} min={0} step={1} value={state.paddingX} onChange={(value) => updateState("paddingX", value)} /><SliderControl hint="الحشو العمودي حول النص في العرض التفاعلي." label="Padding عمودي" max={30} min={0} step={1} value={state.paddingY} onChange={(value) => updateState("paddingY", value)} /></FieldShell>}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
