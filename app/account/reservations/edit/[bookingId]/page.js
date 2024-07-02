import { getBooking, getCabin } from '@/app/_lib/data-service';
import UpdateReservationForm from '@/app/_components/UpdateReservationForm';

export const metadata = {
  title: 'Edit Reservation',
};

export default async function Page({ params }) {
  // CHANGE
  const reservationId = params.bookingId;
  const reservation = await getBooking(reservationId);
  const cabin = await getCabin(reservation.cabinId);
  const maxCapacity = cabin.maxCapacity;
  const numGuests = reservation.numGuests;
  const observations = reservation.observations;

  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
        Edit Reservation #{reservationId}
      </h2>
      <UpdateReservationForm
        numGuests={numGuests}
        observations={observations}
        reservationId={reservationId}
        maxCapacity={maxCapacity}
      />
    </div>
  );
}
