const days = [
  { label: 'PON', number: 3 },
  { label: 'WT', number: 4 },
  { label: 'ŚR', number: 5 },
  { label: 'CZW', number: 6 },
  { label: 'PT', number: 7 },
  { label: 'SB', number: 8 },
  { label: 'ND', number: 9 },
];

const hours = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00'];

const dayLabels = ['ND', 'PON', 'WT', 'ŚR', 'CZW', 'PT', 'SB'];

function CalendarPage({ reservations = [] }) {
  const findReservation = (day, hour) =>
    reservations.find((reservation) => {
      const reservationStart = reservation.startTime || reservation.hour;
      if (reservation.day) {
        return reservation.day === day && reservationStart === hour;
      }

      const date = new Date(reservation.date);
      const reservationDay = date.toString() !== 'Invalid Date' ? dayLabels[date.getDay()] : '';
      return reservationDay === day && reservationStart === hour;
    });

  return (
    <div className="page page-calendar calendar-page">
      <section className="calendar-panel" aria-labelledby="calendar-heading">
        <div className="calendar-toolbar">
          <label>
            <span>Wyszukaj sali</span>
            <select defaultValue="">
              <option value="">Value</option>
              <option value="Sala 1">Sala 1</option>
              <option value="Sala 2">Sala 2</option>
              <option value="Sala 3">Sala 3</option>
            </select>
          </label>
          <button type="button">Dzisiaj</button>
        </div>

        <h1 id="calendar-heading">Kalendarz</h1>

        <div className="calendar-grid" role="table" aria-label="Kalendarz rezerwacji sal">
          <div className="calendar-corner" />
          {days.map((day) => (
            <div className="calendar-day" key={day.label}>
              <strong>{day.label}</strong>
              <span>{day.number}</span>
            </div>
          ))}

          {hours.map((hour) => (
            <div className="calendar-row" key={hour}>
              <div className="calendar-hour">{hour}</div>
              {days.map((day) => {
                const reservation = findReservation(day.label, hour);
                return (
                  <div className="calendar-cell" key={`${day.label}-${hour}`}>
                    {reservation && (
                      <article className="calendar-event">
                        <strong>
                          {reservation.time || `${reservation.startTime} - ${reservation.endTime}`}
                        </strong>
                        {reservation.room && <span>{reservation.room}</span>}
                        {reservation.lecturer && <span>{reservation.lecturer}</span>}
                        {reservation.subject && <em>{reservation.subject}</em>}
                      </article>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CalendarPage;
