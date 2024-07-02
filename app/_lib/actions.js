'use server';

import { supabase } from './supabase';
import { auth, signIn, signOut } from './auth';
import { revalidatePath } from 'next/cache';
import { deleteBooking, getBookings, updateBooking } from './data-service';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');
  const nationalId = formData.get('nationalId');
  const [nationality, countryFlag] = formData.get('nationality').split('%');
  if (!/^[a-zA-Z0-9]/.test(nationalId))
    throw new Error('Please provide a valid Id');

  const updateData = { nationality, countryFlag, nationalId };
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);
  if (error) {
    throw new Error('Guest could not be updated');
  }
  // refresh data
  revalidatePath('/account/profile');
}

export async function deleteReservationByBookingId(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookIds = guestBookings.map((booking) => booking.id);
  if (!guestBookIds.includes(bookingId))
    throw new Error('You are not allowded to delete this booking');
  try {
    const { data, error } = await deleteBooking(bookingId);
  } catch (error) {
    throw new Error(error.message);
  }

  revalidatePath('/account/reservations');
}

export async function updateReservation(formData) {
  const bookingId = formData.get('bookingId');
  console.log(typeof bookingId);

  const observations = formData.get('observations');
  const numGuests = formData.get('numGuests');
  const session = await auth();
  if (!session) throw new Error('You must be logged in');
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookIds = guestBookings.map((booking) => booking.id);
  if (!guestBookIds.includes(Number(bookingId)))
    throw new Error('You are not allowded to delete this booking');
  try {
    const { data, error } = await updateBooking(bookingId, {
      observations,
      numGuests,
    });
  } catch (error) {
    throw new Error(error.message);
  }
  revalidatePath('/account/reservations');
}
