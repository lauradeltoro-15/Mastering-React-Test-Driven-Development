import React from 'react';

const appointmenetTimeOfDay = (startsAt) => {
  const [h, m] = new Date(startsAt).toTimeString().split(':');
  return `${h}:${m}`;
};

export const Appointment = ({ customer }) => (
  <div>{customer.firstName}</div>
);

export const AppointmentsDayView = ({ appointments }) => (
  <div id="appointmentsDayView">
    <ol>
      {appointments.map((appointment) => (
        <li key={appointment.startsAt}>
          {appointmenetTimeOfDay(appointment.startsAt)}
        </li>
      ))}
    </ol>
  </div>
);
