import { Search } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import React, { useEffect, useState } from 'react'

const VakkenSelector: React.FC<{ onChange: (vakken: string[]) => void; initialValue?: string[] }> = ({ onChange, initialValue = [] }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVakken, setSelectedVakken] = useState<string[]>(initialValue);
    const [customVak, setCustomVak] = useState('');
    const vakken = [
        "Rekenen", "Taal", "Wiskunde A/B/C/D", "Natuurkunde", "Scheikunde", "Engels",
        "Bedrijfsstatistiek", "Calculus", "Economie", "Statistiek", "Kansberekening",
        "Lineaire Algebra", "Verzamelingenleer", "C", "C#", "C++", "CSS", "HTML",
        "Java", "JavaScript", "MATLAB", "Python", "R", "React", "SPSS", "SQL"
    ].sort((a, b) => a.localeCompare(b));

    const filteredVakken = vakken.filter(vak =>
        vak.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleVak = (vak: string) => {
        setSelectedVakken(prev =>
            prev.includes(vak) ? prev.filter(v => v !== vak) : [...prev, vak]
        );
    };

    const handleAddCustomVak = () => {
        if (customVak && !selectedVakken.includes(customVak)) {
            setSelectedVakken(prev => [...prev, customVak]);
            setCustomVak('');
        }
    };

    useEffect(() => {
        onChange(selectedVakken);
    }, [selectedVakken, onChange]);

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">{t('Kies een of meerdere vakken')}</h2>
            <div className="relative w-full max-w-md mb-4">
                <input
                    type="text"
                    placeholder={t('Zoek een vak')}
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
                        className={`px-4 py-2 rounded-md transition-colors duration-300 ${selectedVakken.includes(vak) ? 'bg-yellow-400 text-blue-900' : 'bg-white text-blue-900 hover:bg-yellow-300'}`}
                    >
                        {vak}
                    </button>
                ))}
            </div>
            <div className="flex w-full max-w-md">
                <input
                    type="text"
                    placeholder={t('Anders, namelijk...')}
                    value={customVak}
                    onChange={(e) => setCustomVak(e.target.value)}
                    className="flex-grow px-4 py-2 bg-white text-blue-900 rounded-l-md"
                />
                <button
                    onClick={handleAddCustomVak}
                    className="px-4 py-2 bg-yellow-400 text-blue-900 rounded-r-md hover:bg-yellow-300 transition-colors duration-300"
                >
                    {t('Toevoegen')}
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

export default VakkenSelector