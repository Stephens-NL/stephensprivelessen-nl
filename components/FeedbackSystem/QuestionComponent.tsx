import React, { useEffect, useRef } from "react";
import { Question } from "../../data";
import { useTranslation } from "../../hooks/useTranslation";
import VakkenSelector from './VakkenSelector';
import CustomRadio from "./CustomRadio";
import RatingComponent from "./RatingComponent";
import { GraduationCap } from 'lucide-react';

interface QuestionComponentProps {
    question: Question;
    onChange: (id: string, value: any) => void;
    value: any;
    onNext: () => void;
    formData: Record<string, any>;
    setIsQuestionAnswered: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
    question,
    onChange,
    value,
    onNext,
    formData,
    setIsQuestionAnswered
}) => {
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const isAnswered = value !== '' && value !== undefined;
        setIsQuestionAnswered(isAnswered);

        if (question.type === 'text' || question.type === 'number') {
            inputRef.current?.focus();
        } else if (question.type === 'textarea') {
            textAreaRef.current?.focus();
        }
    }, [value, setIsQuestionAnswered, question.type]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.type === 'number' ? (e.target as HTMLInputElement).valueAsNumber : e.target.value;
        onChange(question.id, newValue);
    };

    const handleOptionChange = (id: string, optionValue: any) => {
        onChange(id, optionValue);
        if (question.type === 'multipleChoice') {
            setTimeout(onNext, 300);
        }
    };

    const shouldShowQuestion = () => {
        if (question.conditional) {
            const { dependsOn, showIf } = question.conditional;
            const dependentValue = formData[dependsOn];
            return eval(showIf.replace('value', JSON.stringify(dependentValue)));
        }
        return true;
    };

    if (!shouldShowQuestion()) {
        return null;
    }

    const renderInput = () => {
        switch (question.type) {
            case 'vakkenSelector':
                return (
                    <VakkenSelector
                        onChange={(vakken) => onChange(question.id, vakken)}
                        initialValue={value}
                    />
                );
            case 'text':
                return (
                    <input
                        ref={inputRef}
                        type="text"
                        value={value || ''}
                        onChange={handleInputChange}
                        className="mt-2 p-2 w-full border rounded"
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        ref={textAreaRef}
                        value={value || ''}
                        onChange={handleInputChange}
                        className="mt-2 p-2 w-full border rounded"
                        rows={4}
                    />
                );
            case 'number':
                return (
                    <input
                        ref={inputRef}
                        type="number"
                        value={value || ''}
                        onChange={handleInputChange}
                        className="mt-2 p-2 w-full border rounded"
                    />
                );
            case 'multipleChoice':
                return (
                    <div className="mb-4">
                        <label className="block text-xl font-medium text-white mb-2">{t(question.label)}</label>
                        {question.options?.map((option) => (
                            <div key={option.value} className="flex items-center mb-2">
                                <CustomRadio
                                    checked={value === option.value}
                                    onChange={() => handleOptionChange(question.id, option.value)}
                                />
                                <label className="text-white ml-2">{t(option.label)}</label>
                            </div>
                        ))}
                    </div>
                );
            case 'rating':
                return (
                    <RatingComponent
                        value={value || 0}
                        onChange={(rating) => onChange(question.id, rating)}
                        max={question.max || 5}  // Assuming a default max of 5 if not specified
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <label className="block text-lg font-medium text-white">{t(question.text)}</label>
            {renderInput()}
        </div>
    );
};

export default QuestionComponent;