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
  <div className="table-container">
    <h2>Available Properties</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Location</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {properties.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.type}</td>
            <td>{p.location}</td>
            <td>
              <button onClick={() => onSelect(p.id)}>Book</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PropertyList;
