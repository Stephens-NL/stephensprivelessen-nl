import { GraduationCap } from 'lucide-react';
import React from 'react'

const CustomCheckbox: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
    return (
        <div
            role="checkbox"
            aria-checked={checked}
            tabIndex={0}
            className={`w-8 h-8 flex items-center justify-center border-2 rounded-md cursor-pointer transition-colors duration-300 ${checked ? 'bg-[var(--amber)] border-[var(--amber)]' : 'bg-[var(--cream)] border-[var(--border-warm)]'}`}
            onClick={onChange}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onChange();
                }
            }}
        >
            {checked && <GraduationCap size={24} />}
        </div>
    );
};

export default CustomCheckbox