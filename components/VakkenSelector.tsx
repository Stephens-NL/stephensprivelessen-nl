import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

interface VakkenSelectorProps {
    onChange: (vakken: string[]) => void;
    initialValue?: string[];
  }
  
  const VakkenSelector: React.FC<VakkenSelectorProps> = ({ onChange, initialValue = [] }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedVakken, setSelectedVakken] = useState<string[]>(initialValue);
    const [customVak, setCustomVak] = useState<string>('');
    const vakken: string[] = [
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
      <div className="relative flex flex-col items-center justify-center space-y-6 z-10">
        <AnimatedBackground />
        <motion.h2 
          className="text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('Kies een of meerdere vakken')}
        </motion.h2>
        <motion.div 
          className="relative w-full max-w-md mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder={t('Zoek een vak')}
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-white text-blue-900 rounded-md pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900" size={20} />
        </motion.div>
        <motion.div 
          className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredVakken.map((vak, index) => (
            <motion.button
              key={vak}
              onClick={() => handleToggleVak(vak)}
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${selectedVakken.includes(vak) ? 'bg-yellow-400 text-blue-900' : 'bg-white text-blue-900 hover:bg-yellow-300'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {vak}
            </motion.button>
          ))}
        </motion.div>
        <motion.div 
          className="flex w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <input
            type="text"
            placeholder={t('Anders, namelijk...')}
            value={customVak}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomVak(e.target.value)}
            className="flex-grow px-4 py-2 bg-white text-blue-900 rounded-l-md"
          />
          <button
            onClick={handleAddCustomVak}
            className="px-4 py-2 bg-yellow-400 text-blue-900 rounded-r-md hover:bg-yellow-300 transition-colors duration-300"
          >
            {t('Toevoegen')}
          </button>
        </motion.div>
        <motion.div 
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {selectedVakken.map((vak) => (
            <motion.div 
              key={vak} 
              className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              {vak}
              <button onClick={() => handleToggleVak(vak)} className="ml-2 focus:outline-none">
                ✕
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  };
  
  export default VakkenSelector;