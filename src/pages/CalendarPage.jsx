import { useMemo, useState } from 'react';
import { useReservations } from '../context/ReservationContext.jsx';

const dayLabels = ['PON', 'WT', 'ŚR', 'CZW', 'PT', 'SB', 'ND'];
const visibleHours = Array.from({ length: 25 }, (_, hour) => `${hour}:00`);
const dayStartMinutes = 0;
const dayEndMinutes = 24 * 60;

const getStartOfWeek = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + diffToMonday);

  return start;
};

const addDays = (date, days) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
};

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const parseTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
};

const getEventStyle = (reservation) => {
  const startMinutes = Math.max(parseTimeToMinutes(reservation.startTime), dayStartMinutes);
  const endMinutes = Math.min(parseTimeToMinutes(reservation.endTime), dayEndMinutes);
  const dayLength = dayEndMinutes - dayStartMinutes;
  const top = ((startMinutes - dayStartMinutes) / dayLength) * 100;
  const height = ((endMinutes - startMinutes) / dayLength) * 100;

  return {
    top: `${top}%`,
    height: `${Math.max(height, 2.8)}%`,
  };
};

function CalendarPage() {
  const { reservations } = useReservations();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState('');

  const todayKey = formatDateKey(new Date());

  const weekDays = useMemo(() => {
    const startOfWeek = getStartOfWeek(currentDate);

    return Array.from({ length: 7 }, (_, index) => addDays(startOfWeek, index));
  }, [currentDate]);

  const weekStartKey = formatDateKey(weekDays[0]);
  const weekEndKey = formatDateKey(weekDays[6]);

  const filteredReservations = useMemo(() => {
    return reservations
      .filter((res) => {
        const matchesWeek = res.date >= weekStartKey && res.date <= weekEndKey;
        const matchesRoom = !selectedRoom || res.room === selectedRoom;

        return matchesWeek && matchesRoom;
      })
      .sort((first, second) => {
        return `${first.date} ${first.startTime}`.localeCompare(`${second.date} ${second.startTime}`);
      });
  }, [reservations, selectedRoom, weekEndKey, weekStartKey]);

  const rooms = useMemo(() => {
    return [...new Set(reservations.map((res) => res.room))];
  }, [reservations]);

  const getReservationsForDay = (date) => {
    const dateKey = formatDateKey(date);

    return filteredReservations.filter((res) => res.date === dateKey);
  };

  const showPreviousWeek = () => {
    setCurrentDate((date) => addDays(date, -7));
  };

  const showNextWeek = () => {
    setCurrentDate((date) => addDays(date, 7));
  };

  const showToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="page page-calendar calendar-page">
      <section className="calendar-panel" aria-labelledby="calendar-heading">
        <h1 id="calendar-heading" className="calendar-sr-title">
          Kalendarz
        </h1>

        <div className="calendar-controls">
          <label className="calendar-room-filter">
            <span>Wyszukaj sali</span>
            <select value={selectedRoom} onChange={(event) => setSelectedRoom(event.target.value)}>
              <option value="">Value</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </label>

          <div className="calendar-week-controls" aria-label="Nawigacja tygodnia">
            <button type="button" onClick={showPreviousWeek} aria-label="Poprzedni tydzień">
              ←
            </button>
            <button type="button" onClick={showToday}>
              Dzisiaj
            </button>
            <button type="button" onClick={showNextWeek} aria-label="Następny tydzień">
              →
            </button>
          </div>
        </div>

        <div className="calendar-scroll">
          <div className="calendar-board">
            <div className="calendar-days-row">
              {weekDays.map((day, index) => (
                <div
                  className={`calendar-day ${formatDateKey(day) === todayKey ? 'is-today' : ''}`}
                  key={formatDateKey(day)}
                >
                  <span>{dayLabels[index]}</span>
                  <strong>{day.getDate()}</strong>
                </div>
              ))}
            </div>

            <div className="calendar-time-column" aria-hidden="true">
              {visibleHours.map((hour, index) => (
                <span
                  key={`left-${hour}`}
                  style={{ top: `${(index / (visibleHours.length - 1)) * 100}%` }}
                >
                  {hour}
                </span>
              ))}
            </div>

            <div className="calendar-grid">
              {weekDays.map((day) => {
                const dateKey = formatDateKey(day);
                const dayReservations = getReservationsForDay(day);

                return (
                  <div
                    className={`calendar-day-lane ${dateKey === todayKey ? 'is-today' : ''}`}
                    key={dateKey}
                  >
                    {dayReservations.map((reservation, index) => (
                      <article
                        className={`calendar-event calendar-event-${index % 3}`}
                        key={reservation.id}
                        style={getEventStyle(reservation)}
                      >
                        <strong>
                          {reservation.startTime} - {reservation.endTime}
                        </strong>
                        <span>{reservation.lecturer || reservation.room}</span>
                        <em>
                          {reservation.subject ||
                            (reservation.participants ? `${reservation.participants} os.` : '')}
                        </em>
                      </article>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="calendar-time-column calendar-time-column-right" aria-hidden="true">
              {visibleHours.map((hour, index) => (
                <span
                  key={`right-${hour}`}
                  style={{ top: `${(index / (visibleHours.length - 1)) * 100}%` }}
                >
                  {hour}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CalendarPage;
