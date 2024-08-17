import { GraduationCap } from "lucide-react";

const RatingComponent: React.FC<{ value: number; onChange: (value: number) => void; max: number }> = ({ value, onChange, max }) => {
    return (
      <div className="flex space-x-2">
        {[...Array(max)].map((_, index) => (
          <button
            key={index}
            onClick={() => onChange(index + 1)}
            className={`focus:outline-none transition-colors duration-200 ${index < value ? 'text-yellow-400' : 'text-gray-400'
              }`}
          >
            <GraduationCap size={32} />
          </button>
        ))}
      </div>
    );
  };

  export default RatingComponent;