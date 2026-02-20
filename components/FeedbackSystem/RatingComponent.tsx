import React, { useEffect } from "react";
import { GraduationCap } from "lucide-react";

const RatingComponent: React.FC<{
  value: number;
  onChange: (value: number) => void;
  max: number
}> = ({ value, onChange, max }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = parseInt(e.key);
      if (!isNaN(key) && key >= 1 && key <= max) {
        onChange(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onChange, max]);

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="flex space-x-2 mb-4"
        role="group"
        aria-label={`Rating: ${value} out of ${max}`}
      >
        {Array.from({ length: max }, (_, i) => i + 1).map((ratingValue) => (
          <button
            key={`rating-${ratingValue}`}
            onClick={() => onChange(ratingValue)}
            className={`
              focus:outline-none 
              transition-colors 
              duration-200 
              hover:scale-110
              ${ratingValue <= value ? 'text-yellow-400' : 'text-gray-400'}
            `}
            aria-label={`Rate ${ratingValue} out of ${max}`}
          >
            {ratingValue}
            <GraduationCap size={32} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingComponent;