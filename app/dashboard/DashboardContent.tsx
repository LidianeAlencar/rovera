"use client";

import type { Session } from "next-auth";
import UserHeader from "./components/UserHeader";
import SimulationForm from "./components/SimulationForm";

export default function DashboardContent({ session }: { session: Session }) {
  return (
    <>
      <UserHeader user={session.user} />

      <main className="pt-20 sm:pt-24">
        <div className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
          <div className="mt-6 sm:mt-10">
            <SimulationForm />
          </div>
        </div>
      </main>
    </>
  );
}
