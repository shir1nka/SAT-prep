"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { Calculator, ChevronDown, ChevronUp, GripHorizontal, Maximize2, Minimize2, Trash2, X } from "lucide-react";

import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

type DesmosCalculator = {
  setExpression: (expression: { id?: string; latex?: string }) => void;
  removeExpression: (expression: { id: string }) => void;
  setExpressions: (expressions: Array<{ id?: string; latex?: string }>) => void;
  setMathBounds: (bounds: { left: number; right: number; bottom: number; top: number }) => void;
  resize: () => void;
  destroy: () => void;
};

export type DesmosBounds = {
  left: number;
  right: number;
  bottom: number;
  top: number;
};

type DesmosContextValue = {
  open: (expressions?: string[], bounds?: DesmosBounds) => void;
  close: () => void;
  isOpen: boolean;
  ready: boolean;
  failed: boolean;
};

const DesmosContext = createContext<DesmosContextValue | null>(null);

const DEMO_KEY = "dcb31709b452b1cf9dc26972add0fda6";

function loadDesmosScript(apiKey: string) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }

  if (window.Desmos) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-desmos-api]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("desmos script failed")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.desmos.com/api/v1.11/calculator.js?apiKey=${apiKey}`;
    script.async = true;
    script.dataset.desmosApi = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("desmos script failed"));
    document.head.appendChild(script);
  });
}

export function DesmosProvider({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [wide, setWide] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [size, setSize] = useState({ width: 440, height: 580 });
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const hostRef = useRef<HTMLDivElement | null>(null);
  const calculatorRef = useRef<DesmosCalculator | null>(null);
  const expressionsRef = useRef<{ expressions: string[]; bounds?: DesmosBounds }>({
    expressions: ["y=x^2"],
  });

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_DESMOS_API_KEY || DEMO_KEY;
    loadDesmosScript(apiKey)
      .then(() => setReady(true))
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const applyExpressions = useCallback(
    (expressions: string[], bounds?: DesmosBounds) => {
      const calculator = calculatorRef.current;
      if (!calculator) {
        return;
      }

      // Clear the previous teaching graph so each recipe starts clean.
      for (let index = 0; index < 24; index += 1) {
        calculator.removeExpression({ id: `macro-${index}` });
      }

      expressions.forEach((latex, index) => {
        if (!latex.trim()) {
          return;
        }
        calculator.setExpression({ id: `macro-${index}`, latex });
      });

      if (bounds) {
        calculator.setMathBounds(bounds);
      } else {
        calculator.setMathBounds({ left: -10, right: 10, bottom: -6, top: 6 });
      }
    },
    []
  );

  const open = useCallback(
    (expressions?: string[], bounds?: DesmosBounds) => {
      if (expressions && expressions.length > 0) {
        expressionsRef.current = { expressions, bounds };
      }
      setIsOpen(true);
      setMinimized(false);

      if (calculatorRef.current) {
        applyExpressions(expressionsRef.current.expressions, expressionsRef.current.bounds);
      }
    },
    [applyExpressions]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setMinimized(false);
  }, []);

  // Create the calculator the first time the panel opens.
  useEffect(() => {
    const handleOpenDesmos = () => open();
    window.addEventListener("open-desmos", handleOpenDesmos);
    return () => window.removeEventListener("open-desmos", handleOpenDesmos);
  }, [open]);

  useEffect(() => {
    if (!isOpen || minimized || !ready || failed || calculatorRef.current || !hostRef.current) {
      return;
    }

    const Desmos = window.Desmos;
    if (!Desmos) {
      setFailed(true);
      return;
    }

    const calculator = new Desmos.GraphingCalculator(hostRef.current, {
      expressions: true,
      settingsMenu: false,
      zoomButtons: true,
      expressionsTopbar: true,
      border: false,
      keypad: true,
      trace: true,
      pointsOfInterest: true,
      language: language === "ru" ? "ru" : "en",
    }) as DesmosCalculator;

    calculatorRef.current = calculator;

    applyExpressions(expressionsRef.current.expressions, expressionsRef.current.bounds);
    calculator.resize();
  }, [applyExpressions, failed, isOpen, language, minimized, ready]);

  useEffect(() => {
    if (calculatorRef.current) {
      calculatorRef.current.resize();
    }
  }, [size, isMobile, isOpen, minimized]);

  useEffect(() => {
    return () => {
      calculatorRef.current?.destroy();
      calculatorRef.current = null;
    };
  }, []);

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isMobile) {
      return;
    }
    const target = event.currentTarget;
    target.setPointerCapture(event.pointerId);
    const startX = event.clientX;
    const startY = event.clientY;
    const start = position ?? {
      x: window.innerWidth - size.width - 24,
      y: window.innerHeight - size.height - 24,
    };

    const move = (moveEvent: PointerEvent) => {
      const nextX = Math.min(
        Math.max(8, start.x + moveEvent.clientX - startX),
        window.innerWidth - size.width - 8
      );
      const nextY = Math.min(
        Math.max(8, start.y + moveEvent.clientY - startY),
        window.innerHeight - size.height - 8
      );
      setPosition({ x: nextX, y: nextY });
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const startResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const move = (moveEvent: PointerEvent) => {
      setSize({
        width: Math.min(Math.max(320, startWidth + moveEvent.clientX - startX), window.innerWidth - 32),
        height: Math.min(Math.max(400, startHeight + moveEvent.clientY - startY), window.innerHeight - 32),
      });
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const resolvedPosition =
    position ??
    (typeof window !== "undefined"
      ? { x: Math.max(8, window.innerWidth - size.width - 24), y: Math.max(8, window.innerHeight - size.height - 24) }
      : { x: 24, y: 120 });

  const contextValue = useMemo<DesmosContextValue>(
    () => ({ open, close, isOpen, ready, failed }),
    [close, failed, isOpen, open, ready]
  );

  const labels =
    language === "ru"
      ? {
          open: "Открыть Desmos",
          title: "Desmos",
          close: "Закрыть калькулятор",
          clear: "Очистить",
          minimize: "Свернуть в плашку",
          expand: "Развернуть",
          shrink: "Свернуть",
          fallback: "Не удалось загрузить Desmos API — открываем обычный калькулятор.",
        }
      : {
          open: "Open Desmos",
          title: "Desmos",
          close: "Close calculator",
          clear: "Clear",
          minimize: "Minimize to bar",
          expand: "Expand",
          shrink: "Shrink",
          fallback: "Desmos API could not load — using the standard calculator.",
        };

  return (
    <DesmosContext.Provider value={contextValue}>
      {children}

      {enabled ? (
        <button
          type="button"
          onClick={() => open()}
          className={cn(
            "fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#16161c]/95 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur transition-transform hover:scale-[1.03]",
            isOpen && "pointer-events-none opacity-0"
          )}
          aria-label={labels.open}
        >
          <Calculator className="h-4 w-4 text-violet-300" />
          {labels.title}
        </button>
      ) : null}

      {isOpen ? (
        <div
          className={cn(
            "fixed z-[75] flex flex-col overflow-hidden border border-zinc-700/70 bg-[#16161c] shadow-[0_30px_90px_rgba(0,0,0,0.65)]",
            isMobile ? "inset-0 rounded-none" : "rounded-2xl"
          )}
          style={
            isMobile
              ? minimized
                ? { top: "auto", bottom: 0, height: 48 }
                : undefined
              : {
                  left: resolvedPosition.x,
                  top: resolvedPosition.y,
                  width: size.width,
                  height: minimized ? 48 : size.height,
                }
          }
          role="dialog"
          aria-label="Desmos graphing calculator"
        >
          <div
            className="flex shrink-0 touch-none items-center justify-between gap-2 border-b border-white/10 bg-[#1c1c24] px-3 py-2"
            onPointerDown={startDrag}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <GripHorizontal className="h-4 w-4 text-zinc-500" />
              <Calculator className="h-4 w-4 text-violet-300" />
              {labels.title}
            </div>
            <div className="flex items-center gap-1" onPointerDown={(event) => event.stopPropagation()}>
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => setMinimized((value) => !value)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
                aria-label={labels.minimize}
              >
                {minimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {!isMobile && !minimized ? (
                <button
                  type="button"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => {
                    setWide((value) => !value);
                    setSize(
                      wide
                        ? { width: 440, height: 580 }
                        : {
                            width: Math.min(760, window.innerWidth - 48),
                            height: Math.min(720, window.innerHeight - 48),
                          }
                    );
                  }}
                  className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
                  aria-label={wide ? labels.shrink : labels.expand}
                >
                  {wide ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
              ) : null}
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => {
                  expressionsRef.current = { expressions: [] };
                  applyExpressions([]);
                  calculatorRef.current?.setMathBounds({ left: -10, right: 10, bottom: -6, top: 6 });
                }}
                className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
                aria-label={labels.clear}
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={close}
                className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
                aria-label={labels.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!minimized ? (
            <div className="relative min-h-0 flex-1 bg-white">
              {failed ? (
                <iframe
                  src={`https://www.desmos.com/calculator?lang=${language}`}
                  title={labels.title}
                  className="h-full w-full border-0"
                  allow="clipboard-write"
                />
              ) : (
                <div ref={hostRef} className="h-full w-full" />
              )}
              {!ready && !failed ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white text-sm text-zinc-500">
                  {language === "ru" ? "Загружаем Desmos…" : "Loading Desmos…"}
                </div>
              ) : null}
            </div>
          ) : null}

          {!isMobile && !minimized ? (
            <div
              onPointerDown={startResize}
              className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize"
              aria-hidden
            >
              <div className="absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-zinc-500" />
            </div>
          ) : null}
        </div>
      ) : null}
    </DesmosContext.Provider>
  );
}

export function useDesmos() {
  const context = useContext(DesmosContext);
  if (!context) {
    throw new Error("useDesmos must be used inside DesmosProvider");
  }
  return context;
}

export function OpenInDesmos({
  expressions,
  bounds,
  children,
  className,
}: {
  expressions: string[];
  bounds?: DesmosBounds;
  children?: ReactNode;
  className?: string;
}) {
  const { open } = useDesmos();
  const { language } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => open(expressions, bounds)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-violet-400/30 bg-violet-500/10 px-2.5 py-1.5 text-xs font-semibold text-violet-200 transition-colors hover:border-violet-300/60 hover:bg-violet-500/20",
        className
      )}
    >
      <Calculator className="h-3.5 w-3.5" />
      {children ?? (language === "ru" ? "Открыть в Desmos" : "Open in Desmos")}
    </button>
  );
}

declare global {
  interface Window {
    Desmos?: any;
  }
}
