import { Booking, Technician } from '../types';
import { INITIAL_TECHNICIANS } from '../data/mockData';

const TECHS_STORAGE_KEY = 'fixpulse_technicians_v1';
const BOOKINGS_STORAGE_KEY = 'fixpulse_bookings_v1';
const ACTIVE_BOOKING_ID_KEY = 'fixpulse_active_booking_id_v1';

export function getStoredTechnicians(): Technician[] {
  try {
    const raw = localStorage.getItem(TECHS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TECHS_STORAGE_KEY, JSON.stringify(INITIAL_TECHNICIANS));
      return INITIAL_TECHNICIANS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TECHNICIANS;
  }
}

export function saveStoredTechnicians(techs: Technician[]): void {
  try {
    localStorage.setItem(TECHS_STORAGE_KEY, JSON.stringify(techs));
  } catch (e) {
    console.error('Failed to save technicians to localStorage', e);
  }
}

export function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save bookings to localStorage', e);
  }
}

export function getStoredActiveBookingId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_BOOKING_ID_KEY);
  } catch {
    return null;
  }
}

export function saveStoredActiveBookingId(id: string | null): void {
  try {
    if (id) {
      localStorage.setItem(ACTIVE_BOOKING_ID_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_BOOKING_ID_KEY);
    }
  } catch (e) {
    console.error('Failed to save active booking id to localStorage', e);
  }
}
