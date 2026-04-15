"use client";

import { joinEventAction } from "@/action/participation.action";
import { createCheckoutSession } from "@/action/payment.action";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface JoinButtonProps {
  eventId: string;
  isFull?: boolean;
  fee?: number;
}

export default function JoinButton({
  eventId,
  isFull,
  fee = 0,
}: JoinButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleAction = async () => {
    if (!session) {
      toast.error("Please login to proceed");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      if (fee > 0) {
        // Paid Event logic:
        // 1. Try to join the event first (creates un-paid participation record).
        const joinRes = await joinEventAction(eventId);

        // If join fails with a different error than "already joined", stop here.
        if (
          !joinRes.data &&
          joinRes.error?.message !==
            "You have already joined or requested to join this event"
        ) {
          toast.error(
            joinRes.error?.message || "Failed to join event for payment",
          );
          setLoading(false);
          return;
        }

        // 2. Initiate Stripe Checkout session for the event.
        const res = await createCheckoutSession(eventId);
        if (res.data && res.data.url) {
          window.location.href = res.data.url;
        } else {
          toast.error(res.error || "Failed to initiate payment");
        }
      } else {
        // Free Event logic
        const res = await joinEventAction(eventId);
        if (res.data) {
          toast.success("Successfully joined the event!");
          router.refresh();
        } else {
          toast.error(res.error?.message || "Failed to join event");
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAction}
      disabled={loading || isFull}
      className={`w-full py-6 rounded-xl font-bold text-lg transition-all duration-300 ${
        isFull
          ? "bg-zinc-200 text-zinc-500 cursor-not-allowed dark:bg-zinc-800"
          : "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/20 active:scale-95"
      }`}
    >
      Join Event Now
    </Button>
  );
}
