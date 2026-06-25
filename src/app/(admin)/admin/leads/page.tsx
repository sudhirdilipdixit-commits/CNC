import { createServerSupabase } from "@/lib/supabase";
import LeadsTable from "@/components/admin/LeadsTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Leads | Admin" };
export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; search?: string; from?: string; to?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1"));
  const status = params.status || "";
  const search = params.search || "";
  const from = params.from || "";
  const to = params.to || "";

  const supabase = createServerSupabase();

  let query = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (status) query = query.eq("status", status);
  if (search)
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,mobile.ilike.%${search}%`
    );
  if (from) query = query.gte("created_at", from);
  if (to) query = query.lte("created_at", to + "T23:59:59");

  const { data: leads, count } = await query;

  return (
    <LeadsTable
      leads={leads || []}
      total={count || 0}
      page={page}
      pageSize={PAGE_SIZE}
      filters={{ status, search, from, to }}
    />
  );
}
