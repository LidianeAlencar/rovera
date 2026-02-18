"use client";

import { useState } from "react";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function LeadCaptureForm() {
  const [credit, setCredit] = useState(30000);
  const [term, setTerm] = useState(12);
  const [source, setSource] = useState<"dashboard" | "landing" | "manual">("manual");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"new" | "contacted" | "qualified">("new");

  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const adminFeePercent = 20;
  const total = credit * (1 + adminFeePercent / 100);
  const installment = Math.round(total / term);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessId(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credit,
          term,
          source,
          notes: notes || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Falha ao enviar");
      }

      setSuccessId(data.id);
    } catch (err: any) {
      setError(err?.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm text-white/70">Crédito desejado</label>
          <div className="mt-2 flex items-end justify-between gap-4">
            <div className="text-2xl font-semibold text-white">{formatBRL(credit)}</div>
            <div className="text-xs text-white/50">R$ 30.000 – R$ 500.000</div>
          </div>
          <input
            type="range"
            min={30000}
            max={500000}
            step={1000}
            value={credit}
            onChange={(e) => setCredit(Number(e.target.value))}
            className="mt-3 w-full"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-white/70">Prazo</label>
            <select
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-white/25"
            >
              {Array.from({ length: 60 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}x
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-white/70">Origem (source)</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as any)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-white/25"
            >
              <option value="manual">manual</option>
              <option value="dashboard">dashboard</option>
              <option value="landing">landing</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm text-white/70">Anotações (notes)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex.: Cliente quer parcelas mais baixas e está avaliando troca do carro atual."
            className="mt-2 min-h-[96px] w-full resize-y rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white outline-none placeholder:text-white/30 focus:border-white/25"
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <p className="text-sm text-white/65">Prévia da simulação</p>
          <div className="mt-3 grid gap-2 text-white">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Parcela estimada</span>
              <span className="font-semibold">{formatBRL(installment)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Total com taxa</span>
              <span className="font-semibold">{formatBRL(total)}</span>
            </div>
            <div className="text-xs text-white/45">
              Taxa administrativa estimada de {adminFeePercent}% .
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/55">
            Status sugerido: <span className="text-white">{status}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl border border-white/10 bg-white/10 px-5 py-2.5 text-white transition hover:bg-white/15 disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Salvar lead"}
          </button>
        </div>

        {successId && (
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-100">
            Lead salvo com sucesso! ID: <span className="font-mono">{successId}</span>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-red-100">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
