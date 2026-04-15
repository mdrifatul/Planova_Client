"use server";

import {
  ApiResponse,
  Invitation,
  SendInvitationDto,
  UpdateInvitationDto,
} from "@/interfaces";
import { invitationService } from "@/services/invitation.service";

// Send invitation
export const sendInvitationAction = async (
  payload: SendInvitationDto,
): Promise<ApiResponse<Invitation>> => {
  const res = await invitationService.sendInvitation(payload);
  return res;
};

// Get received invitations
export const getReceivedInvitationsAction = async (): Promise<
  ApiResponse<Invitation[]>
> => {
  const res = await invitationService.getReceivedInvitations();
  return res;
};

// Get sent invitations
export const getSentInvitationsAction = async (): Promise<
  ApiResponse<Invitation[]>
> => {
  const res = await invitationService.getSentInvitations();
  return res;
};

// Get event invitations
export const getEventInvitationsAction = async (
  eventId: string,
): Promise<ApiResponse<Invitation[]>> => {
  const res = await invitationService.getEventInvitations(eventId);
  return res;
};

// Get invitation by ID
export const getInvitationByIdAction = async (
  id: string,
): Promise<ApiResponse<Invitation>> => {
  const res = await invitationService.getInvitationById(id);
  return res;
};

// Update invitation
export const updateInvitationAction = async (
  id: string,
  payload: UpdateInvitationDto,
): Promise<ApiResponse<Invitation>> => {
  const res = await invitationService.updateInvitation(id, payload);
  return res;
};

// Delete invitation
export const deleteInvitationAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }>> => {
  const res = await invitationService.deleteInvitation(id);
  return res;
};
