import { useState, useRef, useEffect } from 'react'
import type { NominatimResultType } from '../types/NominatimResultType'
import { useLocation } from '../context/LocationContext'
import getShortLabel from '../tools/map/getShortLabel'

export default function SearchLocation() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<NominatimResultType[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const { updateLocation } = useLocation()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const search = async () => {
    if (!query.trim()) return

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/search?q=${encodeURIComponent(query)}`
    )

    const data = await res.json()
    setResults(data)
    setIsOpen(true)
  }
  console.log("Results: ", results)

  const handleSelect = (r: NominatimResultType) => {
    const shortLabel = getShortLabel(r);

    updateLocation(Number(r.lat), Number(r.lon), shortLabel)
    setQuery('')
    setResults([])
    setIsOpen(false)
  }
  const handleClear = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative w-full z-9000 mb-4"
    >
      <div className="flex w-full gap-2">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          placeholder="Rechercher une localité"
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        />

        <button
          onClick={search}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Chercher
        </button>

        {/* button clear */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-[120px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute left-1 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {results.map(r => (
            <li
              key={r.place_id}
              onClick={() => handleSelect(r)}
              className="px-4 py-2 cursor-pointer text-black hover:bg-blue-500 transition"
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}