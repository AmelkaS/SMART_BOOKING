import { useState, useMemo } from 'react';
import { useReservations } from '../context/ReservationContext.jsx';

function CalendarPage() {
  const { reservations } = useReservations();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5)); // June 2026
  const [selectedRoom, setSelectedRoom] = useState('');

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentDate.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const filteredReservations = useMemo(() => {
    return reservations.filter((res) => {
      const resDate = new Date(res.date);
      const isSameMonth =
        resDate.getFullYear() === currentDate.getFullYear() &&
        resDate.getMonth() === currentDate.getMonth();
      const matchesRoom = !selectedRoom || res.room === selectedRoom;
      return isSameMonth && matchesRoom;
    });
  }, [reservations, currentDate, selectedRoom]);

  const getReservationsForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(day).padStart(2, '0')}`;
    return filteredReservations.filter((res) => res.date === dateStr);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const todayMonth = () => {
    setCurrentDate(new Date());
  };

  const rooms = [...new Set(reservations.map((res) => res.room))];

  const dayLabels = ['ND', 'PON', 'WT', 'ŚR', 'CZW', 'PT', 'SB'];
  const days = [];

  // Puste dni przed pierwszym dniem miesiąca
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Dni miesiąca
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="page page-calendar calendar-page">
      <section className="calendar-panel" aria-labelledby="calendar-heading">
        <div className="calendar-controls">
          <div className="calendar-toolbar">
            <label>
              <span>Filtruj po sali</span>
              <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                <option value="">Wszystkie sale</option>
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={todayMonth} className="calendar-today-button">
              Dzisiaj
            </button>
          </div>

          <div className="calendar-navigation">
            <button type="button" onClick={prevMonth} className="calendar-nav-button">
              ← Poprzedni
            </button>
            <h1 id="calendar-heading" className="calendar-month-title">
              {monthName}
            </h1>
            <button type="button" onClick={nextMonth} className="calendar-nav-button">
              Następny →
            </button>
          </div>
        </div>

        <div className="calendar-grid">
          {dayLabels.map((label) => (
            <div className="calendar-day-header" key={label}>
              {label}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              className={`calendar-day-cell ${day ? 'has-day' : 'empty'}`}
              key={`day-${index}`}
            >
              {day && (
                <>
                  <div className="calendar-day-number">{day}</div>
                  <div className="calendar-day-events">
                    {getReservationsForDay(day).map((res) => (
                      <div className="calendar-event" key={res.id} title={res.room}>
                        <strong>
                          {res.startTime} - {res.endTime}
                        </strong>
                        <span>{res.room}</span>
                        {res.participants && <small>{res.participants} os.</small>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {filteredReservations.length > 0 && (
          <div className="calendar-legend">
            <h2>Rezerwacje w miesiącu</h2>
            <ul>
              {filteredReservations.map((res) => {
                const resDate = new Date(res.date);
                const dayName = resDate.toLocaleDateString('pl-PL', { weekday: 'long' });
                return (
                  <li key={res.id}>
                    <strong>{res.room}</strong> - {dayName}, {res.startTime}-{res.endTime} (
                    {res.participants} uczestników)
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {filteredReservations.length === 0 && (
          <div className="calendar-empty">
            <p>Brak rezerwacji w wybranym miesiącu{selectedRoom && ` dla ${selectedRoom}`}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default CalendarPage;
