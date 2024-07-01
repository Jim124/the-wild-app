import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import { auth } from '@/app/_lib/auth';
import LoginMessage from './LoginMessage';

async function ReservationDetail({ cabin }) {
  const cabinId = cabin.id;
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabinId),
  ]);
  const session = await auth();
  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default ReservationDetail;
