"use client";

import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { X, Github, Chrome } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type ProviderId = "google" | "github";

export default function AuthModal({ isOpen, onClose }: Props) {
  const [loadingProvider, setLoadingProvider] = useState<ProviderId | null>(null);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
      setLoadingProvider(null);
    };
  }, [isOpen, onClose]);

  async function handleSignIn(provider: ProviderId) {
    try {
      setLoadingProvider(provider);
      await signIn(provider, { callbackUrl: "/dashboard" });
      onClose();
    } catch {
      setLoadingProvider(null);
    }
  }

  const isLoading = loadingProvider !== null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!isLoading) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
          >
            <button
              onClick={() => {
                if (!isLoading) onClose();
              }}
              className="absolute right-4 top-4 text-zinc-400 transition hover:text-white"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-semibold text-white">Comece sua simulação</h2>

              <p className="text-sm text-zinc-400">
                Entre com sua conta para continuar e receber sua proposta personalizada.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleSignIn("google")}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-medium text-black transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Chrome size={20} />
                {loadingProvider === "google" ? "Conectando..." : "Continuar com Google"}
              </button>

              <button
                onClick={() => handleSignIn("github")}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 py-3 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:border-[#A6F6FF] hover:shadow-[0_0_20px_rgba(166,246,255,0.2)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Github size={20} />
                {loadingProvider === "github" ? "Conectando..." : "Continuar com GitHub"}
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-zinc-500">
              Ao continuar, você concorda com nossos termos e política de privacidade.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
