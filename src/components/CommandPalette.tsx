import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { projects, appLab, githubWorlds } from "../data";

type Item = { id: string; label: string; hint: string; href: string };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = useMemo<Item[]>(() => {
    const list: Item[] = [
      { id: "s-about", label: "About", hint: "section", href: "#about" },
      { id: "s-skills", label: "Skills", hint: "section", href: "#skills" },
      { id: "s-projects", label: "Nodes", hint: "section", href: "#projects" },
      { id: "s-lab", label: "App Lab", hint: "section", href: "#lab" },
      { id: "s-vault", label: "Vault", hint: "section", href: "#vault" },
      { id: "s-contact", label: "Signal", hint: "section", href: "#contact" },
      ...projects.map((p) => ({ id: "p-" + p.id, label: p.name, hint: "project", href: p.repo })),
      ...appLab.map((a) => ({ id: "a-" + a.n, label: a.name, hint: "app", href: a.href })),
      ...githubWorlds.slice(0, 12).map((g) => ({ id: "g-" + g.name, label: g.name, hint: "github world", href: g.href })),
    ];
    const qq = q.toLowerCase();
    return qq ? list.filter((i) => i.label.toLowerCase().includes(qq) || i.hint.includes(qq)) : list;
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-start justify-center pt-[12vh] px-4"
          onClick={() => setOpen(false)}>
          <motion.div initial={{ y: 16, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 8, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl glass rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--line)" }}>
              <Search size={16} className="text-[#e8c36a]" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Jump to a node, app, or world…"
                className="flex-1 bg-transparent outline-none font-mono text-sm text-[var(--ink)] placeholder:text-[var(--muted)]" />
              <kbd className="font-mono text-[10px] px-2 py-1 rounded border" style={{ borderColor: "var(--line)" }}>ESC</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto py-2">
              {items.slice(0, 18).map((it) => (
                <a key={it.id} href={it.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors">
                  <span className="text-sm text-[var(--ink)]">{it.label}</span>
                  <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">{it.hint}</span>
                </a>
              ))}
              {items.length === 0 && <p className="px-4 py-6 text-sm text-[var(--muted)]">No matches.</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
