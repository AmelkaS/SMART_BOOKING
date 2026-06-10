import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const initialReservations = [
  {
    id: 1,
    room: 'Sala 1',
    start: '2026-05-01T10:00:00',
    end: '2026-05-01T13:00:00',
    status: 'Anulowana',
  },
  {
    id: 2,
    room: 'Sala 1',
    start: '2026-05-02T10:00:00',
    end: '2026-05-02T12:30:00',
    status: 'Zatwierdzona',
  },
  {
    id: 3,
    room: 'Sala 2',
    start: '2026-05-10T09:00:00',
    end: '2026-05-10T10:30:00',
    status: 'Oczekuje',
  },
];

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
    second: '2-digit',
  });
};

function ReportsPage() {
  const [reservations, setReservations] = useState(initialReservations);
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const reservationDate = reservation.start.slice(0, 10);

      return (
        (!activeFilters.status || reservation.status === activeFilters.status) &&
        (!activeFilters.room || reservation.room === activeFilters.room) &&
        (!activeFilters.from || reservationDate >= activeFilters.from) &&
        (!activeFilters.to || reservationDate <= activeFilters.to)
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
    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status: 'Anulowana' } : reservation
      )
    );
  };

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
            <option value="">Sala</option>
            <option value="Sala 1">Sala 1</option>
            <option value="Sala 2">Sala 2</option>
            <option value="Sala 3">Sala 3</option>
          </select>
          <label>
            <span>Do</span>
            <input type="date" name="to" value={filters.to} onChange={updateFilter} />
          </label>
          <label>
            <span>Od</span>
            <input type="date" name="from" value={filters.from} onChange={updateFilter} />
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
                {reservation.room} - {formatDateTime(reservation.start)} -{' '}
                {formatDateTime(reservation.end)}
              </h2>
              <p>
                Status: <strong>{reservation.status}</strong>
              </p>
              {reservation.status !== 'Anulowana' && (
                <div className="reservation-actions">
                  <Link className="reservation-outline-button" to="/entries">
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
