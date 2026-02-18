import React from "react";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-zinc-950 text-white">{children}</div>;
}
