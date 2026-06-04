import { useState } from 'react';
import { doubleNames } from '../data/names.js';

const firstNames = [
  'Mary', 'Anna', 'Emma', 'Lily', 'Rose', 'Sarah', 'Kate', 'Jane',
  'Lou', 'Marie', 'May', 'Ellen', 'Ann', 'Beth', 'Claire', 'Grace',
  'Hope', 'Joy', 'Faith', 'Paige',
];

const secondNames = [
  'Anne', 'Kate', 'Jane', 'Lou', 'Marie', 'Rose', 'May', 'Ellen',
  'Ann', 'Beth', 'Claire', 'Grace', 'Hope', 'Joy', 'Faith', 'Paige',
  'Lynn', 'Rae', 'Sue', 'Jean',
];

function trackDoubleNameEvent(eventName, data) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...data,
    });
  }
}

export default function DoubleNameGenerator() {
  const [generated, setGenerated] = useState(doubleNames.slice(0, 5));
  const [filter, setFilter] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  const generateRandom = () => {
    const results = [];
    for (let i = 0; i < 8; i++) {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const second = secondNames[Math.floor(Math.random() * secondNames.length)];
      if (first !== second) {
        results.push({
          first,
          second,
          full: `${first}-${second}`,
          gender: 'girl',
        });
      }
    }
    setGenerated(results);
    trackDoubleNameEvent('generate_double_name', {
      double_name_count: results.length,
      double_names: results.map(r => r.full).join(','),
    });
  };

  const toggleFavorite = (name) => {
    const next = new Set(favorites);
    const isAdding = !next.has(name);
    if (isAdding) {
      next.add(name);
      trackDoubleNameEvent('favorite_double_name', {
        double_name: name,
        favorite_action: 'add',
        favorite_count: next.size,
      });
    } else {
      next.delete(name);
      trackDoubleNameEvent('favorite_double_name', {
        double_name: name,
        favorite_action: 'remove',
        favorite_count: next.size,
      });
    }
    setFavorites(next);
  };

  const filtered = generated.filter(n =>
    n.full.toLowerCase().includes(filter.toLowerCase()) ||
    n.first.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter names (e.g., 'Mary'...)"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/20 outline-none transition-all"
          />
          <button
            onClick={generateRandom}
            className="px-6 py-3 bg-brand-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Generate New
          </button>
        </div>
        <p className="text-sm text-brand-dark/50">
          Click the heart to save favorites. Names are randomly generated from classic double-name combinations.
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((name, idx) => (
          <div
            key={idx}
            className="relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-brand-coral/20 transition-all group"
          >
            <button
              onClick={() => toggleFavorite(name.full)}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                favorites.has(name.full)
                  ? 'bg-brand-coral text-white'
                  : 'bg-gray-100 text-gray-400 hover:bg-brand-coral/20 hover:text-brand-coral'
              }`}
            >
              <svg className="w-4 h-4" fill={favorites.has(name.full) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <div className="font-display font-bold text-2xl text-brand-dark mb-2">
              {name.full}
            </div>
            <div className="flex items-center gap-2 text-sm text-brand-dark/50">
              <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 text-xs">{name.gender}</span>
            </div>
          </div>
        ))}
      </div>

      {favorites.size > 0 && (
        <div className="bg-gradient-to-br from-brand-coral/5 to-brand-yellow/5 rounded-2xl p-6 border border-brand-coral/10">
          <h3 className="font-display font-bold text-xl text-brand-dark mb-4">
            Your Favorites ({favorites.size})
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(favorites).map(name => (
              <span key={name} className="px-4 py-2 rounded-full bg-white border border-brand-coral/20 text-brand-dark font-medium text-sm">
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
