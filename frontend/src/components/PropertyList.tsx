import React from 'react';

interface Property {
  id: string;
  type: 'landed' | 'condominium';
  name: string;
  location: string;
}

const properties: Property[] = [
  { id: '1', type: 'landed', name: 'Taman Bukit Indah', location: 'Johor Bahru' },
  { id: '2', type: 'condominium', name: 'KLCC Residence', location: 'Kuala Lumpur' },
];

interface Props {
  onSelect: (id: string) => void;
}

const PropertyList: React.FC<Props> = ({ onSelect }) => (
  <div>
    <h2>Available Properties</h2>
    <ul>
      {properties.map((p) => (
        <li key={p.id} style={{ marginBottom: '0.5rem' }}>
          <strong>{p.name}</strong> ({p.type}) - {p.location}
          <button style={{ marginLeft: '1rem' }} onClick={() => onSelect(p.id)}>
            Book
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default PropertyList;
