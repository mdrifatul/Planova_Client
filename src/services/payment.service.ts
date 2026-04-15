import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const paymentService = {
  createCheckoutSession: async function (eventId: string) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/payments/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
        body: JSON.stringify({ eventId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create checkout session");
      }

      return { data: data.data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: message };
    }
  },

  getPaymentByOrderId: async function (eventId: string) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/payments/${eventId}`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to get payment");
      }

      return { data: data.data, error: null };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { data: null, error: "Something went wrong" };
    }
  },
};
