"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        fontSize: 12,
        color: "var(--pale-navy)",
        background: "none",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 4,
        cursor: "pointer",
        padding: "4px 10px",
      }}
    >
      Logout
    </button>
  );
}
