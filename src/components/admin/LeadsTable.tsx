"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Lead = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  city: string;
  course_interested: string;
  status: string;
  notes: string;
  utm_source: string;
  utm_campaign: string;
  source: string;
  device_type: string;
  browser: string;
  landing_page: string;
  referrer: string;
  created_at: string;
};

const STATUS_OPTIONS = ["new", "contacted", "follow_up", "qualified", "converted", "closed"];
const STATUS_COLORS: Record<string, string> = {
  new: "#0ea5e9",
  contacted: "#8b5cf6",
  follow_up: "#f59e0b",
  qualified: "#10b981",
  converted: "#22c55e",
  closed: "#6b7280",
};

interface LeadsTableProps {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
  filters: { status: string; search: string; from: string; to: string };
}

export default function LeadsTable({
  leads,
  total,
  page,
  pageSize,
  filters,
}: LeadsTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(filters.search);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const totalPages = Math.ceil(total / pageSize);

  const updateURL = (updates: Record<string, string>) => {
    const params = new URLSearchParams({
      page: "1",
      status: filters.status,
      search: filters.search,
      from: filters.from,
      to: filters.to,
      ...updates,
    });
    startTransition(() => router.push(`/admin/leads?${params}`));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: searchInput });
  };

  const handleExportCSV = () => {
    const headers = [
      "ID","Name","Mobile","Email","City","Course","Status","Source","UTM Source","UTM Campaign","Device","Browser","Landing Page","Referrer","Created At"
    ];
    const rows = leads.map((l) => [
      l.id, l.name, l.mobile, l.email, l.city, l.course_interested,
      l.status, l.source, l.utm_source, l.utm_campaign,
      l.device_type, l.browser, l.landing_page, l.referrer,
      new Date(l.created_at).toLocaleString("en-IN"),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cnc-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Leads", value: total },
          { label: "This Page", value: leads.length },
          { label: "New", value: leads.filter((l) => l.status === "new").length },
          { label: "Converted", value: leads.filter((l) => l.status === "converted").length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-4"
            style={{ background: "var(--white)", border: "1px solid var(--mist)" }}
          >
            <p className="text-xs uppercase tracking-[0.1em] mb-1" style={{ color: "var(--grey)" }}>
              {stat.label}
            </p>
            <p className="text-2xl font-bold font-serif" style={{ color: "var(--navy)" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        className="rounded-lg p-4 mb-6 flex flex-wrap gap-3 items-end"
        style={{ background: "var(--white)", border: "1px solid var(--mist)" }}
      >
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[200px]">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search name, email, mobile…"
            className="flex-1 px-3 py-2 text-sm rounded-lg border"
            style={{ borderColor: "var(--pale-navy)", background: "var(--ivory)" }}
          />
          <button type="submit" className="btn btn-primary btn-sm">Search</button>
        </form>

        <select
          value={filters.status}
          onChange={(e) => updateURL({ status: e.target.value })}
          className="px-3 py-2 text-sm rounded-lg border"
          style={{ borderColor: "var(--pale-navy)", background: "var(--ivory)" }}
        >
          <option value="">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filters.from}
          onChange={(e) => updateURL({ from: e.target.value })}
          className="px-3 py-2 text-sm rounded-lg border"
          style={{ borderColor: "var(--pale-navy)", background: "var(--ivory)" }}
        />
        <input
          type="date"
          value={filters.to}
          onChange={(e) => updateURL({ to: e.target.value })}
          className="px-3 py-2 text-sm rounded-lg border"
          style={{ borderColor: "var(--pale-navy)", background: "var(--ivory)" }}
        />

        <button
          type="button"
          onClick={handleExportCSV}
          className="btn btn-secondary btn-sm"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: "1px solid var(--mist)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--navy)", color: "var(--ivory)" }}>
                <th className="px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Mobile</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">City</th>
                <th className="px-4 py-3 text-left font-semibold">Course</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Source</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center" style={{ color: "var(--grey)" }}>
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead, i) => (
                  <>
                    <tr
                      key={lead.id}
                      style={{
                        background: i % 2 === 0 ? "var(--ivory)" : "var(--white)",
                        borderBottom: "1px solid var(--mist)",
                      }}
                    >
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--grey)" }}>
                        {lead.id}
                      </td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "var(--navy)" }}>
                        {lead.name}
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${lead.mobile}`} className="underline" style={{ color: "var(--navy)" }}>
                          {lead.mobile}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-xs truncate max-w-[180px]">{lead.email}</td>
                      <td className="px-4 py-3">{lead.city}</td>
                      <td className="px-4 py-3 text-xs truncate max-w-[150px]">{lead.course_interested}</td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-block text-[11px] font-bold uppercase px-2 py-0.5 rounded-sm text-white"
                          style={{ background: STATUS_COLORS[lead.status] || "#6b7280" }}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs">{lead.utm_source || lead.source}</td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: "var(--grey)" }}>
                        {new Date(lead.created_at).toLocaleString("en-IN", {
                          day: "2-digit", month: "short", year: "2-digit",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                          className="text-xs underline"
                          style={{ color: "var(--navy)" }}
                        >
                          {expandedId === lead.id ? "Close" : "Details"}
                        </button>
                      </td>
                    </tr>
                    {expandedId === lead.id && (
                      <tr
                        key={`${lead.id}-detail`}
                        style={{ background: "var(--pale-navy)" }}
                      >
                        <td colSpan={10} className="px-6 py-4 text-xs leading-relaxed">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              { label: "UTM Source", value: lead.utm_source },
                              { label: "UTM Campaign", value: lead.utm_campaign },
                              { label: "Device", value: lead.device_type },
                              { label: "Browser", value: lead.browser },
                              { label: "Landing Page", value: lead.landing_page },
                              { label: "Referrer", value: lead.referrer },
                              { label: "Notes", value: lead.notes },
                            ].map((f) =>
                              f.value ? (
                                <div key={f.label}>
                                  <span className="font-bold" style={{ color: "var(--navy)" }}>
                                    {f.label}:
                                  </span>{" "}
                                  <span
                                    className="break-all"
                                    style={{ color: "var(--charcoal)" }}
                                  >
                                    {f.value}
                                  </span>
                                </div>
                              ) : null
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm" style={{ color: "var(--grey)" }}>
            Page {page} of {totalPages} · {total} total leads
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <button
                type="button"
                onClick={() => updateURL({ page: String(page - 1) })}
                className="btn btn-secondary btn-sm"
              >
                ← Prev
              </button>
            )}
            {page < totalPages && (
              <button
                type="button"
                onClick={() => updateURL({ page: String(page + 1) })}
                className="btn btn-primary btn-sm"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
