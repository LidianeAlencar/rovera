"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

type UserLike = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function UserHeader({ user }: { user?: UserLike }) {
  const name = user?.name ?? "Usuário";
  const email = user?.email ?? "";
  const image = user?.image ?? "";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
            <span className="text-white font-semibold">R</span>
          </div>

          <div className="min-w-0">
            <p className="text-white font-semibold leading-tight truncate">
              {name}
            </p>
            <p className="text-white/60 text-sm leading-tight truncate">
              {email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/10 bg-white/5">
            {image ? (
              <Image
                src={image}
                alt="Foto do usuário"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            ) : null}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 active:scale-[0.98] transition"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
