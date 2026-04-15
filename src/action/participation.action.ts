"use server";

import {
  ApiResponse,
  Participation,
  UpdateParticipationStatusDto,
} from "@/interfaces";
import { participationService } from "@/services/participation.service";

// Join an event
export const joinEventAction = async (
  eventId: string,
): Promise<ApiResponse<Participation>> => {
  const res = await participationService.joinEvent(eventId);
  return res;
};

// Update participation status
export const updateParticipationStatusAction = async (
  participationId: string,
  payload: UpdateParticipationStatusDto,
): Promise<ApiResponse<Participation>> => {
  const res = await participationService.updateParticipationStatus(
    participationId,
    payload,
  );
  return res;
};

// Get my participations
export const getMyParticipationsAction = async (): Promise<
  ApiResponse<Participation[]>
> => {
  const res = await participationService.getMyParticipations();
  return res;
};

// Delete participation
export const deleteParticipationAction = async (
  participationId: string,
): Promise<ApiResponse<{ message: string }>> => {
  const res = await participationService.deleteParticipation(participationId);
  return res;
};
