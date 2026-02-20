import React from 'react';
import VakkenSelector from './VakkenSelector';
import CustomRadio from './CustomRadio';
import RatingComponent from './RatingComponent';
import { Question } from '../../data';

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
  t: (key: { EN: string; NL: string } | string) => string;
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
  t,
}: QuestionInputProps) {
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
          ref={inputRef}
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
          ref={textAreaRef}
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
            handleOptionChange(question.id, rating);
            onNext();
          }}
          max={question.max || 5}
        />
      );
    case 'multipleChoice':
      return (
        <div role="radiogroup" className="mb-4" onKeyDown={handleKeyDown}>
          {question.options?.map((option) => (
            <CustomRadio
              key={option.value}
              checked={value === option.value}
              onChange={() => {
                handleOptionChange(question.id, option.value);
                onNext();
              }}
              label={String(t(option.label))}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}
