import React, { useEffect, useState } from 'react';

export interface Unit {
  id: string;
  number: string;
  sqft: number;
  price: number;
  status: 'available' | 'booked' | 'sold';
}

interface Props {
  propertyId: string;
  refreshKey?: number;
  onSelectUnit: (unit: Unit) => void;
}

const colorFor = (status: string) => {
  switch (status) {
    case 'available':
      return 'green';
    case 'booked':
      return 'yellow';
    case 'sold':
      return 'red';
    default:
      return 'grey';
  }
};

const UnitTable: React.FC<Props> = ({ propertyId, refreshKey, onSelectUnit }) => {
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/units?propertyId=${propertyId}`)
      .then((res) => res.json())
      .then(setUnits);
  }, [propertyId, refreshKey]);

  return (
    <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Unit</th>
          <th>Sqft</th>
          <th>Price (RM)</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {units.map((u) => (
          <tr key={u.id} style={{ textAlign: 'center', borderTop: '1px solid #ccc' }}>
            <td>{u.number}</td>
            <td>{u.sqft}</td>
            <td>{u.price.toLocaleString()}</td>
            <td>{u.status}</td>
            <td>
              <button
                style={{ backgroundColor: colorFor(u.status), color: '#000', padding: '0.25rem 0.5rem' }}
                disabled={u.status !== 'available'}
                onClick={() => onSelectUnit(u)}
              >
                {u.status === 'available' ? 'Book' : 'View'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UnitTable;
