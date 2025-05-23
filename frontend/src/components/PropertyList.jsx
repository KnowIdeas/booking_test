import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProperties, deleteProperty } from '../api';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  const load = async () => {
    const { data } = await getProperties();
    setProperties(data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    await deleteProperty(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Properties</h1>
      <ul className="space-y-2">
        {properties.map((p) => (
          <li key={p.id} className="border p-2 flex justify-between items-center">
            <span>
              <Link to={`/edit/${p.id}`} className="font-bold">{p.title}</Link>
            </span>
            <button
              onClick={() => remove(p.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;
