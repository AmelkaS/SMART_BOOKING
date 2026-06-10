import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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

    addReservation({
      room: reservation.room,
      date: reservation.date,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      participants: Number(reservation.participants),
    });

    setMessage(
      `Rezerwacja sali ${reservation.room} została złożona i oczekuje na zatwierdzenie.`
    );
    setReservation(initialReservation);
  };

  return (
    <div className="page page-entries reservation-page">
      <section className="reservation-panel" aria-labelledby="reservation-heading">
        <h1 id="reservation-heading">Zarezerwuj salę</h1>

        <form className="reservation-form" onSubmit={submitReservation}>
          {error && <div className="error-message">{error}</div>}
          <label>
            <span>Sala</span>
            <select name="room" value={reservation.room} onChange={updateReservation}>
              <option value="Sala 1">Sala 1</option>
              <option value="Sala 2">Sala 2</option>
              <option value="Sala 3">Sala 3</option>
            </select>
          </label>

          <label>
            <span>Data</span>
            <input
              type="date"
              name="date"
              value={reservation.date}
              onChange={updateReservation}
              required
            />
          </label>

          <label>
            <span>Godzina rozpoczęcia</span>
            <select name="startTime" value={reservation.startTime} onChange={updateReservation}>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
            </select>
          </label>

          <label>
            <span>Godzina zakończenia</span>
            <select name="endTime" value={reservation.endTime} onChange={updateReservation}>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
            </select>
          </label>

          <label>
            <span>Liczba uczestników</span>
            <input
              type="number"
              name="participants"
              min="1"
              placeholder="Value"
              value={reservation.participants}
              onChange={updateReservation}
              required
            />
          </label>

          <button type="submit" className="reservation-submit-button">
            Rezerwuj
          </button>
        </form>

        {message && <p className="reservation-message">{message}</p>}
      </section>
    </div>
  );
}

export default EntriesPage;
