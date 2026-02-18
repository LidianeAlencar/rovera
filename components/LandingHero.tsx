"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AuthModal from "./AuthModal";

export default function LandingHero() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState(false);

  function handleCTA() {
    if (session) {
      router.push("/dashboard");
      return;
    }

    setPendingRedirect(true);
    setOpen(true);
  }

  useEffect(() => {
    if (!pendingRedirect) return;
    if (status !== "authenticated") return;

    setOpen(false);
    setPendingRedirect(false);
    router.push("/dashboard");
  }, [pendingRedirect, status, router]);

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
        {/* ===== SHADOW ===== */}
        <div
          className="
            pointer-events-none
            absolute
            top-[50px]
            -left-[250px]
            w-[1250px]
            h-[230px]
            rotate-[25deg]
            rounded-full
            bg-white/18
            blur-3xl
            z-10
          "
        />

        {/* ===== LOGO ===== */}
        <div
          className="
            absolute top-6 left-1/2 -translate-x-1/2 z-30
            lg:top-15 lg:left-15 lg:translate-x-0
          "
        >
          <Image
            src="/logo.svg"
            alt="Rovera Consórcio"
            width={175}
            height={54}
            priority
            className="select-none"
          />
        </div>

        {/* ===== MOBILE HEADLINE ===== */}
        <div className="mt-40 flex flex-col items-center text-center lg:hidden">
          <h1 className="font-heading text-[60px] font-bold hero-metal leading-tight">
            O SEU
          </h1>
          <h2 className="font-heading text-[35px] font-bold text-white/80">
            FUTURO CHEGOU
          </h2>
        </div>

        {/* ===== FRAME CENTRAL ===== */}
        <div className="relative mx-auto flex min-h-screen max-w-[1280px] flex-col items-center justify-center px-6">
          {/* ===== LINHA HORIZONTAL (DESKTOP) ===== */}
          <div className="relative top-[275px] left-1/2 hidden h-px w-full max-w-[1145px] -translate-x-1/2 bg-white/20 lg:block" />

          {/* ===== CÍRCULOS ===== */}
          <svg
            className="pointer-events-none absolute inset-0 z-20"
            viewBox="0 -70 1280 950"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle
              cx={249.13 + 748.24 / 2}
              cy={44.67 + 748.24 / 2}
              r={848.24 / 2}
              stroke="white"
              strokeOpacity="0.26"
              strokeWidth="1"
              strokeDasharray="2 2"
              fill="none"
            />

            <circle
              cx={459.27 + 327.97 / 2}
              cy={44.67 + 215 / 2}
              r={315 / 2}
              stroke="white"
              strokeOpacity="0.39"
              strokeWidth="1"
              strokeDasharray="2 2"
              fill="none"
            />
          </svg>

          {/* ===== TÍTULOS DESKTOP ===== */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <h1 className="absolute top-[180px] left-1/2 -translate-x-1/2 font-heading text-[148px] font-bold tracking-tight hero-metal">
              O SEU
            </h1>

            <div className="absolute top-[340px] left-15 right-0 flex justify-between px-12">
              <h2 className="font-heading text-[75px] font-bold tracking-tight text-white/75">
                FUTURO
              </h2>
              <h2 className="font-heading text-[75px] font-bold tracking-tight text-white/75">
                CHEGOU
              </h2>
            </div>
          </div>

          {/* ===== CARRO desk ===== */}
          <motion.div
            className="relative top-[5px] z-40 hidden h-[599px] w-[550px] lg:block"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/carro.png"
              alt="Rovera X1"
              fill
              priority
              className="object-contain select-none"
              sizes="550px"
            />
          </motion.div>

          {/* ===== CARRO MOBILE ===== */}
          <motion.div
            className="absolute -top-[20px] z-40 mt-10 aspect-[16/10] w-[120vw] max-w-[520px] lg:hidden"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/carro.png"
              alt="Rovera X1"
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          {/* ===== BLOCO INFERIOR ===== */}
          <div
            className="
              z-40 mt-10 flex flex-col items-center text-center
              lg:absolute lg:bottom-20
            "
          >
            <p className="font-body text-[20px] font-bold">Rovera X1</p>

            <p className="font-body text-[18px] text-white/80">
              100% elétrico, 0% juros.
            </p>

            <button
              onClick={handleCTA}
              className="
                mt-6 flex h-[44px] w-[240px] items-center justify-center gap-3
                rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[18px]
                border border-cyan-300 text-cyan-300
                transition-all duration-300
                hover:shadow-[0_0_20px_rgba(166,246,255,0.15)]
                lg:h-[40px] lg:w-[260px] -skew-x-[16deg]
              "
            >
              <span className="font-heading text-lg lg:text-[20px]">
                simule agora
              </span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setPendingRedirect(false);
        }}
      />
    </>
  );
}
