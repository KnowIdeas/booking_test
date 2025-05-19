import React from 'react';
import PropertyList from './components/PropertyList';
import BookingForm from './components/BookingForm';
import UnitTable, { Unit } from './components/UnitTable';

const App: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = React.useState<string | null>(null);
  const [unitToBook, setUnitToBook] = React.useState<Unit | null>(null);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const backToProperties = () => {
    setSelectedPropertyId(null);
    setUnitToBook(null);
  };

  const bookingDone = () => {
    setUnitToBook(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Malaysia Property Booking</h1>
      {!selectedPropertyId && !unitToBook && (
        <PropertyList onSelect={setSelectedPropertyId} />
      )}
      {selectedPropertyId && !unitToBook && (
        <div>
          <button onClick={backToProperties}>Back</button>
          <UnitTable
            propertyId={selectedPropertyId}
            refreshKey={refreshKey}
            onSelectUnit={setUnitToBook}
          />
        </div>
      )}
      {unitToBook && (
        <BookingForm
          propertyId={selectedPropertyId!}
          unit={unitToBook}
          onDone={bookingDone}
        />
      )}
    </div>
  );
};

export default App;
