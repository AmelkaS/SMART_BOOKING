import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReservations } from '../context/ReservationContext.jsx';

function EditReservationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reservations, updateReservation } = useReservations();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reservation = reservations.find((res) => res.id === parseInt(id));
    if (reservation) {
      setFormData({ ...reservation });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id, reservations]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Data jest wymagana';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Godzina początkowa jest wymagana';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'Godzina końcowa jest wymagana';
    }

    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'Godzina końcowa musi być późniejsza niż początkowa';
    }

    if (!formData.participants || formData.participants <= 0) {
      newErrors.participants = 'Liczba uczestników musi być większa od 0';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateReservation(formData.id, {
      room: formData.room,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      participants: formData.participants,
      status: 'Oczekuje',
    });

    navigate('/reports');
  };

  const handleCancel = () => {
    navigate('/reports');
  };

  if (loading) {
    return (
      <div className="page page-edit-reservation">
        <section className="edit-reservation-panel">
          <p>Ładowanie...</p>
        </section>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="page page-edit-reservation">
        <section className="edit-reservation-panel">
          <h1>Rezerwacja nie znaleziona</h1>
          <button type="button" onClick={handleCancel}>
            Powrót do rezerwacji
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="page page-edit-reservation">
      <section className="edit-reservation-panel" aria-labelledby="edit-heading">
        <h1 id="edit-heading">Edytuj rezerwację</h1>

        <form className="edit-reservation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="room">
              <span>Sala</span>
              <input
                id="room"
                type="text"
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                disabled
                placeholder="Sala"
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="date">
              <span>Data</span>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </label>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startTime">
                <span>Godzina początkowa</span>
                <input
                  id="startTime"
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
                {errors.startTime && <span className="form-error">{errors.startTime}</span>}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="endTime">
                <span>Godzina końcowa</span>
                <input
                  id="endTime"
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
                {errors.endTime && <span className="form-error">{errors.endTime}</span>}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="participants">
              <span>Liczba uczestników</span>
              <input
                id="participants"
                type="number"
                name="participants"
                value={formData.participants}
                onChange={handleInputChange}
                min="1"
                required
              />
              {errors.participants && <span className="form-error">{errors.participants}</span>}
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="edit-reservation-submit-button">
              Zapisz zmiany
            </button>
            <button type="button" className="edit-reservation-cancel-button" onClick={handleCancel}>
              Anuluj
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditReservationPage;
