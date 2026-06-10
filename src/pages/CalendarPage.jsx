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

const reservations = [
  {
    id: 1,
    day: 'PON',
    hour: '8:00',
    time: '8:00 - 9:00',
    lecturer: 'Andrzej Nowak',
    subject: 'PSK',
  },
  {
    id: 2,
    day: 'WT',
    hour: '9:00',
    time: '9:00 - 11:00',
    lecturer: 'Kamil Nowak',
    subject: 'WDPAI',
  },
];

function CalendarPage() {
  const findReservation = (day, hour) =>
    reservations.find((reservation) => reservation.day === day && reservation.hour === hour);

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
                        <strong>{reservation.time}</strong>
                        <span>{reservation.lecturer}</span>
                        <em>{reservation.subject}</em>
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
