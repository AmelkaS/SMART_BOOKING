import { useState } from 'react';

const initialReservation = {
  room: 'Sala 1',
  date: '',
  startTime: '08:00',
  endTime: '09:00',
  participants: '',
};

function EntriesPage({ onAddReservation }) {
  const [reservation, setReservation] = useState(initialReservation);
  const [message, setMessage] = useState('');

  const updateReservation = (event) => {
    const { name, value } = event.target;
    setReservation((currentReservation) => ({
      ...currentReservation,
      [name]: value,
    }));
  };

  const submitReservation = (event) => {
    event.preventDefault();

    const reservationDate = new Date(reservation.date);
    const dayLabels = ['ND', 'PON', 'WT', 'ŚR', 'CZW', 'PT', 'SB'];
    const day = reservationDate.toString() !== 'Invalid Date' ? dayLabels[reservationDate.getDay()] : '';

    const newReservation = {
      id: Date.now(),
      room: reservation.room,
      date: reservation.date,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      participants: reservation.participants,
      day,
      time: `${reservation.startTime} - ${reservation.endTime}`,
    };

    if (onAddReservation) {
      onAddReservation(newReservation);
    }

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
