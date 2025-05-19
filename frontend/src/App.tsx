import React from 'react';
import PropertyList from './components/PropertyList';
import BookingForm from './components/BookingForm';

const App: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = React.useState<string | null>(null);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Malaysia Property Booking</h1>
      <PropertyList onSelect={setSelectedPropertyId} />
      {selectedPropertyId && <BookingForm propertyId={selectedPropertyId} onDone={() => setSelectedPropertyId(null)} />}
    </div>
  );
};

export default App;
