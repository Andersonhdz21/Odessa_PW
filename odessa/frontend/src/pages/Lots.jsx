import { useEffect, useState } from 'react';
import { fetchLots } from '../services/api';

export default function Lots() {
  const [lots, setLots] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchLots(token).then(setLots).catch(err=>console.error(err));
  }, []);
  return (
    <div>
      <h2>Lista de Lotes</h2>
      {lots.map(l => (
        <div key={l.id}>
          <h3>{l.name} — ${l.price}</h3>
          <p>{l.location} • {l.size} m²</p>
          <p>{l.description}</p>
        </div>
      ))}
    </div>
  );
}