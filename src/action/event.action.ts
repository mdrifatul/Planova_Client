"use server";

import { eventService } from "@/services/event.service";
import {
  ApiResponse,
  CreateEventDto,
  Event,
  EventParticipant,
  UpdateEventDto,
} from "./../interfaces/index";

// Create a new event
export const createEventAction = async (
  payload: CreateEventDto,
): Promise<ApiResponse<Event>> => {
  const res = await eventService.createEvent(payload);
  return res;
};

// Get all events
export const getAllEventsAction = async (
  p0?: any,
  p1?: number,
  params?: {
    limit?: number;
    skip?: number;
    page?: number;
    searchTerm?: string;
    visibility?: "PUBLIC" | "PRIVATE";
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    include?: Array<"organizer" | "category" | "_count">;
    [key: string]: unknown;
  },
): Promise<ApiResponse<Event[]>> => {
  if (typeof p0 === "object" && p0 !== null) {
    return await eventService.getAllEvents(p0);
  }

  const effectiveParams = {
    ...params,
    limit: p0,
    skip: p1,
  };

  return await eventService.getAllEvents(effectiveParams);
};

// Get my events (organizer only)
export const getMyEventsAction = async (
  limit?: number,
  skip?: number,
): Promise<ApiResponse<Event[]>> => {
  const res = await eventService.getMyEvents(limit, skip);
  return res;
};

// Get event by ID
export const getEventByIdAction = async (
  id: string,
): Promise<ApiResponse<Event>> => {
  const res = await eventService.getEventById(id);
  return res;
};

// Get event participants
export const getEventParticipantsAction = async (
  eventId: string,
  limit?: number,
  skip?: number,
): Promise<ApiResponse<EventParticipant[]>> => {
  const res = await eventService.getEventParticipants(eventId, limit, skip);
  return res;
};

// Update event
export const updateEventAction = async (
  id: string,
  payload: UpdateEventDto,
): Promise<ApiResponse<Event>> => {
  const res = await eventService.updateEvent(id, payload);
  return res;
};

// Delete event
export const deleteEventAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }>> => {
  const res = await eventService.deleteEvent(id);
  return res;
};
