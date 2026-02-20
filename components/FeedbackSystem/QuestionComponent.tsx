import React, { useCallback, useEffect, useRef } from "react";
import { QuestionComponentProps } from "../../data";
import { useTranslation } from "../../hooks/useTranslation";
import { QuestionInput } from "./QuestionInput";
import CommentCloud from "./CommentCloud";

const QuestionComponent: React.FC<QuestionComponentProps> = ({
    question,
    onChange,
    value,
    setIsQuestionAnswered,
    onNext,
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
    }, [value, question.type, setIsQuestionAnswered]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.type === 'number' ? (e.target as HTMLInputElement).valueAsNumber : e.target.value;
        onChange(question.id, newValue);
    };

    const handleOptionChange = (id: string, optionValue: string | number) => {
        if (question.type === 'multipleChoice') {
            const selectedOption = question.options?.find(opt => opt.value === optionValue);
            const skipToNext = selectedOption?.value === 'no';
            onChange(id, optionValue, skipToNext);
            if (skipToNext) {
                onNext();
            }
        } else {
            onChange(id, optionValue);
        }
    };

    const handleVakkenChange = useCallback((vakken: string[]) => {
        onChange(question.id, vakken);
    }, [onChange, question.id]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (question.required && !value) {
                // Als het veld verplicht is en er geen waarde is, doe niets
                return;
            }
            onNext();
        }
    };

    return (
        <div className="mb-6 relative">
            {(question.comment || (question.type === 'rating' || question.type === 'number')) && (
                <div className="absolute -top-4 right-0 z-10">
                    <CommentCloud>
                        <p className="text-sm">
                            {String(question.comment
                                ? t(question.comment)
                                : t({ EN: 'You can also type to vote!', NL: 'Je kan ook typen om te stemmen!' }))}
                        </p>
                    </CommentCloud>
                </div>
            )}
            <label className="text-lg font-medium text-white mb-2 flex items-center">
                {String(t(question.label))}
                {question.required ? (
                    <span className="text-yellow-400 ml-2 text-sm font-bold animate-pulse" title="This field is required">
                        *
                    </span>
                ) : (
                    <span className="text-gray-300 ml-2 text-sm italic">
                        ({String(t({ EN: 'Optional', NL: 'Optioneel' }))})
                    </span>
                )}
            </label>
            <QuestionInput
                question={question}
                value={value}
                onChange={onChange}
                setIsQuestionAnswered={setIsQuestionAnswered}
                onNext={onNext}
                inputRef={inputRef}
                textAreaRef={textAreaRef}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
                handleOptionChange={handleOptionChange}
                handleVakkenChange={handleVakkenChange}
                t={t}
            />
            {question.required && (
                <p className="text-yellow-400 text-xs mt-1 italic">
                    {String(t({ EN: 'This field is required', NL: 'Dit veld is verplicht' }))}
                </p>
            )}
            {(question.type === 'text' || question.type === 'textarea') && (
                <p className="text-gray-300 text-xs mt-1">
                    {String(t({ EN: 'Press Enter to go to the next question', NL: 'Druk op Enter om naar de volgende vraag te gaan' }))}
                </p>
            )}
        </div>
    );
};

export default QuestionComponent;