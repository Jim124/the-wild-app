import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';

async function ReservationDetail({ cabin }) {
  const cabinId = cabin.id;
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabinId),
  ]);
  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default ReservationDetail;
