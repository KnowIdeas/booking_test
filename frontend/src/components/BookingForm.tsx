import React from 'react';

interface Props {
  propertyId: string;
  onDone: () => void;
}

const BookingForm: React.FC<Props> = ({ propertyId, onDone }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const submit = async () => {
    await fetch('http://localhost:8000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, name, email, message }),
    });
    alert('Booking submitted!');
    onDone();
  };

  return (

    <div className="booking-form">

      <h3>Book Property {propertyId}</h3>
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

      <button onClick={onDone}>Cancel</button>

    </div>
  );
};

export default BookingForm;
