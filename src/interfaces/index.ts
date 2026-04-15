// API Response Interface
export interface ApiResponse<T> {
  data: T | null;
  meta?: {
    total: number;
    limit: number;
    skip: number;
  };
  error: {
    message: string;
  } | null;
}

// Category Interfaces
export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Event Interfaces
export interface CreateEventDto {
  title: string;
  description?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  endDate?: string;
  venue?: string;
  maxAttendees?: number;
  fee?: number;
  currency?: "USD" | "BDT" | "AED" | "EUR" | "GBP";
  visibility?: "PUBLIC" | "PRIVATE";
  imageUrl?: string;
  categoryId?: string;
  tags?: string[];
}

export interface UpdateEventDto {
  title?: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  endDate?: string;
  venue?: string;
  maxAttendees?: number;
  fee?: number;
  currency?: "USD" | "BDT" | "AED" | "EUR" | "GBP";
  visibility?: "PUBLIC" | "PRIVATE";
  imageUrl?: string;
  categoryId?: string;
  tags?: string[];
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  endDate?: string;
  venue?: string;
  maxAttendees?: number;
  fee: number;
  currency: "USD" | "BDT" | "AED" | "EUR" | "GBP";
  visibility: "PUBLIC" | "PRIVATE";
  imageUrl?: string;
  categoryId?: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  organizerId: string;
  category?: Category;
  organizer?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export interface EventParticipant {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  joinedAt: string;
}

// Review Interfaces
export interface CreateReviewDto {
  rating: number;
  comment?: string;
  eventId: string;
}

export interface UpdateReviewDto {
  rating?: number;
  comment?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  eventId: string;
  event?: {
    id: string;
    title: string;
  };
}

// Participation Interfaces
export interface JoinEventDto {
  eventId: string;
}

export interface UpdateParticipationStatusDto {
  status: "PENDING" | "APPROVED" | "REJECTED" | "BANNED";
  notes?: string;
}

export interface Participation {
  id: string;
  userId: string;
  eventId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "BANNED";
  paymentStatus: "UNPAID" | "PAID" | "FAILED";
  notes?: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  event?: {
    id: string;
    title: string;
  };
}

// Invitation Interfaces
export interface SendInvitationDto {
  receiverId: string;
  eventId: string;
}

export interface UpdateInvitationDto {
  status: "PENDING" | "ACCEPTED" | "DECLINED";
}

export interface Invitation {
  id: string;
  senderId: string;
  receiverId: string;
  eventId: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  createdAt: string;
  updatedAt: string;
  sender?: {
    id: string;
    name: string;
    email: string;
  };
  receiver?: {
    id: string;
    name: string;
    email: string;
  };
  event?: {
    id: string;
    title: string;
  };
}

// User Interfaces
export interface UpdateUserStatusDto {
  status?: string;
}

export interface UpdateUserRoleDto {
  role?: string;
}

export interface UpdateUserProfileDto {
  name?: string;
  phone?: string;
  address?: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  image?: string;
  role: "USER" | "ADMIN" | "MODERATOR" | "ORGANIZER";
  status: string;
  createdAt: string;
  updatedAt: string;
}
