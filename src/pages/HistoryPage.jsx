import { useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';
import PagePanel from '../components/PagePanel.jsx';
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

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

function HistoryPage() {
  const { reservations } = useReservations();
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const todayDate = getTodayDateString();

  const historicalReservations = useMemo(() => {
    return reservations.filter((item) => item.date < todayDate);
  }, [reservations, todayDate]);

  const filteredHistory = useMemo(() => {
    return historicalReservations.filter((item) => {
      return (
        (!activeFilters.room || item.room === activeFilters.room) &&
        (!activeFilters.from || item.date >= activeFilters.from) &&
        (!activeFilters.to || item.date <= activeFilters.to)
      );
    });
  }, [activeFilters, historicalReservations]);

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

  const rooms = [...new Set(historicalReservations.map((res) => res.room))];

  return (
    <div className="page page-history history-page">
      <PagePanel
        className="history-panel"
        title="Historia rezerwacji"
        titleId="history-heading"
      >
        <form className="history-filter-form" onSubmit={applyFilters}>
          <select name="room" value={filters.room} onChange={updateFilter}>
            <option value="">Sala</option>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>

          <FormField label="Od">
            <input type="date" name="from" value={filters.from} onChange={updateFilter} />
          </FormField>

          <FormField label="Do">
            <input type="date" name="to" value={filters.to} onChange={updateFilter} />
          </FormField>

          <Button type="submit" className="history-filter-button">
            Zastosuj filtr
          </Button>
          <Button type="button" className="history-clear-button" onClick={clearFilters}>
            Wyczyść filtr
          </Button>
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
      </PagePanel>
    </div>
  );
}

export default HistoryPage;
