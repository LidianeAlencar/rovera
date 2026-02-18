"use client";

import { motion } from "framer-motion";

function brl(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

export default function SuccessScreen({
  credito,
  prazo,
  parcela,
  leadId,
  onBack,
}: {
  credito: number;
  prazo: number;
  parcela: number;
  leadId?: string | null;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="text-center space-y-4">

        <h2 className="text-white text-2xl sm:text-3xl font-semibold">
          Pedido enviado com sucesso!
        </h2>

        <p className="text-white/70 max-w-xl mx-auto">
          Esse é o início de um sonho bem planejado. Recebemos sua simulação e,
          em breve, nosso time entra em contato para te ajudar nos próximos passos.
        </p>

        <div className="mt-6 grid gap-2 rounded-2xl border border-white/10 bg-zinc-950/40 p-4 sm:p-5 text-left">
          <p className="text-white/70 text-sm">Resumo da sua simulação</p>
          <p className="text-white font-medium">
            Crédito: <span className="text-white/80">{brl(credito)}</span>
          </p>
          <p className="text-white font-medium">
            Prazo: <span className="text-white/80">{prazo}x</span>
          </p>
          <p className="text-white font-medium">
            Parcela estimada: <span className="text-white/80">{brl(parcela)}</span>
          </p>

          {leadId ? (
            <p className="text-white/50 text-xs pt-2">
              Lead ID: <span className="font-mono text-white/70">{leadId}</span>
            </p>
          ) : null}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onBack}
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-white/90 hover:bg-white/10 active:scale-[0.99] transition"
          >
            Ajustar simulação
          </button>

          <a
            href="/leads"
            className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-zinc-950 hover:shadow-[0_14px_50px_rgba(34,211,238,0.25)] active:scale-[0.99] transition"
          >
            Ver leads →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
