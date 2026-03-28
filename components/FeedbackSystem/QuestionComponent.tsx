import React, { useCallback, useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { MultipleChoiceQuestion, QuestionComponentProps } from "../../data";

import { QuestionInput } from "./QuestionInput";
import CommentCloud from "./CommentCloud";

const QuestionComponent: React.FC<QuestionComponentProps> = ({
    question,
    onChange,
    value,
    setIsQuestionAnswered,
    onNext,
}) => {
    const language = useLanguage();
    const t = useTranslations('feedback');
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
        onChange(String(question.id), newValue);
    };

    const handleOptionChange = (id: string, optionValue: string | number) => {
        if (question.type === 'multipleChoice') {
            const mcQuestion = question as MultipleChoiceQuestion;
            const selectedOption = mcQuestion.options?.find(opt => opt.value === optionValue);
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
        onChange(String(question.id), vakken);
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
                            {question.comment
                                ? question.comment[language]
                                : t('form.youCanAlsoTypeToVote')}
                        </p>
                    </CommentCloud>
                </div>
            )}
            <label className="text-lg font-medium text-white mb-2 flex items-center">
                {question.label[language]}
                {question.required ? (
                    <span className="text-[var(--amber)] ml-2 text-sm font-bold animate-pulse" title="This field is required">
                        *
                    </span>
                ) : (
                    <span className="text-[var(--muted-text)] ml-2 text-sm italic">
                        ({t('form.optional')})
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
            />
            {question.required && (
                <p className="text-[var(--amber)] text-xs mt-1 italic">
                    {t('form.thisFieldIsRequired')}
                </p>
            )}
            {(question.type === 'text' || question.type === 'textarea') && (
                <p className="text-[var(--muted-text)] text-xs mt-1">
                    {t('form.pressEnterToGoToTheNextQuestion')}
                </p>
            )}
        </div>
    );
};

export default QuestionComponent;