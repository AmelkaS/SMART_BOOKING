import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const rooms = [
  {
    id: 1,
    name: 'Sala 1',
    seats: 40,
    building: 'Budynek A',
    floor: '1',
    type: 'Sala lekcyjna',
    equipment: ['Rzutnik x2', 'Tablica multimedialna x1'],
  },
  {
    id: 2,
    name: 'Sala 2',
    seats: 80,
    building: 'Budynek B',
    floor: '3',
    type: 'Aula',
    equipment: ['Rzutnik x1'],
  },
  {
    id: 3,
    name: 'Sala 3',
    seats: 24,
    building: 'Budynek A',
    floor: '2',
    type: 'Laboratorium',
    equipment: ['Komputery x24', 'Tablica multimedialna x1'],
  },
];

const initialFilters = {
  minSeats: '',
  maxSeats: '',
  building: '',
  floor: '',
  roomType: '',
  equipment: '',
};

function DashboardPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const minSeats = Number(activeFilters.minSeats);
      const maxSeats = Number(activeFilters.maxSeats);
      const hasEquipment = activeFilters.equipment
        ? room.equipment.some((item) => item.includes(activeFilters.equipment))
        : true;

      return (
        (!minSeats || room.seats >= minSeats) &&
        (!maxSeats || room.seats <= maxSeats) &&
        (!activeFilters.building || room.building === activeFilters.building) &&
        (!activeFilters.floor || room.floor === activeFilters.floor) &&
        (!activeFilters.roomType || room.type === activeFilters.roomType) &&
        hasEquipment
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
    <div className="page page-dashboard">
      <section className="rooms-panel" aria-labelledby="rooms-heading">
        <h1 id="rooms-heading">Lista sal lekcyjnych</h1>

        <form className="rooms-filter-form" onSubmit={applyFilters}>
          <input
            type="number"
            name="minSeats"
            min="0"
            placeholder="Minimalna liczba miejsc"
            value={filters.minSeats}
            onChange={updateFilter}
          />
          <input
            type="number"
            name="maxSeats"
            min="0"
            placeholder="Maksymalna liczba miejsc"
            value={filters.maxSeats}
            onChange={updateFilter}
          />
          <select name="building" value={filters.building} onChange={updateFilter}>
            <option value="">Budynek</option>
            <option value="Budynek A">Budynek A</option>
            <option value="Budynek B">Budynek B</option>
          </select>
          <select name="floor" value={filters.floor} onChange={updateFilter}>
            <option value="">Piętro</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select name="roomType" value={filters.roomType} onChange={updateFilter}>
            <option value="">Sala</option>
            <option value="Sala lekcyjna">Sala lekcyjna</option>
            <option value="Aula">Aula</option>
            <option value="Laboratorium">Laboratorium</option>
          </select>
          <select name="equipment" value={filters.equipment} onChange={updateFilter}>
            <option value="">Wymagane wyposażenie</option>
            <option value="Rzutnik">Rzutnik</option>
            <option value="Tablica multimedialna">Tablica multimedialna</option>
            <option value="Komputery">Komputery</option>
          </select>

          <button type="submit" className="rooms-filter-button">
            Zastosuj filtr
          </button>
          <button type="button" className="rooms-clear-button" onClick={clearFilters}>
            Wyczyść filtr
          </button>
        </form>

        <div className="rooms-list">
          {filteredRooms.map((room) => (
            <article className="room-list-item" key={room.id}>
              <h2>
                {room.name} - {room.seats} miejsc - {room.building} (piętro: {room.floor})
              </h2>
              <p>Wyposażenie: {room.equipment.join(', ')}</p>
              <Link className="room-reservation-link" to="/entries">
                Stwórz rezerwację
              </Link>
            </article>
          ))}
          {filteredRooms.length === 0 && (
            <p className="rooms-empty-state">Brak sal spełniających wybrane kryteria.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
