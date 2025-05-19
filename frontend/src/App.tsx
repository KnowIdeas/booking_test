import React from 'react';
import PropertyList from './components/PropertyList';
import BookingForm from './components/BookingForm';
import './styles/main.css';


const App: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = React.useState<string | null>(null);

  return (
    <div className="app-container">
      <h1>Malaysia Property Booking</h1>
      <PropertyList onSelect={setSelectedPropertyId} />
      {selectedPropertyId && <BookingForm propertyId={selectedPropertyId} onDone={() => setSelectedPropertyId(null)} />}
    </div>
  );
};

export default App;
