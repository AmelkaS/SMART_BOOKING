import { useMemo, useState } from 'react';
import { useReservations } from '../context/ReservationContext.jsx';

const initialFilters = {
  room: '',
  to: '',
  from: '',
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

function HistoryPage() {
  const { reservations } = useReservations();
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const filteredHistory = useMemo(() => {
    return reservations.filter((item) => {
      return (
        (!activeFilters.room || item.room === activeFilters.room) &&
        (!activeFilters.from || item.date >= activeFilters.from) &&
        (!activeFilters.to || item.date <= activeFilters.to)
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

  const rooms = [...new Set(reservations.map((res) => res.room))];

  return (
    <div className="page page-history history-page">
      <section className="history-panel" aria-labelledby="history-heading">
        <h1 id="history-heading">Historia rezerwacji</h1>

        <form className="history-filter-form" onSubmit={applyFilters}>
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

          <button type="submit" className="history-filter-button">
            Zastosuj filtr
          </button>
          <button type="button" className="history-clear-button" onClick={clearFilters}>
            Wyczyść filtr
          </button>
        </form>

        <div className="history-list">
          {filteredHistory.map((item) => (
            <article className="history-list-item" key={item.id}>
              <h2>
                {item.room} - {formatDate(item.date)}, {item.startTime} - {item.endTime}
              </h2>
              <p>Liczba uczestników: {item.participants}</p>
              <p>
                Status: <strong>{item.status}</strong>
              </p>
            </article>
          ))}

          {filteredHistory.length === 0 && (
            <p className="history-empty-state">Brak historii dla wybranych kryteriów.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default HistoryPage;
