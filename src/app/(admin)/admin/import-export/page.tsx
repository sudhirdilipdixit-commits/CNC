"use client";

import { useRef, useState } from "react";

type Tab = "courses" | "universities" | "faqs" | "blogs";
type ResultRow = { internalName: string; action: string; error?: string };

const COURSE_HEADERS = "internalName,courseName,universityName,mode,duration,fees,feeCategory,eligibility,badge,isFeatured,logoUrl,logoAlt,logoTitle,logoDescription";
const COURSE_SAMPLE = `Amity Online MBA Marketing 2026,Online MBA in Marketing Management,Amity University Online,Online,2 Years,"Rs 80,000 - Rs 1,20,000",1-2 Lakh,Graduation in any stream | Min. 50%,Top Pick,TRUE,https://example.com/logo.png,Amity University Online logo,Amity University Online,Online MBA programmes from Amity University`;

const UNIVERSITY_HEADERS = "internalName,universityName,mode,duration,approvedBy,fees,feeCategory,eligibility,badge,isFeatured,logoUrl,logoAlt,logoTitle,logoDescription";
const UNIVERSITY_SAMPLE = `Amity Online MBA 2026,Amity University Online,Online,2 Years,UGC-DEB|NAAC A++,"Rs 1,20,000/year",1-2 Lakh,Graduation in any stream | Min. 50%,NAAC A++,TRUE,https://example.com/logo.png,Amity University Online logo,Amity University Online,UGC-DEB approved online MBA university`;

const FAQ_HEADERS = "question,answer,tags";
const FAQ_SAMPLE = `Is online MBA valid in India?,"Yes, an online MBA from a UGC-DEB approved university carries the same validity as a regular MBA for government and private sector jobs.",validity|ugc-deb`;

function downloadText(content: string, filename: string) {
  const blob = new Blob(["﻿" + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const ACTION_STYLE: Record<string, React.CSSProperties> = {
  created:  { background: "#dcfce7", color: "#166534" },
  updated:  { background: "#dbeafe", color: "#1e40af" },
  skipped:  { background: "#fef3c7", color: "#92400e" },
  error:    { background: "#fee2e2", color: "#991b1b" },
};

export default function ImportExportPage() {
  const [secret, setSecret]         = useState("");
  const [tab, setTab]               = useState<Tab>("courses");
  const [file, setFile]             = useState<File | null>(null);
  const [importing, setImporting]   = useState(false);
  const [exporting, setExporting]   = useState(false);
  const [deleting, setDeleting]     = useState(false);
  const [results, setResults]       = useState<ResultRow[] | null>(null);
  const [importError, setImportError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const resetImport = () => {
    setResults(null);
    setImportError("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const switchTab = (t: Tab) => { setTab(t); resetImport(); };

  const TAB_LABEL: Record<Tab, string> = {
    courses: "Course Cards",
    universities: "University Cards",
    faqs: "FAQ Library entries",
    blogs: "Blog Posts",
  };

  const handleDeleteAll = async () => {
    if (!secret.trim()) { alert("Enter the admin secret first."); return; }
    const label = TAB_LABEL[tab];
    if (!window.confirm(`Delete ALL ${label} from Sanity?\n\nThis cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/delete/${tab}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${secret}` },
      });
      const text = await res.text();
      let json: { deleted?: number; error?: string } = {};
      try { json = JSON.parse(text); } catch { /* non-JSON response (e.g. 504 timeout) */ }
      if (!res.ok) {
        alert(json.error || `Delete failed (HTTP ${res.status}). The function may have timed out — try again or delete in smaller batches via Sanity Studio.`);
        return;
      }
      alert(`Deleted ${json.deleted ?? 0} ${label}.`);
      resetImport();
    } catch (err) {
      alert(`Delete failed: ${err instanceof Error ? err.message : "Network error. Check your connection."}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = async () => {
    if (!secret.trim()) { alert("Enter the admin secret first."); return; }
    setExporting(true);
    try {
      const res = await fetch(`/api/admin/export/${tab}`, {
        headers: { Authorization: `Bearer ${secret}` },
      });
      if (!res.ok) {
        const j = await res.json();
        alert(j.error || "Export failed. Check the admin secret.");
        return;
      }
      const text = await res.text();
      downloadText(text, `${tab}-export.csv`);
    } catch {
      alert("Export failed. Check your connection.");
    } finally {
      setExporting(false);
    }
  };

  const handleImport = async () => {
    if (!secret.trim()) { alert("Enter the admin secret first."); return; }
    if (!file) { alert("Select a CSV file first."); return; }
    setImporting(true);
    setResults(null);
    setImportError("");
    try {
      const buffer = await file.arrayBuffer();
      let csv: string;
      try {
        // Try strict UTF-8 first (throws on invalid bytes — catches Windows-1252 files)
        csv = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
      } catch {
        // Fallback for files saved by Excel as Windows-1252
        csv = new TextDecoder("windows-1252").decode(buffer);
      }
      const res = await fetch(`/api/admin/import/${tab}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({ csv }),
      });
      const text = await res.text();
      let json: { error?: string; results?: ResultRow[] };
      try {
        json = JSON.parse(text);
      } catch {
        setImportError(`Server error ${res.status}: ${text.slice(0, 300) || "(empty response)"}`);
        return;
      }
      if (!res.ok) {
        setImportError(json.error || `Error ${res.status}`);
        return;
      }
      setResults(json.results ?? []);
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setImportError(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setImporting(false);
    }
  };

  const created = results?.filter((r) => r.action === "created").length ?? 0;
  const updated = results?.filter((r) => r.action === "updated").length ?? 0;
  const skipped = results?.filter((r) => r.action === "skipped").length ?? 0;
  const errors  = results?.filter((r) => r.action === "error").length ?? 0;

  const templateContent = tab === "courses"
    ? `${COURSE_HEADERS}\n${COURSE_SAMPLE}`
    : tab === "universities"
    ? `${UNIVERSITY_HEADERS}\n${UNIVERSITY_SAMPLE}`
    : `${FAQ_HEADERS}\n${FAQ_SAMPLE}`;

  return (
    <div style={{ maxWidth: 860 }}>
      <h1 className="font-serif text-3xl mb-1" style={{ color: "var(--navy)" }}>
        Import / Export
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--grey)" }}>
        Bulk manage Course Cards, University Cards, and the FAQ Library via CSV.
      </p>

      {/* Admin Secret */}
      <div className="rounded-lg p-5 mb-6" style={{ background: "var(--white)", border: "1px solid var(--mist)" }}>
        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--charcoal)" }}>
          Admin Secret
        </label>
        <input
          type="password"
          placeholder="Enter ADMIN_SECRET from your .env"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full max-w-sm text-sm"
          style={{ padding: "8px 12px", border: "1px solid var(--mist)", borderRadius: 6 }}
        />
        <p className="text-xs mt-1" style={{ color: "var(--grey)" }}>
          Required for both import and export. Set <code>ADMIN_SECRET</code> in your environment variables.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "2px solid var(--mist)", marginBottom: 24 }}>
        {(["courses", "universities", "faqs", "blogs"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => switchTab(t)}
            style={{
              padding: "10px 20px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: tab === t ? 700 : 400,
              color: tab === t ? "var(--navy)" : "var(--grey)",
              borderBottom: tab === t ? "2px solid var(--navy)" : "2px solid transparent",
              marginBottom: -2,
            }}
          >
            {t === "courses" ? "Course Cards" : t === "universities" ? "University Cards" : t === "faqs" ? "FAQ Library" : "Blog Posts"}
          </button>
        ))}
      </div>

      {/* Export */}
      <div className="rounded-lg p-5 mb-4" style={{ background: "var(--white)", border: "1px solid var(--mist)" }}>
        <h2 className="font-semibold text-base mb-1" style={{ color: "var(--navy)" }}>Export</h2>
        <p className="text-sm mb-3" style={{ color: "var(--grey)" }}>
          Download all current {TAB_LABEL[tab]} as a CSV file.
          {tab !== "faqs" && tab !== "blogs" && " Logo URLs are included — you can re-import the file after editing."}
        </p>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="btn btn-primary"
          style={{ fontSize: 13, opacity: exporting ? 0.7 : 1 }}
        >
          {exporting ? "Exporting…" : "Export as CSV"}
        </button>
      </div>

      {/* Import */}
      <div className="rounded-lg p-5" style={{ background: "var(--white)", border: "1px solid var(--mist)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <h2 className="font-semibold text-base" style={{ color: "var(--navy)" }}>Import</h2>
          <button
            onClick={() => downloadText(templateContent, `${tab}-template.csv`)}
            style={{ background: "none", border: "1px solid var(--mist)", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer", color: "var(--charcoal)" }}
          >
            Download Template
          </button>
        </div>
        <p className="text-sm mb-3" style={{ color: "var(--grey)" }}>
          Existing records (matched by <code>{tab === "faqs" ? "question" : "internalName"}</code>) will be updated; new ones will be created.
          Max 100 rows per file.
        </p>

        {/* Field reference */}
        <details className="mb-4">
          <summary className="text-xs cursor-pointer" style={{ color: "var(--grey)" }}>
            Allowed values reference
          </summary>
          <div className="text-xs mt-2 leading-relaxed" style={{ color: "var(--charcoal)" }}>
            {tab === "faqs" ? (
              <>
                <strong>question:</strong> Required. The exact question text — used as the unique key for upsert.<br />
                <strong>answer:</strong> Required. Plain text answer.<br />
                <strong>tags:</strong> Pipe-separated topic tags — e.g. <code>fees|ugc-deb|eligibility</code>. Optional.
              </>
            ) : (
              <>
                <strong>mode:</strong> Online &nbsp;·&nbsp; Distance &nbsp;·&nbsp; Online + Distance &nbsp;·&nbsp; Blended<br />
                <strong>feeCategory:</strong> Under 1 Lakh &nbsp;·&nbsp; 1-2 Lakh &nbsp;·&nbsp; 2-3 Lakh &nbsp;·&nbsp; 3-5 Lakh &nbsp;·&nbsp; 5+ Lakh<br />
                <strong>isFeatured:</strong> TRUE or FALSE<br />
                {tab === "universities" && (
                  <><strong>approvedBy:</strong> Pipe-separated — e.g. <code>UGC-DEB|AICTE|NAAC A++</code><br /></>
                )}
                <strong>logoUrl:</strong> Public HTTPS image URL. Leave blank to keep existing logo.<br />
                <strong>logoAlt:</strong> Alt text for the logo image (SEO + accessibility).<br />
                <strong>logoTitle:</strong> Tooltip title shown on hover.<br />
                <strong>logoDescription:</strong> Optional longer description for accessibility. Leave blank if not needed.
              </>
            )}
          </div>
        </details>

        <p className="text-xs mb-2" style={{ color: "var(--grey)" }}>
          <strong>Excel users:</strong> save as <em>CSV UTF-8 (Comma delimited)</em> — not plain CSV — to preserve ₹ and other special characters.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setResults(null);
            setImportError("");
          }}
          className="block text-sm"
        />
        {file && (
          <p className="text-xs mt-1 mb-3" style={{ color: "#166534" }}>
            ✓ {file.name} ({(file.size / 1024).toFixed(1)} KB) ready to import
          </p>
        )}
        {!file && <div className="mb-3" />}

        {importError && (
          <div
            className="text-sm rounded-md mb-3"
            style={{ background: "#fef2f2", border: "1px solid #fca5a5", padding: "10px 14px", color: "#991b1b" }}
          >
            {importError}
          </div>
        )}

        <button
          onClick={handleImport}
          disabled={importing || !file}
          className="btn btn-primary"
          style={{ fontSize: 13, opacity: importing || !file ? 0.6 : 1 }}
        >
          {importing ? "Importing… (this may take up to 60s for large files)" : "Import CSV"}
        </button>

        {/* Results summary + table */}
        {results && (
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", gap: 20, marginBottom: 12, fontSize: 13 }}>
              {created > 0 && <span style={{ color: "#166534" }}>✓ {created} created</span>}
              {updated > 0 && <span style={{ color: "#1e40af" }}>↑ {updated} updated</span>}
              {skipped > 0 && <span style={{ color: "#92400e" }}>— {skipped} skipped</span>}
              {errors  > 0 && <span style={{ color: "#991b1b" }}>✕ {errors} errors</span>}
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "var(--ivory)" }}>
                    {["Identifier", "Action", "Note"].map((h) => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", borderBottom: "1px solid var(--mist)", fontWeight: 600 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--ivory)" }}>
                      <td style={{ padding: "7px 12px" }}>{r.internalName}</td>
                      <td style={{ padding: "7px 12px" }}>
                        <span style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          ...(ACTION_STYLE[r.action] ?? {}),
                        }}>
                          {r.action}
                        </span>
                      </td>
                      <td style={{ padding: "7px 12px", fontSize: 12, color: "#6b7280" }}>
                        {r.error || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* Danger Zone */}
      <div className="rounded-lg p-5 mt-4" style={{ background: "#fff5f5", border: "1px solid #fca5a5" }}>
        <h2 className="font-semibold text-base mb-1" style={{ color: "#991b1b" }}>Danger Zone</h2>
        <p className="text-sm mb-3" style={{ color: "#6b7280" }}>
          Permanently delete <strong>all</strong> {TAB_LABEL[tab]} from Sanity. This cannot be undone — export first if you need a backup.
        </p>
        <button
          onClick={handleDeleteAll}
          disabled={deleting}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 600,
            cursor: deleting ? "not-allowed" : "pointer",
            opacity: deleting ? 0.7 : 1,
          }}
        >
          {deleting ? "Deleting…" : `Delete All ${TAB_LABEL[tab]}`}
        </button>
      </div>
    </div>
  );
}
