import { useState } from 'react';
import type { NominatimResultType } from '../types/NominatimResultType';
import { useLocation } from '../context/LocationContext';

export default function SearchLocation() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NominatimResultType[]>([]);
  const { updateLocation } = useLocation()

  const search = async () => {
    if (!query) return;
    const res = await fetch(`http://localhost:3310/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher une localité" />
      <button onClick={search}>Chercher</button>
      <ul>
        {results.map(r => (
          <li key={r.place_id} onClick={() => updateLocation(Number(r.lat), Number(r.lon))}>
            {r.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}