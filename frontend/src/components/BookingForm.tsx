import React from 'react';

import { Unit } from './UnitTable';

interface Props {
  propertyId: string;
  unit: Unit;
  onDone: () => void;
}

const BookingForm: React.FC<Props> = ({ propertyId, unit, onDone }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const submit = async () => {
    await fetch('http://localhost:8000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, unitId: unit.id, name, email, message }),
    });
    alert('Booking submitted!');
    onDone();
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Book Unit {unit.number}</h3>
      <div>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <button onClick={submit}>Submit</button>
      <button onClick={onDone} style={{ marginLeft: '0.5rem' }}>Cancel</button>
    </div>
  );
};

export default BookingForm;
