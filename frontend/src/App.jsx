import { Routes, Route, Link } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import PropertyForm from './components/PropertyForm';

function App() {
  return (
    <div className="container mx-auto">
      <nav className="mb-4 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/create" element={<PropertyForm />} />
        <Route path="/edit/:id" element={<PropertyForm edit />} />
      </Routes>
    </div>
  );
}

export default App;
