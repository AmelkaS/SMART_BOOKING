import { useMemo, useState } from 'react';

const historyItems = [
  {
    id: 1,
    room: 'Sala 1',
    from: '2026-05-01',
    to: '2026-05-01',
    time: '10:00 - 13:00',
    status: 'Anulowana',
  },
  {
    id: 2,
    room: 'Sala 1',
    from: '2026-05-02',
    to: '2026-05-02',
    time: '10:00 - 12:30',
    status: 'Zatwierdzona',
  },
  {
    id: 3,
    room: 'Sala 2',
    from: '2026-05-10',
    to: '2026-05-10',
    time: '09:00 - 10:30',
    status: 'Oczekuje',
  },
];

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
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const filteredHistory = useMemo(() => {
    return historyItems.filter((item) => {
      return (
        (!activeFilters.room || item.room === activeFilters.room) &&
        (!activeFilters.from || item.from >= activeFilters.from) &&
        (!activeFilters.to || item.to <= activeFilters.to)
      );
    });
  }, [activeFilters]);

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

  return (
    <div className="page page-history history-page">
      <section className="history-panel" aria-labelledby="history-heading">
        <h1 id="history-heading">Historia rezerwacji</h1>

        <form className="history-filter-form" onSubmit={applyFilters}>
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
                {item.room} - {formatDate(item.from)}, {item.time}
              </h2>
              <p>Zakres: {formatDate(item.from)} - {formatDate(item.to)}</p>
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
