"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json();
        setError(j.error || "Invalid password.");
        return;
      }
      router.push("/admin");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "80px auto" }}>
      <h1 className="font-serif text-2xl mb-1" style={{ color: "var(--navy)" }}>
        Admin Login
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--grey)" }}>
        Enter your admin password to continue.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          style={{
            padding: "10px 14px",
            border: "1px solid var(--mist)",
            borderRadius: 6,
            fontSize: 14,
            outline: "none",
          }}
        />
        {error && <p style={{ color: "#991b1b", fontSize: 13, margin: 0 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}
