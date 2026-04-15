"use server";

import { paymentService } from "@/services/payment.service";

export const createCheckoutSession = async (eventId: string) => {
  const res = await paymentService.createCheckoutSession(eventId);
  return res;
};

export const getPaymentByOrderId = async (eventId: string) => {
  const res = await paymentService.getPaymentByOrderId(eventId);
  return res;
};
