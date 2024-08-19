import { GraduationCap } from 'lucide-react';
import React from 'react';
import { CustomRadioProps } from '../../data';



const CustomRadio: React.FC<CustomRadioProps> = ({ checked, onChange, label }) => {
    return (
        <div
            className="flex items-center cursor-pointer"
            onClick={onChange}
        >
            <div
                className={`w-8 h-8 flex items-center justify-center border-2 rounded-full transition-colors duration-300 ${
                    checked ? 'bg-yellow-400 border-yellow-400' : 'bg-white border-gray-400'
                }`}
            >
                <GraduationCap size={24} color={checked ? "#1e3a8a" : "#ffffff"} />
            </div>
            <label className="text-white ml-2 cursor-pointer">{label}</label>
        </div>
    );
};

export default CustomRadio;