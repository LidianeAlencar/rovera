import { motion, AnimatePresence } from "framer-motion";

function brl(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

export default function SimulationResult({
  credito,
  prazo,
  parcela,
  valorTotal,
  taxaTotal,
}: {
  credito: number;
  prazo: number;
  parcela: number;
  valorTotal: number;
  taxaTotal: number;
}) {
  const taxaPct = Math.round(taxaTotal * 100);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/7 to-white/4 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <p className="text-white/70 text-sm">Sua parcela estimada</p>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${credito}-${prazo}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="text-white text-3xl sm:text-4xl font-semibold tracking-tight"
            >
              {brl(parcela)}
            </motion.div>
          </AnimatePresence>

          <p className="text-white/55 text-sm">
            Plano de <span className="text-white/80 font-medium">{prazo} meses</span> para um crédito de{" "}
            <span className="text-white/80 font-medium">{brl(credito)}</span>.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-3">
          <p className="text-white/70 text-xs">Resumo</p>
          <p className="text-white text-sm font-medium">
            Total estimado: {brl(valorTotal)}
          </p>
          <p className="text-white/50 text-xs">
            Taxas estimadas (admin + reserva): {taxaPct}%
          </p>
        </div>
      </div>
    </div>
  );
}
