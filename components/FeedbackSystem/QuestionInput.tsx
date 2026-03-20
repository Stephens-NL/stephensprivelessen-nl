import React from 'react';
import { useLocale } from 'next-intl';
import VakkenSelector from './VakkenSelector';
import CustomRadio from './CustomRadio';
import RatingComponent from './RatingComponent';
import { MultipleChoiceQuestion, Question } from '../../data';

interface QuestionInputProps {
  question: Question;
  value: unknown;
  onChange: (id: string, value: unknown, skipToNext?: boolean) => void;
  setIsQuestionAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  onNext: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleOptionChange: (id: string, optionValue: string | number) => void;
  handleVakkenChange: (vakken: string[]) => void;
}

export function QuestionInput({
  question,
  value,
  onChange,
  setIsQuestionAnswered,
  onNext,
  inputRef,
  textAreaRef,
  handleInputChange,
  handleKeyDown,
  handleOptionChange,
  handleVakkenChange,
}: QuestionInputProps) {
  const locale = useLocale();
  const language = locale === 'nl' ? 'NL' : 'EN';

  switch (question.type) {
    case 'vakkenSelector':
      return (
        <VakkenSelector
          onChange={handleVakkenChange}
          initialValue={Array.isArray(value) ? value : undefined}
          setIsQuestionAnswered={setIsQuestionAnswered}
        />
      );
    case 'text':
      return (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={(value as string) || ''}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="mt-2 p-2 w-full border rounded"
        />
      );
    case 'textarea':
      return (
        <textarea
          ref={textAreaRef as React.RefObject<HTMLTextAreaElement>}
          value={(value as string) || ''}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="mt-2 p-2 w-full border rounded"
          rows={4}
        />
      );
    case 'number':
    case 'rating':
      return (
        <RatingComponent
          value={(value as number) || 0}
          onChange={(rating) => {
            handleOptionChange(String(question.id), rating);
            onNext();
          }}
          max={question.max || 5}
        />
      );
    case 'multipleChoice': {
      const mcQuestion = question as MultipleChoiceQuestion;
      return (
        <div role="radiogroup" className="mb-4" onKeyDown={handleKeyDown}>
          {mcQuestion.options?.map((option) => (
            <CustomRadio
              key={option.value}
              checked={value === option.value}
              onChange={() => {
                handleOptionChange(String(question.id), option.value);
                onNext();
              }}
              label={option.label[language]}
            />
          ))}
        </div>
      );
    }
    default:
      return null;
  }
}
