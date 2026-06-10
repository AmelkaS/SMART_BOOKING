import { createContext, useContext, useState, useEffect } from 'react';

const ReservationContext = createContext();

const initialReservations = [
  {
    id: 1,
    room: 'Sala 1',
    date: '2026-06-09',
    startTime: '08:00',
    endTime: '09:00',
    participants: 15,
    lecturer: 'Andrzej Nowak',
    subject: 'PSK',
    status: 'Zatwierdzona',
  },
  {
    id: 2,
    room: 'Sala 2',
    date: '2026-06-10',
    startTime: '09:00',
    endTime: '11:00',
    participants: 30,
    lecturer: 'Kamil Nowak',
    subject: 'WDPAI',
    status: 'Zatwierdzona',
  },
];

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('reservations');
    return saved ? JSON.parse(saved) : initialReservations;
  });

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation) => {
    const newReservation = {
      ...reservation,
      id: Date.now(),
      status: 'Oczekuje',
    };
    setReservations((current) => [...current, newReservation]);
    return newReservation;
  };

  const updateReservation = (id, updates) => {
    setReservations((current) =>
      current.map((res) => (res.id === id ? { ...res, ...updates } : res))
    );
  };

  const deleteReservation = (id) => {
    setReservations((current) => current.filter((res) => res.id !== id));
  };

  const getReservationsByDate = (date) => {
    return reservations.filter((res) => res.date === date);
  };

  const getReservationsByMonth = (year, month) => {
    return reservations.filter((res) => {
      const resDate = new Date(res.date);
      return resDate.getFullYear() === year && resDate.getMonth() === month;
    });
  };

  const value = {
    reservations,
    addReservation,
    updateReservation,
    deleteReservation,
    getReservationsByDate,
    getReservationsByMonth,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservations must be used within ReservationProvider');
  }
  return context;
}
