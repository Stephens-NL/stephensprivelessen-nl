import { GraduationCap } from 'lucide-react';
import React from 'react'

const CustomRadio: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
    return (
        <div
            className={`w-8 h-8 flex items-center justify-center border-2 rounded-full cursor-pointer transition-colors duration-300 ${checked ? 'bg-yellow-400 border-yellow-400' : 'bg-white border-gray-400'}`}
            onClick={onChange}
        >
            {checked && <GraduationCap size={24} color={checked ? "#1e3a8a" : "#ffffff"} />}
        </div>
    );
};

export default CustomRadio
