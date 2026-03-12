import { useState, useEffect, useMemo } from "react";

// ─── DONNÉES INITIALES (à personnaliser) ────────────────────────────────────
const INITIAL_DATA = [
  {
    id: 1,
    nom: "TechCorp",
    secteur: "Tech / SaaS",
    statut: "Relance",
    poste: "Data Engineer Senior",
    ref: "TC-2025-042",
    contacts: [
      { nom: "Marie Dupont", poste: "Responsable RH", email: "m.dupont@techcorp.fr", tel: "+33 1 23 45 67 89" },
      { nom: "Jean-Paul Martin", poste: "Manager Data", email: "jp.martin@techcorp.fr", tel: "LinkedIn" },
    ],
    actions: [
      { date: "2025-01-10", texte: "Découverte de l'offre sur LinkedIn" },
      { date: "2025-01-12", texte: "Envoi CV + lettre de motivation" },
      { date: "2025-01-15", texte: "Relance par email — pas de réponse" },
    ],
    taches: [
      { texte: "Relancer Marie Dupont", priorite: "haute", fait: false },
      { texte: "Envoyer portfolio GitHub", priorite: "haute", fait: false },
      { texte: "Préparer questions entretien", priorite: "normale", fait: false },
    ],
    liens: [
      { label: "Offre officielle", url: "https://techcorp.fr/careers" },
      { label: "Avis Glassdoor", url: "https://glassdoor.com" },
    ],
    deadline: "2025-01-20",
    dateDebut: "2025-01-10",
    notes: "Marie est l'interlocutrice RH. JP est le futur N+1.",
  },
  {
    id: 2,
    nom: "InnovaGroup",
    secteur: "Conseil / Analytics",
    statut: "En cours",
    poste: "Consultant Data & IA",
    ref: "IG-JAN-07",
    contacts: [
      { nom: "Sophie Bernard", poste: "Talent Acquisition", email: "s.bernard@innovagroup.com", tel: "Cooptation via Thomas" },
    ],
    actions: [
      { date: "2025-01-08", texte: "Offre transmise par Thomas" },
      { date: "2025-01-12", texte: "Envoi candidature à Sophie Bernard" },
    ],
    taches: [
      { texte: "Préparer le cas technique", priorite: "haute", fait: false },
      { texte: "Relancer si pas de retour le 22/01", priorite: "normale", fait: false },
    ],
    liens: [
      { label: "Offre officielle", url: "https://innovagroup.com/jobs" },
      { label: "Rapport annuel 2024", url: "https://innovagroup.com/rapport.pdf" },
    ],
    deadline: "2025-01-27",
    dateDebut: "2025-01-08",
    notes: "Mentionner Thomas dans les échanges.",
  },
  {
    id: 3,
    nom: "DataVision",
    secteur: "Scale-up / Data",
    statut: "Entretien",
    poste: "Data Scientist / NLP",
    ref: "DV-2025-NLP-01",
    contacts: [
      { nom: "Lucie Chen", poste: "Head of People", email: "l.chen@datavision.io", tel: "+33 6 78 90 12 34" },
      { nom: "Romain Favre", poste: "Lead Data Scientist", email: "r.favre@datavision.io", tel: "LinkedIn" },
    ],
    actions: [
      { date: "2025-01-03", texte: "Candidature spontanée envoyée" },
      { date: "2025-01-08", texte: "Réponse positive, entretien RH planifié" },
      { date: "2025-01-10", texte: "Entretien RH (30 min). Retour très positif !" },
      { date: "2025-01-14", texte: "Réception du brief exercice NLP" },
    ],
    taches: [
      { texte: "Préparer l'exercice NLP (deadline 30/01)", priorite: "haute", fait: false },
      { texte: "Réviser LangChain, RAG, fine-tuning", priorite: "haute", fait: false },
      { texte: "Email remerciement à Lucie", priorite: "normale", fait: true },
    ],
    liens: [
      { label: "Offre DataVision", url: "https://datavision.io/careers" },
      { label: "Brief exercice NLP", url: "https://drive.google.com" },
    ],
    deadline: "2025-02-05",
    dateDebut: "2025-01-03",
    notes: "Très bon feeling avec Romain. Suivre sur LinkedIn.",
  },
  {
    id: 4,
    nom: "StartupXYZ",
    secteur: "FinTech / Startup",
    statut: "En cours",
    poste: "Backend Engineer Python",
    ref: "—",
    contacts: [
      { nom: "Alex Moreau", poste: "CTO", email: "alex@startupxyz.co", tel: "LinkedIn" },
    ],
    actions: [
      { date: "2025-01-07", texte: "Message LinkedIn à Alex Moreau" },
      { date: "2025-01-08", texte: "Réponse d'Alex, envoi CV" },
    ],
    taches: [
      { texte: "Relancer Alex avant le 22/01 (J+14)", priorite: "normale", fait: false },
      { texte: "Étudier le produit (démo sur le site)", priorite: "normale", fait: false },
    ],
    liens: [
      { label: "Site StartupXYZ", url: "https://startupxyz.co" },
      { label: "CrunchBase", url: "https://crunchbase.com" },
    ],
    deadline: "",
    dateDebut: "2025-01-07",
    notes: "Série A. Equity significative à négocier.",
  },
  {
    id: 5,
    nom: "ConsultCo",
    secteur: "Conseil en stratégie",
    statut: "En cours",
    poste: "Analyste Stratégie Data",
    ref: "CC-2025-08",
    contacts: [
      { nom: "Isabelle Vauban", poste: "Recruteuse Senior", email: "i.vauban@consultco.fr", tel: "+33 1 44 55 66 77" },
    ],
    actions: [
      { date: "2025-01-03", texte: "Découverte offre via Welcome to the Jungle" },
      { date: "2025-01-05", texte: "Candidature déposée. LM à finaliser." },
    ],
    taches: [
      { texte: "Finaliser lettre de motivation", priorite: "haute", fait: false },
      { texte: "Relancer si pas de retour le 20/01", priorite: "normale", fait: false },
    ],
    liens: [
      { label: "Offre WTTJ", url: "https://welcometothejungle.com" },
      { label: "Brouillon LM (Drive)", url: "https://drive.google.com" },
    ],
    deadline: "2025-02-02",
    dateDebut: "2025-01-05",
    notes: "Déplacements fréquents. 45–53k€ + primes.",
  },
];

// ─── STATUTS CONFIG ─────────────────────────────────────────────────────────
const STATUTS = {
  "En cours":  { color: "#3B82F6", bg: "#EFF6FF", label: "En cours" },
  "Relance":   { color: "#F59E0B", bg: "#FFFBEB", label: "Relance" },
  "Entretien": { color: "#10B981", bg: "#ECFDF5", label: "Entretien" },
  "Offre":     { color: "#8B5CF6", bg: "#F5F3FF", label: "Offre reçue" },
  "Refuse":    { color: "#EF4444", bg: "#FEF2F2", label: "Refusé" },
  "Archive":   { color: "#9CA3AF", bg: "#F9FAFB", label: "Archivé" },
};

// ─── UTILS ──────────────────────────────────────────────────────────────────
const today = new Date();
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";
const diffDays = (d) => {
  if (!d) return null;
  return Math.ceil((new Date(d) - today) / 86400000);
};
const urgence = (e) => {
  const dl = diffDays(e.deadline);
  if (dl === null) return 999;
  if (dl < 0) return -1;
  return dl;
};
const sortedByUrgence = (arr) => [...arr].sort((a, b) => urgence(a) - urgence(b));

// ─── COMPOSANT BADGE STATUT ─────────────────────────────────────────────────
function Badge({ statut, size = "sm" }) {
  const s = STATUTS[statut] || STATUTS["En cours"];
  const pad = size === "sm" ? "2px 10px" : "4px 14px";
  const fs = size === "sm" ? "11px" : "13px";
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.color}40`,
      borderRadius: 20, padding: pad, fontSize: fs, fontWeight: 700,
      letterSpacing: "0.03em", whiteSpace: "nowrap"
    }}>{s.label}</span>
  );
}

// ─── COMPOSANT DEADLINE PILL ────────────────────────────────────────────────
function DeadlinePill({ deadline }) {
  if (!deadline) return <span style={{ color: "#9CA3AF", fontSize: 12 }}>Pas de deadline</span>;
  const d = diffDays(deadline);
  let color = "#10B981", bg = "#ECFDF5", icon = "✓";
  if (d < 0)  { color = "#9CA3AF"; bg = "#F3F4F6"; icon = "✕"; }
  if (d <= 3)  { color = "#EF4444"; bg = "#FEF2F2"; icon = "🔥"; }
  else if (d <= 7)  { color = "#F59E0B"; bg = "#FFFBEB"; icon = "⚡"; }
  else if (d <= 14) { color = "#3B82F6"; bg = "#EFF6FF"; icon = "📅"; }
  const label = d < 0 ? "Dépassée" : d === 0 ? "Aujourd'hui !" : `J-${d}`;
  return (
    <span style={{
      background: bg, color, border: `1px solid ${color}40`,
      borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700
    }}>{icon} {fmtDate(deadline)} ({label})</span>
  );
}

// ─── GANTT ───────────────────────────────────────────────────────────────────
function GanttChart({ candidatures }) {
  const sorted = sortedByUrgence(candidatures.filter(c => c.statut !== "Archive" && c.statut !== "Refuse"));
  if (sorted.length === 0) return <p style={{ color: "#9CA3AF", textAlign: "center", padding: 40 }}>Aucune candidature active</p>;

  // Calcul fenêtre temporelle
  const allDates = sorted.flatMap(c => [c.dateDebut, c.deadline].filter(Boolean)).map(d => new Date(d));
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  minDate.setDate(minDate.getDate() - 2);
  maxDate.setDate(maxDate.getDate() + 7);
  const totalDays = Math.ceil((maxDate - minDate) / 86400000);

  const toX = (d) => Math.max(0, Math.min(100, ((new Date(d) - minDate) / 86400000 / totalDays) * 100));
  const todayX = toX(today);

  // Génère des ticks de semaines
  const ticks = [];
  const cur = new Date(minDate);
  cur.setDate(cur.getDate() + (7 - cur.getDay()) % 7); // prochain lundi
  while (cur <= maxDate) {
    ticks.push({ x: toX(cur), label: cur.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }) });
    cur.setDate(cur.getDate() + 7);
  }

  const rowH = 42;
  const headerH = 28;
  const svgH = headerH + sorted.length * rowH + 10;

  return (
    <div style={{ overflowX: "auto" }}>
      <svg width="100%" viewBox={`0 0 800 ${svgH}`} style={{ fontFamily: "inherit", minWidth: 600 }}>
        {/* Fond alternance */}
        {sorted.map((_, i) => (
          <rect key={i} x={0} y={headerH + i * rowH} width={800} height={rowH}
            fill={i % 2 === 0 ? "#F9FAFB" : "#FFFFFF"} />
        ))}

        {/* Ticks verticaux */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={`${t.x}%`} y1={headerH} x2={`${t.x}%`} y2={svgH}
              stroke="#E5E7EB" strokeWidth={1} />
            <text x={`${t.x}%`} y={16} textAnchor="middle" fontSize={9} fill="#9CA3AF">{t.label}</text>
          </g>
        ))}

        {/* Ligne aujourd'hui */}
        <line x1={`${todayX}%`} y1={0} x2={`${todayX}%`} y2={svgH}
          stroke="#EF4444" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.7} />
        <text x={`${todayX}%`} y={10} textAnchor="middle" fontSize={9} fill="#EF4444" fontWeight="bold">Auj.</text>

        {/* Barres */}
        {sorted.map((c, i) => {
          const y = headerH + i * rowH;
          const s = STATUTS[c.statut] || STATUTS["En cours"];
          const x1 = c.dateDebut ? toX(c.dateDebut) : 0;
          const x2 = c.deadline ? toX(c.deadline) : Math.min(x1 + 15, 95);
          const barW = Math.max(x2 - x1, 1);

          return (
            <g key={c.id}>
              {/* Label entreprise */}
              <text x={4} y={y + rowH / 2 + 4} fontSize={11} fill="#374151" fontWeight={600}
                style={{ dominantBaseline: "middle" }}>
                {c.nom.length > 12 ? c.nom.slice(0, 11) + "…" : c.nom}
              </text>
              {/* Barre de durée */}
              <rect x={`${x1}%`} y={y + 10} width={`${barW}%`} height={18}
                fill={s.color + "30"} stroke={s.color} strokeWidth={1.5} rx={4} />
              <text x={`${(x1 + barW / 2)}%`} y={y + 22} textAnchor="middle"
                fontSize={9} fill={s.color} fontWeight={700}>{c.poste.slice(0, 20)}</text>
              {/* Diamond deadline */}
              {c.deadline && (
                <g transform={`translate(${toX(c.deadline) * 8}, ${y + rowH / 2})`}>
                  <polygon points="0,-7 6,0 0,7 -6,0" fill="#EF4444" opacity={0.9} />
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap", padding: "0 8px" }}>
        {[
          { color: "#3B82F6", label: "Durée candidature" },
          { color: "#EF4444", label: "Deadline ◆" },
          { color: "#EF4444", label: "Aujourd'hui (trait rouge)" },
        ].map((l, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#6B7280" }}>
            <span style={{ width: 12, height: 12, background: l.color + "40", border: `1.5px solid ${l.color}`, borderRadius: 2, display: "inline-block" }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── MODAL EDITION CANDIDATURE ───────────────────────────────────────────────
function Modal({ candidature, onSave, onClose }) {
  const [form, setForm] = useState(candidature
    ? JSON.parse(JSON.stringify(candidature))
    : {
        id: Date.now(), nom: "", secteur: "", statut: "En cours", poste: "", ref: "",
        contacts: [], actions: [], taches: [], liens: [],
        deadline: "", dateDebut: new Date().toISOString().slice(0, 10), notes: "",
      }
  );

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Actions
  const addAction = () => set("actions", [...form.actions, { date: new Date().toISOString().slice(0, 10), texte: "" }]);
  const updAction = (i, k, v) => set("actions", form.actions.map((a, j) => j === i ? { ...a, [k]: v } : a));
  const delAction = (i) => set("actions", form.actions.filter((_, j) => j !== i));

  // Tâches
  const addTache = () => set("taches", [...form.taches, { texte: "", priorite: "normale", fait: false }]);
  const updTache = (i, k, v) => set("taches", form.taches.map((t, j) => j === i ? { ...t, [k]: v } : t));
  const delTache = (i) => set("taches", form.taches.filter((_, j) => j !== i));

  // Contacts
  const addContact = () => set("contacts", [...form.contacts, { nom: "", poste: "", email: "", tel: "" }]);
  const updContact = (i, k, v) => set("contacts", form.contacts.map((c, j) => j === i ? { ...c, [k]: v } : c));
  const delContact = (i) => set("contacts", form.contacts.filter((_, j) => j !== i));

  // Liens
  const addLien = () => set("liens", [...form.liens, { label: "", url: "" }]);
  const updLien = (i, k, v) => set("liens", form.liens.map((l, j) => j === i ? { ...l, [k]: v } : l));
  const delLien = (i) => set("liens", form.liens.filter((_, j) => j !== i));

  const inp = { width: "100%", padding: "6px 10px", border: "1px solid #D1D5DB", borderRadius: 6, fontSize: 13, boxSizing: "border-box", background: "#FAFAFA" };
  const lbl = { fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3, display: "block" };
  const row = { marginBottom: 14 };
  const delBtn = { background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 16, padding: "0 4px" };
  const addBtn = { background: "none", border: "1px dashed #D1D5DB", borderRadius: 6, color: "#6B7280", cursor: "pointer", fontSize: 12, padding: "4px 12px", marginTop: 4 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000070", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 12, width: "100%", maxWidth: 720, maxHeight: "90vh", overflowY: "auto", padding: 28, boxShadow: "0 20px 60px #0002" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 18, color: "#111827" }}>{candidature ? `Modifier — ${candidature.nom}` : "Nouvelle candidature"}</h2>
          <button onClick={onClose} style={{ background: "#F3F4F6", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13 }}>✕ Fermer</button>
        </div>

        {/* Infos générales */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={row}><label style={lbl}>Entreprise *</label><input style={inp} value={form.nom} onChange={e => set("nom", e.target.value)} /></div>
          <div style={row}><label style={lbl}>Secteur</label><input style={inp} value={form.secteur} onChange={e => set("secteur", e.target.value)} /></div>
          <div style={row}><label style={lbl}>Poste</label><input style={inp} value={form.poste} onChange={e => set("poste", e.target.value)} /></div>
          <div style={row}><label style={lbl}>Référence offre</label><input style={inp} value={form.ref} onChange={e => set("ref", e.target.value)} /></div>
          <div style={row}>
            <label style={lbl}>Statut</label>
            <select style={inp} value={form.statut} onChange={e => set("statut", e.target.value)}>
              {Object.keys(STATUTS).map(s => <option key={s} value={s}>{STATUTS[s].label}</option>)}
            </select>
          </div>
          <div style={row}><label style={lbl}>Date début</label><input type="date" style={inp} value={form.dateDebut} onChange={e => set("dateDebut", e.target.value)} /></div>
          <div style={row}><label style={lbl}>Deadline</label><input type="date" style={inp} value={form.deadline} onChange={e => set("deadline", e.target.value)} /></div>
        </div>
        <div style={row}><label style={lbl}>Notes / Contexte</label><textarea style={{ ...inp, minHeight: 60, resize: "vertical" }} value={form.notes} onChange={e => set("notes", e.target.value)} /></div>

        {/* Contacts */}
        <h3 style={{ fontSize: 13, color: "#374151", fontWeight: 700, marginTop: 20, marginBottom: 8, borderTop: "1px solid #F3F4F6", paddingTop: 16 }}>👤 Contacts</h3>
        {form.contacts.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: 8, marginBottom: 8 }}>
            <input style={inp} placeholder="Nom" value={c.nom} onChange={e => updContact(i, "nom", e.target.value)} />
            <input style={inp} placeholder="Poste" value={c.poste} onChange={e => updContact(i, "poste", e.target.value)} />
            <input style={inp} placeholder="Email" value={c.email} onChange={e => updContact(i, "email", e.target.value)} />
            <input style={inp} placeholder="Tél / LinkedIn" value={c.tel} onChange={e => updContact(i, "tel", e.target.value)} />
            <button style={delBtn} onClick={() => delContact(i)}>✕</button>
          </div>
        ))}
        <button style={addBtn} onClick={addContact}>+ Ajouter un contact</button>

        {/* Actions */}
        <h3 style={{ fontSize: 13, color: "#374151", fontWeight: 700, marginTop: 20, marginBottom: 8, borderTop: "1px solid #F3F4F6", paddingTop: 16 }}>📋 Historique des actions</h3>
        {form.actions.map((a, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "150px 1fr auto", gap: 8, marginBottom: 8 }}>
            <input type="date" style={inp} value={a.date} onChange={e => updAction(i, "date", e.target.value)} />
            <input style={inp} placeholder="Description de l'action" value={a.texte} onChange={e => updAction(i, "texte", e.target.value)} />
            <button style={delBtn} onClick={() => delAction(i)}>✕</button>
          </div>
        ))}
        <button style={addBtn} onClick={addAction}>+ Ajouter une action</button>

        {/* Tâches */}
        <h3 style={{ fontSize: 13, color: "#374151", fontWeight: 700, marginTop: 20, marginBottom: 8, borderTop: "1px solid #F3F4F6", paddingTop: 16 }}>✅ Tâches à faire</h3>
        {form.taches.map((t, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 110px 40px auto", gap: 8, marginBottom: 8, alignItems: "center" }}>
            <input style={inp} placeholder="Description" value={t.texte} onChange={e => updTache(i, "texte", e.target.value)} />
            <select style={inp} value={t.priorite} onChange={e => updTache(i, "priorite", e.target.value)}>
              <option value="haute">🔴 Haute</option>
              <option value="normale">🟡 Normale</option>
              <option value="basse">⚪ Basse</option>
            </select>
            <input type="checkbox" checked={t.fait} onChange={e => updTache(i, "fait", e.target.checked)}
              style={{ width: 18, height: 18, cursor: "pointer" }} />
            <button style={delBtn} onClick={() => delTache(i)}>✕</button>
          </div>
        ))}
        <button style={addBtn} onClick={addTache}>+ Ajouter une tâche</button>

        {/* Liens */}
        <h3 style={{ fontSize: 13, color: "#374151", fontWeight: 700, marginTop: 20, marginBottom: 8, borderTop: "1px solid #F3F4F6", paddingTop: 16 }}>🔗 Liens utiles</h3>
        {form.liens.map((l, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 8, marginBottom: 8 }}>
            <input style={inp} placeholder="Label" value={l.label} onChange={e => updLien(i, "label", e.target.value)} />
            <input style={inp} placeholder="https://..." value={l.url} onChange={e => updLien(i, "url", e.target.value)} />
            <button style={delBtn} onClick={() => delLien(i)}>✕</button>
          </div>
        ))}
        <button style={addBtn} onClick={addLien}>+ Ajouter un lien</button>

        {/* Boutons save */}
        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 20px", border: "1px solid #D1D5DB", borderRadius: 8, cursor: "pointer", background: "#F9FAFB", fontSize: 13 }}>Annuler</button>
          <button onClick={() => onSave(form)} style={{ padding: "8px 24px", background: "#1D4ED8", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>💾 Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

// ─── FICHE CANDIDATURE ───────────────────────────────────────────────────────
function FicheCard({ c, onEdit, onDelete, onToggleTache }) {
  const [open, setOpen] = useState(false);
  const s = STATUTS[c.statut] || STATUTS["En cours"];
  const tachesRestantes = c.taches.filter(t => !t.fait).length;
  const dl = diffDays(c.deadline);
  const isUrgent = dl !== null && dl <= 3;

  return (
    <div style={{
      border: `1px solid ${isUrgent ? "#FCA5A5" : "#E5E7EB"}`,
      borderLeft: `4px solid ${s.color}`,
      borderRadius: 10,
      background: isUrgent ? "#FFF5F5" : "#FFFFFF",
      overflow: "hidden",
      transition: "box-shadow 0.15s",
      boxShadow: open ? "0 4px 20px #0001" : "none",
    }}>
      {/* Header */}
      <div style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12 }}
        onClick={() => setOpen(o => !o)}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>{c.nom}</span>
            <Badge statut={c.statut} />
            {isUrgent && <span style={{ fontSize: 11, background: "#FEE2E2", color: "#EF4444", borderRadius: 10, padding: "1px 8px", fontWeight: 700 }}>🔥 URGENT</span>}
          </div>
          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>
            {c.poste} {c.ref !== "—" && c.ref ? `· Réf. ${c.ref}` : ""} {c.secteur ? `· ${c.secteur}` : ""}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap", alignItems: "center" }}>
            <DeadlinePill deadline={c.deadline} />
            {tachesRestantes > 0 && (
              <span style={{ fontSize: 11, background: "#FEF3C7", color: "#92400E", borderRadius: 10, padding: "1px 8px", fontWeight: 700 }}>
                {tachesRestantes} tâche{tachesRestantes > 1 ? "s" : ""} en attente
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button onClick={e => { e.stopPropagation(); onEdit(c); }}
            style={{ background: "#EFF6FF", border: "none", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 12, color: "#3B82F6" }}>✏️</button>
          <button onClick={e => { e.stopPropagation(); if (window.confirm(`Supprimer ${c.nom} ?`)) onDelete(c.id); }}
            style={{ background: "#FEF2F2", border: "none", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 12, color: "#EF4444" }}>🗑</button>
          <span style={{ color: "#9CA3AF", fontSize: 18 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Détail */}
      {open && (
        <div style={{ borderTop: "1px solid #F3F4F6", padding: "16px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          {/* Contacts */}
          {c.contacts.length > 0 && (
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>👤 Contacts</h4>
              {c.contacts.map((ct, i) => (
                <div key={i} style={{ fontSize: 12, marginBottom: 6, background: "#F9FAFB", borderRadius: 6, padding: "6px 10px" }}>
                  <div style={{ fontWeight: 700, color: "#374151" }}>{ct.nom}</div>
                  <div style={{ color: "#6B7280" }}>{ct.poste}</div>
                  {ct.email && <div><a href={`mailto:${ct.email}`} style={{ color: "#3B82F6" }}>{ct.email}</a></div>}
                  {ct.tel && <div style={{ color: "#6B7280" }}>{ct.tel}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Tâches */}
          {c.taches.length > 0 && (
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>✅ Tâches</h4>
              {c.taches.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6, fontSize: 12 }}>
                  <input type="checkbox" checked={t.fait} onChange={() => onToggleTache(c.id, i)}
                    style={{ marginTop: 2, cursor: "pointer", width: 14, height: 14, flexShrink: 0 }} />
                  <span style={{
                    textDecoration: t.fait ? "line-through" : "none",
                    color: t.fait ? "#9CA3AF" : t.priorite === "haute" ? "#EF4444" : t.priorite === "normale" ? "#F59E0B" : "#6B7280",
                    fontWeight: t.priorite === "haute" && !t.fait ? 700 : 400
                  }}>
                    {t.priorite === "haute" && !t.fait && "🔴 "}
                    {t.priorite === "normale" && !t.fait && "🟡 "}
                    {t.texte}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Historique */}
          {c.actions.length > 0 && (
            <div style={{ gridColumn: "1 / -1" }}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>📋 Historique</h4>
              <div style={{ borderLeft: "2px solid #E5E7EB", paddingLeft: 12 }}>
                {[...c.actions].sort((a, b) => b.date.localeCompare(a.date)).map((a, i) => (
                  <div key={i} style={{ marginBottom: 8, position: "relative" }}>
                    <div style={{ position: "absolute", left: -16, top: 5, width: 8, height: 8, background: "#3B82F6", borderRadius: "50%" }} />
                    <span style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace" }}>{fmtDate(a.date)}</span>
                    <div style={{ fontSize: 12, color: "#374151" }}>{a.texte}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {c.notes && (
            <div style={{ gridColumn: "1 / -1", background: "#FFFBEB", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#92400E", border: "1px solid #FDE68A" }}>
              💡 {c.notes}
            </div>
          )}

          {/* Liens */}
          {c.liens.length > 0 && (
            <div style={{ gridColumn: "1 / -1" }}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>🔗 Liens</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {c.liens.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noreferrer"
                    style={{ fontSize: 11, color: "#3B82F6", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 6, padding: "3px 10px", textDecoration: "none" }}>
                    ↗ {l.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── APP PRINCIPALE ──────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem("candidatures_v2");
      return stored ? JSON.parse(stored) : INITIAL_DATA;
    } catch { return INITIAL_DATA; }
  });
  const [modal, setModal] = useState(null); // null | "new" | candidature object
  const [view, setView] = useState("dashboard"); // dashboard | gantt | list
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try { localStorage.setItem("candidatures_v2", JSON.stringify(data)); } catch {}
  }, [data]);

  const saveCandidate = (form) => {
    setData(d => {
      const exists = d.find(c => c.id === form.id);
      return exists ? d.map(c => c.id === form.id ? form : c) : [...d, form];
    });
    setModal(null);
  };

  const deleteCandidate = (id) => setData(d => d.filter(c => c.id !== id));

  const toggleTache = (candidatureId, tacheIdx) => {
    setData(d => d.map(c => c.id === candidatureId
      ? { ...c, taches: c.taches.map((t, i) => i === tacheIdx ? { ...t, fait: !t.fait } : t) }
      : c
    ));
  };

  // Stats
  const stats = useMemo(() => {
    const counts = {};
    Object.keys(STATUTS).forEach(s => counts[s] = 0);
    data.forEach(c => { counts[c.statut] = (counts[c.statut] || 0) + 1; });
    const tachesTotal = data.reduce((s, c) => s + c.taches.filter(t => !t.fait).length, 0);
    const deadlines = data.filter(c => c.deadline && diffDays(c.deadline) !== null && diffDays(c.deadline) <= 7 && diffDays(c.deadline) >= 0);
    return { counts, tachesTotal, deadlinesUrgentes: deadlines.length };
  }, [data]);

  // Filtrage
  const filtered = useMemo(() => {
    let list = sortedByUrgence(data);
    if (filterStatut !== "Tous") list = list.filter(c => c.statut === filterStatut);
    if (search) list = list.filter(c =>
      c.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.poste.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [data, filterStatut, search]);

  const btnNav = (v, label) => (
    <button onClick={() => setView(v)} style={{
      padding: "7px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
      background: view === v ? "#1D4ED8" : "#F3F4F6",
      color: view === v ? "#fff" : "#6B7280",
      transition: "all 0.15s"
    }}>{label}</button>
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F8FAFC", minHeight: "100vh", padding: "0 0 40px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #1D4ED8 100%)", color: "#fff", padding: "20px 28px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>🎯 Suivi de Candidatures</h1>
              <p style={{ margin: "4px 0 0", fontSize: 13, opacity: 0.75 }}>Vos données sont sauvegardées automatiquement dans ce navigateur</p>
            </div>
            <button onClick={() => setModal("new")} style={{
              background: "#fff", color: "#1D4ED8", border: "none", borderRadius: 10,
              padding: "9px 20px", fontWeight: 800, fontSize: 14, cursor: "pointer"
            }}>+ Nouvelle candidature</button>
          </div>

          {/* Stats rapides */}
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            {Object.entries(stats.counts).filter(([, v]) => v > 0).map(([k, v]) => (
              <div key={k} style={{ background: "#ffffff20", borderRadius: 8, padding: "6px 14px", backdropFilter: "blur(4px)" }}>
                <span style={{ fontSize: 18, fontWeight: 800 }}>{v}</span>
                <span style={{ fontSize: 12, opacity: 0.8, marginLeft: 6 }}>{STATUTS[k]?.label}</span>
              </div>
            ))}
            {stats.tachesTotal > 0 && (
              <div style={{ background: "#F59E0B30", border: "1px solid #F59E0B60", borderRadius: 8, padding: "6px 14px" }}>
                <span style={{ fontSize: 18, fontWeight: 800 }}>{stats.tachesTotal}</span>
                <span style={{ fontSize: 12, opacity: 0.8, marginLeft: 6 }}>tâches en attente</span>
              </div>
            )}
            {stats.deadlinesUrgentes > 0 && (
              <div style={{ background: "#EF444430", border: "1px solid #EF444460", borderRadius: 8, padding: "6px 14px" }}>
                <span style={{ fontSize: 18, fontWeight: 800 }}>🔥 {stats.deadlinesUrgentes}</span>
                <span style={{ fontSize: 12, opacity: 0.8, marginLeft: 6 }}>deadline(s) dans 7j</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "10px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          {btnNav("dashboard", "📋 Tableau de bord")}
          {btnNav("gantt", "📊 Gantt")}
          {btnNav("list", "📁 Toutes les fiches")}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <input placeholder="🔍 Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ padding: "6px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12, width: 180 }} />
            <select value={filterStatut} onChange={e => setFilterStatut(e.target.value)}
              style={{ padding: "6px 10px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }}>
              <option value="Tous">Tous les statuts</option>
              {Object.entries(STATUTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <div>
            {/* Urgences */}
            {filtered.filter(c => c.deadline && diffDays(c.deadline) !== null && diffDays(c.deadline) <= 7 && c.statut !== "Archive" && c.statut !== "Refuse").length > 0 && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "12px 18px", marginBottom: 20 }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 13, color: "#991B1B", fontWeight: 800 }}>🔥 Actions urgentes (deadline dans 7 jours)</h3>
                {filtered.filter(c => c.deadline && diffDays(c.deadline) !== null && diffDays(c.deadline) <= 7 && c.statut !== "Archive" && c.statut !== "Refuse").map(c => (
                  <div key={c.id} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, fontSize: 13 }}>
                    <span style={{ fontWeight: 700 }}>{c.nom}</span>
                    <DeadlinePill deadline={c.deadline} />
                    <span style={{ color: "#6B7280" }}>— {c.taches.filter(t => !t.fait && t.priorite === "haute").map(t => t.texte).join(", ") || "Vérifier le dossier"}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tableau récap */}
            <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB", overflow: "hidden", marginBottom: 24 }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#1E3A5F", color: "#fff" }}>
                      {["Entreprise", "Statut", "Poste", "Dernier contact", "Deadline", "Tâches"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => {
                      const lastAction = [...c.actions].sort((a, b) => b.date.localeCompare(a.date))[0];
                      const tR = c.taches.filter(t => !t.fait).length;
                      return (
                        <tr key={c.id} style={{ background: i % 2 === 0 ? "#F9FAFB" : "#fff", cursor: "pointer" }}
                          onClick={() => setModal(c)}>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "#111827" }}>
                            {diffDays(c.deadline) !== null && diffDays(c.deadline) <= 3 && "🔥 "}{c.nom}
                          </td>
                          <td style={{ padding: "10px 14px" }}><Badge statut={c.statut} /></td>
                          <td style={{ padding: "10px 14px", color: "#6B7280" }}>{c.poste}</td>
                          <td style={{ padding: "10px 14px", color: "#6B7280" }}>{lastAction ? fmtDate(lastAction.date) : "—"}</td>
                          <td style={{ padding: "10px 14px" }}><DeadlinePill deadline={c.deadline} /></td>
                          <td style={{ padding: "10px 14px" }}>
                            {tR > 0 ? <span style={{ color: "#F59E0B", fontWeight: 700 }}>{tR} en attente</span> : <span style={{ color: "#10B981" }}>✓ OK</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* GANTT */}
        {view === "gantt" && (
          <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB", padding: 20 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#111827" }}>📊 Gantt — Planning des candidatures</h2>
            <GanttChart candidatures={data} />
          </div>
        )}

        {/* FICHES */}
        {view === "list" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.length === 0 && <p style={{ color: "#9CA3AF", textAlign: "center", padding: 40 }}>Aucune candidature trouvée</p>}
            {filtered.map(c => (
              <FicheCard key={c.id} c={c} onEdit={setModal} onDelete={deleteCandidate} onToggleTache={toggleTache} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <Modal
          candidature={modal === "new" ? null : modal}
          onSave={saveCandidate}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
