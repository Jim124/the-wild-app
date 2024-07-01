'use server';

import { supabase } from './supabase';
import { auth, signIn, signOut } from './auth';

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
}
