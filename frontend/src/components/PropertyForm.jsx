import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createProperty, updateProperty, getProperty } from '../api';
import { useEffect, useState } from 'react';

function PropertyForm({ edit }) {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit && id) {
      getProperty(id).then(({ data }) => {
        reset(data);
      });
    }
  }, [edit, id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    if (edit && id) {
      await updateProperty(id, data);
    } else {
      await createProperty(data);
    }
    setLoading(false);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label className="block">Title</label>
        <input className="border p-2 w-full" {...register('title', { required: true })} />
      </div>
      <div>
        <label className="block">Description</label>
        <textarea className="border p-2 w-full" {...register('description', { required: true })} />
      </div>
      <div>
        <label className="block">Price</label>
        <input type="number" step="0.01" className="border p-2 w-full" {...register('price', { required: true })} />
      </div>
      <div>
        <label className="block">Address</label>
        <input className="border p-2 w-full" {...register('address', { required: true })} />
      </div>
      <div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" {...register('is_available')} /> Available
        </label>
      </div>
      <button disabled={loading} className="bg-blue-500 text-white px-4 py-2">
        {edit ? 'Update' : 'Create'}
      </button>
    </form>
  );
}

export default PropertyForm;
