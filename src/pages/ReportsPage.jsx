import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReservations } from '../context/ReservationContext.jsx';

const initialFilters = {
  status: '',
  room: '',
  from: '',
  to: '',
};

const formatDateTime = (value) => {
  const date = new Date(value);
  return date.toLocaleString('pl-PL', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

function ReportsPage() {
  const { reservations, updateReservation } = useReservations();
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      return (
        (!activeFilters.status || reservation.status === activeFilters.status) &&
        (!activeFilters.room || reservation.room === activeFilters.room) &&
        (!activeFilters.from || reservation.date >= activeFilters.from) &&
        (!activeFilters.to || reservation.date <= activeFilters.to)
      );
    });
  }, [activeFilters, reservations]);

  const updateFilter = (event) => {
    const { name, value } = event.target;
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  const applyFilters = (event) => {
    event.preventDefault();
    setActiveFilters(filters);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setActiveFilters(initialFilters);
  };

  const cancelReservation = (id) => {
    updateReservation(id, { status: 'Anulowana' });
  };

  const rooms = [...new Set(reservations.map((res) => res.room))];

  return (
    <div className="page page-reports reservations-page">
      <section className="reservations-panel" aria-labelledby="reservations-heading">
        <h1 id="reservations-heading">Twoje rezerwacje</h1>

        <form className="reservations-filter-form" onSubmit={applyFilters}>
          <select name="status" value={filters.status} onChange={updateFilter}>
            <option value="">Status</option>
            <option value="Oczekuje">Oczekuje</option>
            <option value="Zatwierdzona">Zatwierdzona</option>
            <option value="Anulowana">Anulowana</option>
          </select>
          <select name="room" value={filters.room} onChange={updateFilter}>
            <option value="">Wszystkie sale</option>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <label>
            <span>Od</span>
            <input type="date" name="from" value={filters.from} onChange={updateFilter} />
          </label>
          <label>
            <span>Do</span>
            <input type="date" name="to" value={filters.to} onChange={updateFilter} />
          </label>

          <button type="submit" className="reservations-filter-button">
            Zastosuj filtr
          </button>
          <button type="button" className="reservations-clear-button" onClick={clearFilters}>
            Wyczyść filtr
          </button>
        </form>

        <div className="reservations-list">
          {filteredReservations.map((reservation) => (
            <article className="reservation-list-item" key={reservation.id}>
              <h2>
                {reservation.room} - {formatDateTime(reservation.date + 'T' + reservation.startTime)}{' '}
                - {formatDateTime(reservation.date + 'T' + reservation.endTime)}
              </h2>
              <p>
                Liczba uczestników: <strong>{reservation.participants}</strong>
              </p>
              <p>
                Status: <strong>{reservation.status}</strong>
              </p>
              {reservation.status !== 'Anulowana' && (
                <div className="reservation-actions">
                  <Link className="reservation-outline-button" to={`/edit/${reservation.id}`}>
                    Edytuj
                  </Link>
                  <button
                    type="button"
                    className="reservation-outline-button"
                    onClick={() => cancelReservation(reservation.id)}
                  >
                    Anuluj
                  </button>
                </div>
              )}
            </article>
          ))}

          {filteredReservations.length === 0 && (
            <p className="reservations-empty-state">
              Brak rezerwacji spełniających wybrane kryteria.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ReportsPage;
