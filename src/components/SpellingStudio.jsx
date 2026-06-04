import { useState } from 'react';
import { spellingVariants } from '../data/names.js';

const spellingRules = {
  ava: [
    { variant: 'Ava', style: 'Classic', popular: true },
    { variant: 'Ayva', style: 'Trendy', popular: true },
    { variant: 'Ahva', style: 'Unique', popular: false },
    { variant: 'Avah', style: 'Phonetic', popular: true },
    { variant: 'Aeva', style: 'Modern', popular: false },
    { variant: 'Avva', style: 'Bold', popular: false },
    { variant: 'Aavah', style: 'Elaborate', popular: false },
    { variant: 'Aiva', style: 'Exotic', popular: false },
    { variant: 'Avia', style: 'Airy', popular: false },
  ],
  nicole: [
    { variant: 'Nicole', style: 'Classic', popular: true },
    { variant: 'Nichole', style: 'Traditional', popular: true },
    { variant: 'Nikole', style: 'Slavic', popular: false },
    { variant: 'Nicolle', style: 'French', popular: false },
    { variant: 'Nicholle', style: 'Elaborate', popular: false },
    { variant: 'Nycole', style: 'Trendy', popular: false },
    { variant: 'Nikolle', style: 'Unique', popular: false },
    { variant: 'Nikoal', style: 'Invented', popular: false },
  ],
  phoebe: [
    { variant: 'Phoebe', style: 'Classic', popular: true },
    { variant: 'Pheobe', style: 'Common variant', popular: true },
    { variant: 'Phoebie', style: 'Cute', popular: false },
    { variant: 'Pheebee', style: 'Playful', popular: false },
    { variant: 'Phoeby', style: 'Casual', popular: false },
    { variant: 'Febe', style: 'Italian', popular: false },
    { variant: 'Pheoby', style: 'Unique', popular: false },
    { variant: 'Phoebeh', style: 'Ornate', popular: false },
  ],
  crystal: [
    { variant: 'Crystal', style: 'Classic', popular: true },
    { variant: 'Krystal', style: 'K-Variant', popular: true },
    { variant: 'Chrystal', style: 'Ch-Variant', popular: false },
    { variant: 'Kristal', style: 'Scandinavian', popular: false },
    { variant: 'Krystle', style: '80s Trend', popular: true },
    { variant: 'Christal', style: 'Christ- prefix', popular: false },
    { variant: 'Khrystal', style: 'Kh-Exotic', popular: false },
    { variant: 'Cristal', style: 'Spanish', popular: false },
  ],
  mila: [
    { variant: 'Mila', style: 'Classic', popular: true },
    { variant: 'Myla', style: 'Y-Variant', popular: true },
    { variant: 'Meela', style: 'Elongated', popular: false },
    { variant: 'Milla', style: 'Double-L', popular: false },
    { variant: 'Miela', style: 'Exotic', popular: false },
    { variant: 'Mylah', style: '-ah ending', popular: true },
    { variant: 'Meilah', style: 'Elaborate', popular: false },
    { variant: 'Mila', style: 'Original', popular: true },
  ],
};

export default function SpellingStudio() {
  const [selectedName, setSelectedName] = useState('ava');
  const [customInput, setCustomInput] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const currentVariants = spellingRules[selectedName] || [];
  const displayName = selectedName.charAt(0).toUpperCase() + selectedName.slice(1);

  const handleCustomGenerate = () => {
    if (!customInput.trim()) return;
    setShowCustom(true);
  };

  return (
    <div className="space-y-8">
      {/* Name Selector */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="font-display font-bold text-xl text-brand-dark mb-4">
          Select a Name to Explore
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(spellingRules).map((key) => (
            <button
              key={key}
              onClick={() => { setSelectedName(key); setShowCustom(false); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedName === key
                  ? 'bg-brand-coral text-white'
                  : 'bg-brand-cream text-brand-dark hover:bg-brand-coral/10'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Or type any name..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/20 outline-none transition-all"
          />
          <button
            onClick={handleCustomGenerate}
            className="px-6 py-3 bg-brand-dark text-white rounded-xl font-medium hover:bg-opacity-90 transition-all"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Results */}
      {!showCustom ? (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-2xl text-brand-dark">
              {displayName} Variations
            </h3>
            <span className="text-sm text-brand-dark/50">
              {currentVariants.length} spellings found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentVariants.map((variant, idx) => (
              <div
                key={idx}
                className={`relative p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                  variant.popular
                    ? 'border-brand-coral/30 bg-brand-coral/5'
                    : 'border-gray-100 bg-brand-cream'
                }`}
              >
                {variant.popular && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-brand-coral text-white text-xs font-bold">
                    Popular
                  </span>
                )}
                <div className="font-display font-bold text-xl text-brand-dark mb-1">
                  {variant.variant}
                </div>
                <div className="text-sm text-brand-dark/50">{variant.style}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-display font-bold text-2xl text-brand-dark mb-4">
            Creative Spellings for "{customInput}"
          </h3>
          <p className="text-brand-dark/60 mb-6">
            Here are AI-generated creative spelling variations for your custom name:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              customInput,
              customInput.replace(/a/g, 'ay').replace(/e/g, 'ee'),
              customInput.replace(/c/g, 'k').replace(/s/g, 'z'),
              customInput + 'h',
              customInput.replace(/i/g, 'y').replace(/o/g, 'oh'),
              customInput.replace(/ph/g, 'f').replace(/th/g, 't'),
              'A' + customInput.slice(1),
              customInput.replace(/l/g, 'll').replace(/n/g, 'nn'),
            ].map((v, i) => (
              <div key={i} className="p-4 rounded-xl bg-brand-cream text-center font-display font-bold text-brand-dark">
                {v}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
