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
  limit?: number,
  skip?: number,
  searchTerm?: string,
  visibility?: "PUBLIC" | "PRIVATE",
): Promise<ApiResponse<Event[]>> => {
  const res = await eventService.getAllEvents(
    limit,
    skip,
    searchTerm,
    visibility,
  );
  return res;
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
