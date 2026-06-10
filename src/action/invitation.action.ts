"use server";

import {
  ApiResponse,
  Invitation,
  SendInvitationDto,
  UpdateInvitationDto,
} from "@/interfaces";
import { invitationService } from "@/services/invitation.service";


export const sendInvitationAction = async (
  payload: SendInvitationDto,
): Promise<ApiResponse<Invitation>> => {
  const res = await invitationService.sendInvitation(payload);
  return res;
};


export const getReceivedInvitationsAction = async (): Promise<
  ApiResponse<Invitation[]>
> => {
  const res = await invitationService.getReceivedInvitations();
  return res;
};


export const getSentInvitationsAction = async (): Promise<
  ApiResponse<Invitation[]>
> => {
  const res = await invitationService.getSentInvitations();
  return res;
};


export const getEventInvitationsAction = async (
  eventId: string,
): Promise<ApiResponse<Invitation[]>> => {
  const res = await invitationService.getEventInvitations(eventId);
  return res;
};


export const getInvitationByIdAction = async (
  id: string,
): Promise<ApiResponse<Invitation>> => {
  const res = await invitationService.getInvitationById(id);
  return res;
};


export const updateInvitationAction = async (
  id: string,
  payload: UpdateInvitationDto,
): Promise<ApiResponse<Invitation>> => {
  const res = await invitationService.updateInvitation(id, payload);
  return res;
};


export const deleteInvitationAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }>> => {
  const res = await invitationService.deleteInvitation(id);
  return res;
};
