import { useState } from 'react';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';
import PagePanel from '../components/PagePanel.jsx';
import { useNotifications } from '../context/NotificationContext.jsx';
import { useReservations } from '../context/ReservationContext.jsx';

const initialReservation = {
  room: 'Sala 1',
  date: '',
  startTime: '08:00',
  endTime: '09:00',
  participants: '',
};

function EntriesPage() {
  const { addReservation } = useReservations();
  const { addNotification } = useNotifications();
  const [reservation, setReservation] = useState(initialReservation);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateReservation = (event) => {
    const { name, value } = event.target;
    setReservation((currentReservation) => ({
      ...currentReservation,
      [name]: value,
    }));
    setError('');
  };

  const submitReservation = (event) => {
    event.preventDefault();
    setError('');

    if (!reservation.date) {
      setError('Wybierz datę rezerwacji');
      return;
    }

    if (!reservation.participants || Number(reservation.participants) <= 0) {
      setError('Liczba uczestników musi być większa niż 0');
      return;
    }

    const endTime = parseInt(reservation.endTime);
    const startTime = parseInt(reservation.startTime);
    if (endTime <= startTime) {
      setError('Godzina zakończenia musi być później niż godzina rozpoczęcia');
      return;
    }

    const newReservation = addReservation({
      room: reservation.room,
      date: reservation.date,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      participants: Number(reservation.participants),
    });

    addNotification({
      reservationId: newReservation.id,
      title: 'Złożono rezerwację',
      message: `Twoja rezerwacja sali ${newReservation.room} została złożona i oczekuje na zatwierdzenie.`,
    });

    setMessage(
      `Rezerwacja sali ${reservation.room} została złożona i oczekuje na zatwierdzenie.`
    );
    setReservation(initialReservation);
  };

  return (
    <div className="page page-entries reservation-page">
      <PagePanel
        className="reservation-panel"
        title="Zarezerwuj salę"
        titleId="reservation-heading"
      >
        <form className="reservation-form" onSubmit={submitReservation}>
          {error && <div className="error-message">{error}</div>}

          <FormField label="Sala">
            <select name="room" value={reservation.room} onChange={updateReservation}>
              <option value="Sala 1">Sala 1</option>
              <option value="Sala 2">Sala 2</option>
              <option value="Sala 3">Sala 3</option>
            </select>
          </FormField>

          <FormField label="Data">
            <input
              type="date"
              name="date"
              value={reservation.date}
              onChange={updateReservation}
              required
            />
          </FormField>

          <FormField label="Godzina rozpoczęcia">
            <select name="startTime" value={reservation.startTime} onChange={updateReservation}>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
            </select>
          </FormField>

          <FormField label="Godzina zakończenia">
            <select name="endTime" value={reservation.endTime} onChange={updateReservation}>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
            </select>
          </FormField>

          <FormField label="Liczba uczestników">
            <input
              type="number"
              name="participants"
              min="1"
              placeholder="Value"
              value={reservation.participants}
              onChange={updateReservation}
              required
            />
          </FormField>

          <Button type="submit" className="reservation-submit-button">
            Rezerwuj
          </Button>
        </form>

        {message && <p className="reservation-message">{message}</p>}
      </PagePanel>
    </div>
  );
}

export default EntriesPage;
