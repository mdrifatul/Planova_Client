"use server";

import {
  ApiResponse,
  Participation,
  UpdateParticipationStatusDto,
} from "@/interfaces";
import { participationService } from "@/services/participation.service";


export const joinEventAction = async (
  eventId: string,
): Promise<ApiResponse<Participation>> => {
  const res = await participationService.joinEvent(eventId);
  return res;
};


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


export const getMyParticipationsAction = async (): Promise<
  ApiResponse<Participation[]>
> => {
  const res = await participationService.getMyParticipations();
  return res;
};


export const deleteParticipationAction = async (
  participationId: string,
): Promise<ApiResponse<{ message: string }>> => {
  const res = await participationService.deleteParticipation(participationId);
  return res;
};
