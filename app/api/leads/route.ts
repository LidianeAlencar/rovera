import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const creditBRL = Number(body.credit);
  const term = Number(body.term);

  const source =
    typeof body.source === "string" && body.source.trim()
      ? body.source.trim()
      : "dashboard";

  const notes =
    typeof body.notes === "string" && body.notes.trim()
      ? body.notes.trim()
      : null;

  const status =
    typeof body.status === "string" && body.status.trim()
      ? body.status.trim()
      : "new";

  const credit = clamp(creditBRL, 30000, 500000);
  const safeTerm = clamp(term, 1, 60);

  const adminFeePercent = 20;
  const totalBRL = credit * (1 + adminFeePercent / 100);
  const installmentBRL = totalBRL / safeTerm;

  const creditCents = Math.round(credit * 100);
  const totalCents = Math.round(totalBRL * 100);
  const installmentCents = Math.round(installmentBRL * 100);

  const { data, error } = await supabaseAdmin
    .from("leads")
    .insert({
      user_email: session.user.email,
      credit: creditCents,
      term: safeTerm,
      estimated_installment: installmentCents,
      estimated_total: totalCents,
      admin_fee_percent: adminFeePercent,
      source,
      status,
      notes,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: "DB_ERROR", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, id: data.id });
}
