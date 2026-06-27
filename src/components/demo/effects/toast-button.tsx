"use client";

import { useRef } from "react";
import { toast } from "sonner";
import { Bell } from "lucide-react";

const MESSAGES = [
  { t: "New inquiry received", d: "From a roofing company in Austin." },
  { t: "Booking confirmed", d: "Tuesday, 2:00 PM — added to calendar." },
  { t: "Payment received", d: "$1,200 deposit cleared." },
  { t: "Form submitted", d: "Lead routed to your inbox + CRM." },
];

/** Fires a real toast notification. Works identically on tap (mobile). */
export default function ToastButton() {
  const i = useRef(0);

  const fire = () => {
    const m = MESSAGES[i.current % MESSAGES.length];
    i.current += 1;
    toast.success(m.t, { description: m.d });
  };

  return (
    <button
      type="button"
      onClick={fire}
      className="inline-flex items-center gap-2 rounded-full bg-[#0c5450] px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:brightness-110 active:scale-95"
    >
      <Bell size={16} className="text-[#8fd6cf]" />
      Trigger a notification
    </button>
  );
}
