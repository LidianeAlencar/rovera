import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardShell from "@/app/dashboard/components/DashboardShell";
import LeadCaptureForm from "./LeadCaptureForm";

export default async function LeadNewPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <DashboardShell>
      <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-24">
        <h1 className="font-goldman text-2xl text-white">Captação de lead</h1>
        <div className="mt-8">
          <LeadCaptureForm />
        </div>
      </div>
    </DashboardShell>
  );
}
