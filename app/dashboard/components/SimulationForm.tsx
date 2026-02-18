"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "./SimulationResult";
import SuccessScreen from "./SuccessScreen";

const MIN_CREDITO = 30000;
const MAX_CREDITO = 500000;
const STEP_CREDITO = 10000;

const PRAZOS = [12, 24, 36, 48, 60];

function brl(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

export default function SimulationForm() {
  const [credito, setCredito] = useState<number>(MIN_CREDITO);
  const [prazo, setPrazo] = useState<number>(24);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const taxaTotal = 0.2;

  const { valorTotal, parcela } = useMemo(() => {
    const total = credito * (1 + taxaTotal);
    const mensal = total / prazo;
    return { valorTotal: total, parcela: mensal };
  }, [credito, prazo]);

  async function handleSubmit() {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credit: credito,
          term: prazo,
          source: "dashboard",
          status: "new",
          notes: "",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        if (res.status === 401) {
          throw new Error("Você precisa estar logada para enviar a simulação.");
        }
        throw new Error(data?.details || data?.error || "Falha ao salvar o lead.");
      }

      setLeadId(data.id);
      setSuccess(true);
    } catch (e: any) {
      setErrorMsg(e?.message || "Erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <SuccessScreen
        credito={credito}
        prazo={prazo}
        parcela={parcela}
        leadId={leadId}
        onBack={() => {
          setSuccess(false);
          setLeadId(null);
        }}
      />
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="space-y-2">
        <h1 className="text-white text-2xl sm:text-3xl font-semibold leading-tight">
          Simule o seu próximo passo
        </h1>
      </div>

      <div className="mt-8 grid gap-6">
        {/* Crédito */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-white font-medium">Quanto você quer conquistar?</p>
              <p className="text-white/60 text-sm">Selecione o valor do crédito desejado.</p>
            </div>

            <div className="text-right">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={credito}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="text-white text-xl sm:text-2xl font-semibold"
                >
                  {brl(credito)}
                </motion.div>
              </AnimatePresence>
              <p className="text-white/50 text-xs">
                de {brl(MIN_CREDITO)} até {brl(MAX_CREDITO)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <input
              type="range"
              min={MIN_CREDITO}
              max={MAX_CREDITO}
              step={STEP_CREDITO}
              value={credito}
              onChange={(e) => setCredito(Number(e.target.value))}
              className="w-full accent-cyan-400"
              aria-label="Selecione o valor do crédito"
            />

            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>{brl(MIN_CREDITO)}</span>
              <span>{brl(MAX_CREDITO)}</span>
            </div>
          </div>
        </div>

        {/* Prazo */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4 sm:p-5">
          <div className="space-y-1">
            <p className="text-white font-medium">Em quantos meses você pretende pagar?</p>
         </div>

          <div className="mt-4">
            <select
              value={prazo}
              onChange={(e) => setPrazo(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-400/60"
              aria-label="Selecione o prazo de pagamento"
            >
              {PRAZOS.map((p) => (
                <option key={p} value={p} className="bg-zinc-900">
                  {p}x
                </option>
              ))}
            </select>
          </div>
        </div>

        <SimulationResult
          credito={credito}
          prazo={prazo}
          parcela={parcela}
          valorTotal={valorTotal}
          taxaTotal={taxaTotal}
        />

        {/* Erro */}
        {errorMsg ? (
          <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-red-100">
            {errorMsg}
          </div>
        ) : null}

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="group w-full rounded-2xl bg-cyan-400 text-zinc-950 font-semibold py-4 shadow-[0_12px_40px_rgba(34,211,238,0.22)] hover:shadow-[0_18px_60px_rgba(34,211,238,0.28)] active:scale-[0.99] transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="inline-flex items-center justify-center gap-3">
            {isSubmitting ? "Enviando para análise..." : "Quero seguir com essa simulação"}
            <span className="group-hover:translate-x-0.5 transition">→</span>
          </span>
        </button>

        <a
          href="/leads"
          className="text-center text-xs text-cyan-300/80 hover:text-cyan-300 transition"
        >
          Ver leads salvos →
        </a>
      </div>
    </div>
  );
}
