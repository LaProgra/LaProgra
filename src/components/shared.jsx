import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BarChart3, CalendarDays, CircleAlert, LogOut, Settings } from "lucide-react";

export function LaPrograMark({ compact = false }) {
  return <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#176BFF] text-white shadow-sm" aria-hidden="true"><CalendarDays size={21} strokeWidth={2.2}/></div>{!compact && <span className="text-[19px] font-semibold tracking-[-0.03em]">LaProgra</span>}</div>;
}


export function ProfileMenuMark({ compact = false, onOpenSummary, onOpenSettings, onLogout }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const menuItems = compact
    ? [
        { id: "summary", label: "Resumen", icon: BarChart3, onClick: onOpenSummary },
        { id: "settings", label: "Ajustes", icon: Settings, onClick: onOpenSettings },
        { id: "logout", label: "Cerrar sesión", icon: LogOut, onClick: onLogout, danger: true },
      ]
    : [
        { id: "logout", label: "Cerrar sesión", icon: LogOut, onClick: onLogout, danger: true },
      ];

  useEffect(() => {
    if (!open) return undefined;
    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({ top: rect.bottom + 8, left: Math.min(Math.max(12, rect.left), window.innerWidth - 204) });
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const run = (callback) => {
    setOpen(false);
    callback?.();
  };

  const portal = open && typeof document !== "undefined" ? createPortal(
    <>
      <button type="button" aria-label="Cerrar menú de usuario" onClick={() => setOpen(false)} className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-[2px]" />
      <div role="menu" aria-label="Menú de usuario" style={{ top: position.top, left: position.left }} className="fixed z-[101] w-48 overflow-hidden rounded-[14px] border border-black/[.08] bg-white p-1 shadow-2xl dark:border-white/[.1] dark:bg-[#181B20]">
        {menuItems.map(({ id, label, icon: Icon, onClick, danger }) => (
          <button key={id} type="button" role="menuitem" onClick={() => run(onClick)} className={`flex min-h-10 w-full items-center rounded-[10px] px-3 text-left text-sm font-semibold ${danger ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30" : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[.08]"}`}>
            <Icon size={16} className="mr-2" />{label}
          </button>
        ))}
      </div>
    </>,
    document.body,
  ) : null;

  return <>
    <button ref={triggerRef} type="button" onClick={() => setOpen((value) => !value)} aria-label="Abrir menú de usuario" aria-haspopup="menu" aria-expanded={open} className={`flex items-center rounded-[14px] text-left transition hover:bg-black/[.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-white/[.07] ${compact ? "p-0.5" : "w-full p-2"}`}>
      <LaPrograMark compact={compact} />
    </button>
    {portal}
  </>;
}

export function Button({ children, onClick, variant = "primary", disabled = false, type = "button", className = "", ariaLabel }) {
  const variants = { primary: "bg-[#176BFF] text-white hover:bg-[#0E57D8] focus-visible:ring-blue-500", secondary: "border border-black/10 bg-white/80 text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[.06] dark:text-white dark:hover:bg-white/[.1]", ghost: "text-slate-600 hover:bg-black/[.05] dark:text-slate-300 dark:hover:bg-white/[.07]", danger: "bg-red-600 text-white hover:bg-red-700" };
  return <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] px-4 text-sm font-semibold transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`}>{children}</button>;
}

export function Input({ label, icon: Icon, error, hint, ...props }) {
  return <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span><div className={`flex min-h-12 items-center gap-3 rounded-[14px] border bg-white px-3.5 transition focus-within:ring-2 dark:bg-white/[.045] ${error ? "border-red-400 focus-within:ring-red-200" : "border-black/10 focus-within:border-blue-500 focus-within:ring-blue-100 dark:border-white/10 dark:focus-within:ring-blue-950"}`}>{Icon && <Icon size={18} className="shrink-0 text-slate-400" aria-hidden="true"/>}<input className="w-full bg-transparent py-3 text-[15px] text-slate-950 outline-none placeholder:text-slate-400 dark:text-white" {...props}/></div>{error && <span className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600"><CircleAlert size={13}/>{error}</span>}{!error && hint && <span className="mt-1.5 block text-xs text-slate-500 dark:text-slate-400">{hint}</span>}</label>;
}
