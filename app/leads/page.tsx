import { supabaseAdmin } from "@/lib/supabaseAdmin";

function brlFromCents(cents: number) {
  const value = (cents ?? 0) / 100;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR");
}

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const { data: leads, error } = await supabaseAdmin
    .from("leads")
    .select(
      "id,user_email,credit,term,estimated_installment,estimated_total,admin_fee_percent,source,status,notes,created_at"
    )
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="min-h-dvh bg-zinc-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="min-w-0">
            <h1 className="font-goldman text-xl sm:text-2xl">Leads</h1>
          </div>

          <a
            href="/"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
          >
            Voltar ao início
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        {error ? (
          <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-5 text-red-100">
            <p className="font-semibold">Erro ao buscar leads</p>
            <p className="text-sm opacity-90">{error.message}</p>
          </div>
        ) : !leads || leads.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-white/80">Nenhum lead cadastrado ainda.</p>
            <p className="text-white/50 text-sm mt-2">
              Faça uma simulação no dashboard e clique em “Quero seguir com essa simulação”.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white font-semibold truncate">
                      {lead.user_email}
                    </p>
                    <p className="text-white/50 text-sm">
                      {formatDate(lead.created_at)} • source:{" "}
                      <span className="text-white/70">{lead.source}</span> • status:{" "}
                      <span className="text-white/70">{lead.status}</span>
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-3">
                    <p className="text-white/60 text-xs">Parcela estimada</p>
                    <p className="text-white text-lg font-semibold">
                      {brlFromCents(lead.estimated_installment)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-zinc-950/30 p-3">
                    <p className="text-white/60 text-xs">Crédito</p>
                    <p className="text-white font-medium">{brlFromCents(lead.credit)}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-zinc-950/30 p-3">
                    <p className="text-white/60 text-xs">Prazo</p>
                    <p className="text-white font-medium">{lead.term}x</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-zinc-950/30 p-3">
                    <p className="text-white/60 text-xs">Total estimado</p>
                    <p className="text-white font-medium">{brlFromCents(lead.estimated_total)}</p>
                    <p className="text-white/45 text-xs">
                      taxa: {lead.admin_fee_percent}%
                    </p>
                  </div>
                </div>

                {lead.notes ? (
                  <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950/30 p-3">
                    <p className="text-white/60 text-xs">Notes</p>
                    <p className="text-white/80 text-sm whitespace-pre-wrap">
                      {lead.notes}
                    </p>
                  </div>
                ) : null}

                <div className="mt-4 text-xs text-white/40">
                  ID: <span className="font-mono">{lead.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
