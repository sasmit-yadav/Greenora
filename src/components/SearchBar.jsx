import React, { useState, useRef, useEffect } from 'react'
import { searchService } from '../services/searchService'

export default function SearchBar({ onLocationSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const search = async () => {
      setIsLoading(true)
      try {
        let searchResults
        if (query.length === 0) {
          // Show all places when search is empty
          searchResults = await searchService.search('')
        } else if (query.length < 2) {
          searchResults = []
        } else {
          searchResults = await searchService.search(query)
        }
        setResults(searchResults)
        setIsOpen(searchResults.length > 0 || query.length === 0)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(search, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSelect = (result) => {
    setQuery(result.name)
    setIsOpen(false)
    onLocationSelect(result)
  }

  const handleFocus = () => {
    setIsOpen(results.length > 0 || query.length === 0)
  }

  const [searchFilter, setSearchFilter] = useState('all')

  const filterResults = (results) => {
    if (searchFilter === 'all') return results
    if (searchFilter === 'critical') return results.filter(r => r.riskLevel === 'critical')
    if (searchFilter === 'high') return results.filter(r => r.riskLevel === 'high')
    if (searchFilter === 'medium') return results.filter(r => r.riskLevel === 'medium')
    if (searchFilter === 'low') return results.filter(r => r.riskLevel === 'low')
    if (searchFilter === 'industrial') return results.filter(r => r.type.includes('Industrial'))
    if (searchFilter === 'residential') return results.filter(r => r.type.includes('Residential'))
    if (searchFilter === 'commercial') return results.filter(r => r.type.includes('Commercial'))
    if (searchFilter === 'green') return results.filter(r => r.type.includes('Green'))
    return results
  }

  const filteredResults = filterResults(results)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredResults.length > 0) {
      handleSelect(filteredResults[0])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
    }
  }

  return (
    <div className="relative min-w-0" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="Search zones, locations, or risk types..."
          aria-label="Search locations"
          className="w-full px-4 py-3 pl-12 pr-10 bg-gradient-to-r from-emerald-950 to-slate-900 border-2 border-emerald-500 rounded-full text-white placeholder-slate-300 shadow-lg shadow-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-300 transition-all duration-200"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span className="text-slate-400">🔍</span>
          )}
        </div>
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              setIsOpen(false)
            }}
            type="button"
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 transition-colors duration-150 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Filters */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 backdrop-blur-xl border-2 border-slate-700 rounded-3xl shadow-2xl z-50">
          <div className="p-5 space-y-4">
            <div className="text-xs text-slate-400 uppercase tracking-[0.24em] font-bold px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-lg w-max">Filter Results</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'All Results', icon: '🔍' },
                { id: 'critical', label: 'Critical', icon: '🔴', color: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-300' },
                { id: 'high', label: 'High Risk', icon: '🟠', color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-300' },
                { id: 'medium', label: 'Medium', icon: '🟡', color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-300' },
                { id: 'low', label: 'Low Risk', icon: '🟢', color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-300' },
                { id: 'industrial', label: 'Industrial', icon: '🏭', color: 'from-slate-600/30 to-slate-700/30 border-slate-500/30 text-slate-200' },
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSearchFilter(filter.id)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-150 border ${
                    searchFilter === filter.id
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 shadow-lg'
                      : filter.color || 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-700/50'
                  }`}
                >
                  {filter.icon} {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-700/50" />
        </div>
      )}

      {/* Search Results */}
      {isOpen && filteredResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 w-full bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-xl border-2 border-emerald-500 rounded-3xl shadow-[0_20px_60px_-15px_rgba(16,185,129,0.5)] z-40 max-h-96 overflow-hidden">
          <div className="p-4 space-y-2">
            <div className="text-xs text-emerald-300 uppercase tracking-[0.24em] font-bold px-2 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              {filteredResults.length} Zone{filteredResults.length !== 1 ? 's' : ''} Found
            </div>
            <div className="space-y-2 overflow-y-auto max-h-80">
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full text-left rounded-2xl px-5 py-4 bg-gradient-to-r from-slate-800 to-slate-800 border-2 border-slate-700 hover:border-emerald-500 hover:from-emerald-500/20 hover:to-slate-800 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-white font-bold text-sm truncate">{result.name}</span>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          result.riskLevel === 'critical' ? 'bg-red-500/25 text-red-200 border border-red-500/40' :
                          result.riskLevel === 'high' ? 'bg-orange-500/25 text-orange-200 border border-orange-500/40' :
                          result.riskLevel === 'medium' ? 'bg-yellow-500/25 text-yellow-200 border border-yellow-500/40' :
                          'bg-emerald-500/25 text-emerald-200 border border-emerald-500/40'
                        }`}>
                          {result.riskLevel}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">📍</span>
                          <span className="font-medium text-slate-300">{result.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400">🧭</span>
                          <span>{result.coordinates}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-emerald-400 text-2xl transition-transform duration-150 group-hover:scale-125 group-hover:translate-x-1">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && filteredResults.length === 0 && results.length > 0 && !isLoading && (
        <div className="absolute top-full mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-xl z-50 p-6 text-center">
          <div className="text-slate-500 mb-2 text-2xl">🔍</div>
          <div className="text-sm text-slate-400 font-medium">No zones match this filter</div>
          <div className="text-xs text-slate-600 mt-1">Try a different filter option</div>
        </div>
      )}

      {/* No Results at All */}

      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute top-full mt-2 w-full bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl z-50 p-4 text-center">
          <div className="text-slate-400 mb-2">🔍</div>
          <div className="text-sm text-slate-400">No locations found</div>
          <div className="text-xs text-slate-500 mt-1">
            Try searching for zone names, coordinates, or risk levels
          </div>
        </div>
      )}
    </div>
  )
}