import React, { useEffect, useState, useCallback, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { getBusinessData } from '@/data/businessData';

const EMPTY_VAKKEN: string[] = [];

interface VakkenSelectorProps {
  onChange: (vakken: string[]) => void;
  initialValue?: string[];
  setIsQuestionAnswered: React.Dispatch<React.SetStateAction<boolean>>;
}

const VakkenSelector: React.FC<VakkenSelectorProps> = ({ onChange, initialValue = EMPTY_VAKKEN, setIsQuestionAnswered }) => {
  const { t } = useTranslation();
  const businessData = getBusinessData(t);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVakken, setSelectedVakken] = useState<string[]>(() => initialValue);
  const [customVak, setCustomVak] = useState('');

  // Combine all subjects from businessData
  const allVakken = [
    ...businessData.subjects.primary.map(subject => subject.NL),
    ...businessData.subjects.secondary.map(subject => subject.NL),
    ...businessData.subjects.higher.map(subject => subject.NL),
    ...businessData.subjects.programming.map(subject => subject.NL)
  ];

  const filteredVakken = allVakken.filter(vak =>
    vak.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleVak = useCallback((vak: string) => {
    setSelectedVakken(prev =>
      prev.includes(vak) ? prev.filter(v => v !== vak) : [...prev, vak]
    );
  }, []);

  const handleAddCustomVak = () => {
    if (customVak && !selectedVakken.includes(customVak)) {
      setSelectedVakken(prev => [...prev, customVak]);
      setCustomVak('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (customVak) {
        handleAddCustomVak();
      }
    }
  };

  useEffect(() => {
    onChange(selectedVakken);
    setIsQuestionAnswered(selectedVakken.length > 0);
  }, [selectedVakken, onChange, setIsQuestionAnswered]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">{String(t({ EN: 'Choose one or more subjects', NL: 'Kies een of meerdere vakken' }))}</h2>
      <div className="relative w-full max-w-md mb-4">
        <input
          type="text"
          placeholder={String(t({ EN: 'Search a subject', NL: 'Zoek een vak' }))}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-white text-blue-900 rounded-md pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900" size={20} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredVakken.map((vak) => (
          <button
            key={vak}
            onClick={() => handleToggleVak(vak)}
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              selectedVakken.includes(vak) ? 'bg-yellow-400 text-blue-900' : 'bg-white text-blue-900 hover:bg-yellow-300'
            }`}
          >
            {vak}
          </button>
        ))}
      </div>
      <div className="flex w-full max-w-md">
        <input
          type="text"
          placeholder={String(t({ EN: 'Other, namely...', NL: 'Anders, namelijk...' }))}
          value={customVak}
          onChange={(e) => setCustomVak(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow px-4 py-2 bg-white text-blue-900 rounded-l-md"
        />
        <button
          onClick={handleAddCustomVak}
          className="px-4 py-2 bg-yellow-400 text-blue-900 rounded-r-md hover:bg-yellow-300 transition-colors duration-300"
        >
          {String(t({ EN: 'Add', NL: 'Toevoegen' }))}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {selectedVakken.map((vak) => (
          <div key={vak} className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full flex items-center">
            {vak}
            <button onClick={() => handleToggleVak(vak)} className="ml-2 focus:outline-none">
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VakkenSelector;