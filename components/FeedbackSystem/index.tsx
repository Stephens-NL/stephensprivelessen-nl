import React, { useCallback, useReducer } from 'react';
import useSWR from 'swr';
import { m, AnimatePresence, PanInfo } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { FeedbackForm, FeedbackFormDataImportProps, Language, PersonalIntermezzo, QuestionGroup } from '../../data';
import { useLanguage } from '@/contexts/LanguageContext';

import FadeInText from './FadeInText';
import LanguageSelector from './LanguageSelector';
import FormTypeSelector from './FormTypeSelector';
import QuestionComponent from './QuestionComponent';
import SubmitCTA from './SubmitCTA';
import PersonalIntermezzoComponent from './PersonalIntermezzo';
import FarewellScreen from './FarewellScreen';
import NavigationButtons from './NavigationButtons';
import FeedbackSummary from './FeedbackSummary';

type FormState = {
  currentStep: number;
  currentQuestionIndex: number;
  formData: Record<string, any>;
  selectedForm: FeedbackForm | null;
  isSubmitted: boolean;
  isQuestionAnswered: boolean;
  showSummary: boolean;
  direction: number;
  contentHeight: string;
  isLastStep: boolean;
  showFarewell: boolean;
};

type FormAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_QUESTION_INDEX'; index: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'SET_FORM_DATA'; id: string; value: any }
  | { type: 'SET_SELECTED_FORM'; form: FeedbackForm | null }
  | { type: 'SET_QUESTION_ANSWERED'; value: boolean }
  | { type: 'SET_SHOW_SUMMARY'; value: boolean }
  | { type: 'SET_DIRECTION'; value: number }
  | { type: 'SET_LAST_STEP'; value: boolean }
  | { type: 'SET_SHOW_FAREWELL'; value: boolean }
  | { type: 'RESET' };

const initialFormState: FormState = {
  currentStep: -2,
  currentQuestionIndex: 0,
  formData: {},
  selectedForm: null,
  isSubmitted: false,
  isQuestionAnswered: false,
  showSummary: false,
  direction: 0,
  contentHeight: 'auto',
  isLastStep: false,
  showFarewell: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_STEP': return { ...state, currentStep: action.step };
    case 'SET_QUESTION_INDEX': return { ...state, currentQuestionIndex: action.index };
    case 'NEXT_QUESTION': return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
    case 'PREV_QUESTION': return { ...state, currentQuestionIndex: state.currentQuestionIndex - 1 };
    case 'SET_FORM_DATA': return { ...state, formData: { ...state.formData, [action.id]: action.value } };
    case 'SET_SELECTED_FORM': return { ...state, selectedForm: action.form };
    case 'SET_QUESTION_ANSWERED': return { ...state, isQuestionAnswered: action.value };
    case 'SET_SHOW_SUMMARY': return { ...state, showSummary: action.value };
    case 'SET_DIRECTION': return { ...state, direction: action.value };
    case 'SET_LAST_STEP': return { ...state, isLastStep: action.value };
    case 'SET_SHOW_FAREWELL': return { ...state, showFarewell: action.value };
    case 'RESET': return initialFormState;
    default: return state;
  }
}

type FeedbackContentProps = {
  currentStep: number;
  currentQuestionIndex: number;
  selectedForm: FeedbackForm | null;
  formData: Record<string, any>;
  feedbackFormData: FeedbackFormDataImportProps | undefined;
  handleLanguageSelect: (lang: Language) => void;
  handleFormTypeSelect: (formType: 'short' | 'long') => void;
  shouldShowQuestion: (question: any) => boolean;
  handleChange: (id: string, value: any, skipToNext?: boolean) => void;
  setIsQuestionAnswered: (value: boolean) => void;
  nextStep: () => void;
  t: (key: any) => any;
};

const FeedbackContent: React.FC<FeedbackContentProps> = ({
  currentStep,
  currentQuestionIndex,
  selectedForm,
  formData,
  feedbackFormData,
  handleLanguageSelect,
  handleFormTypeSelect,
  shouldShowQuestion,
  handleChange,
  setIsQuestionAnswered,
  nextStep,
  t,
}) => {
  if (currentStep === -2 && feedbackFormData) {
    return <LanguageSelector onSelectLanguage={handleLanguageSelect} data={feedbackFormData.feedbackFormData.languageSelection} />;
  }
  if (currentStep === -1) return <FormTypeSelector onSelectFormType={handleFormTypeSelect} />;

  if (selectedForm) {
    const currentSection = selectedForm.sections[currentStep];

    if ('questions' in currentSection) {
      const questionGroup = currentSection as QuestionGroup;
      const currentQuestion = questionGroup.questions[currentQuestionIndex];
      return (
        <>
          <h2>{String(t(questionGroup.title))}</h2>
          {currentQuestion && shouldShowQuestion(currentQuestion) && (
            <QuestionComponent
              key={currentQuestion.id}
              question={currentQuestion}
              onChange={handleChange}
              value={formData[currentQuestion.id] || ''}
              onNext={nextStep}
              formData={formData}
              setIsQuestionAnswered={setIsQuestionAnswered}
            />
          )}
        </>
      );
    } else if ('content' in currentSection) {
      const personalIntermezzo = currentSection as PersonalIntermezzo;
      return <PersonalIntermezzoComponent intermezzo={personalIntermezzo} />;
    }
  }
  return null;
};

const feedbackFetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  });

export const FeedbackSystem: React.FC<{ longVersion: FeedbackForm, shortVersion: FeedbackForm }> = ({ longVersion, shortVersion }) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const { currentStep, currentQuestionIndex, formData, selectedForm, isQuestionAnswered, showSummary, direction, isLastStep, showFarewell, contentHeight } = state;
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { data: feedbackFormData, isLoading: loading, error: swrError } = useSWR<FeedbackFormDataImportProps>('/api/feedback', feedbackFetcher);
  const error = swrError ?? null;

  const nextStep = useCallback(() => {
    if (!selectedForm) return;

    const currentSection = selectedForm.sections[currentStep];

    if ('questions' in currentSection) {
      if (currentQuestionIndex < currentSection.questions.length - 1) {
        dispatch({ type: 'NEXT_QUESTION' });
      } else {
        if (currentStep < selectedForm.sections.length - 1) {
          dispatch({ type: 'SET_STEP', step: currentStep + 1 });
          dispatch({ type: 'SET_QUESTION_INDEX', index: 0 });
        } else {
          dispatch({ type: 'SET_LAST_STEP', value: true });
        }
      }
    } else {
      if (currentStep < selectedForm.sections.length - 1) {
        dispatch({ type: 'SET_STEP', step: currentStep + 1 });
        dispatch({ type: 'SET_QUESTION_INDEX', index: 0 });
      } else {
        dispatch({ type: 'SET_LAST_STEP', value: true });
      }
    }

    dispatch({ type: 'SET_DIRECTION', value: 1 });
  }, [selectedForm, currentStep, currentQuestionIndex]);

  const handleChange = useCallback((id: string, value: any, skipToNext: boolean = false) => {
    dispatch({ type: 'SET_FORM_DATA', id, value });
    dispatch({ type: 'SET_QUESTION_ANSWERED', value: value !== '' && value !== undefined });

    if (skipToNext) {
      nextStep();
    }
  }, [nextStep]);

  const handleSubmit = async () => {
    const feedbackData = {
      language,
      formType: selectedForm === longVersion ? 'long' : 'short',
      ...formData,
    };
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });
      dispatch({ type: 'SET_SHOW_FAREWELL', value: true });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const resetForm = () => {
    dispatch({ type: 'RESET' });
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    dispatch({ type: 'SET_STEP', step: -1 });
    dispatch({ type: 'SET_DIRECTION', value: 1 });
  };

  const previousStep = () => {
    if (!selectedForm) return;

    if (currentQuestionIndex > 0) {
      dispatch({ type: 'PREV_QUESTION' });
    } else if (currentStep > 0) {
      const previousSection = selectedForm.sections[currentStep - 1];
      dispatch({ type: 'SET_STEP', step: currentStep - 1 });
      if ('questions' in previousSection) {
        dispatch({ type: 'SET_QUESTION_INDEX', index: previousSection.questions.length - 1 });
      } else {
        dispatch({ type: 'SET_QUESTION_INDEX', index: 0 });
      }
    }

    dispatch({ type: 'SET_DIRECTION', value: -1 });
  };

  const handleFormTypeSelect = (formType: 'short' | 'long') => {
    dispatch({ type: 'SET_SELECTED_FORM', form: formType === 'long' ? longVersion : shortVersion });
    dispatch({ type: 'SET_STEP', step: 0 });
    dispatch({ type: 'SET_DIRECTION', value: 1 });
  };

  const handleSwipe = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      previousStep();
    } else if (info.offset.x < -100) {
      nextStep();
    }
  };

  const shouldShowQuestion = (question: any) => {
    if (!question.conditional) return true;
    const { dependsOn, showIf } = question.conditional;
    const dependentValue = formData[dependsOn];
    const conditions = (showIf as string).split('||').map((s: string) => s.trim());
    return conditions.some((condition: string) => {
      const match = condition.match(/value\s*===\s*["']([^"']+)["']/);
      return match ? dependentValue === match[1] : false;
    });
  };

  if (feedbackFormData === null) return null;

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!feedbackFormData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 flex flex-col justify-center items-center p-8">
      <AnimatePresence custom={direction} mode="wait">
        {showFarewell ? (
          <FarewellScreen
            key="farewell"
            onClose={resetForm}
          />
        ) : (
          <m.div
            key={`${currentStep}-${currentQuestionIndex}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              height: { duration: 0.5, ease: "easeInOut" }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleSwipe}
            className="w-full max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 overflow-hidden"
            style={{ height: contentHeight }}
          >
            <h1 className="text-3xl font-bold text-white mb-6">
              {currentStep !== -2 && <FadeInText text={String(t(selectedForm ? selectedForm.title : feedbackFormData.feedbackFormData.lengthSelection.title))} />}
            </h1>
            <FeedbackContent
              currentStep={currentStep}
              currentQuestionIndex={currentQuestionIndex}
              selectedForm={selectedForm}
              formData={formData}
              feedbackFormData={feedbackFormData}
              handleLanguageSelect={handleLanguageSelect}
              handleFormTypeSelect={handleFormTypeSelect}
              shouldShowQuestion={shouldShowQuestion}
              handleChange={handleChange}
              setIsQuestionAnswered={(value) => dispatch({ type: 'SET_QUESTION_ANSWERED', value })}
              nextStep={nextStep}
              t={t}
            />
            {isLastStep && (
              showSummary ? (
                <FeedbackSummary
                  formData={formData}
                  onSubmit={handleSubmit}
                  onEdit={() => dispatch({ type: 'SET_SHOW_SUMMARY', value: false })}
                />
              ) : (
                <SubmitCTA onSubmit={() => dispatch({ type: 'SET_SHOW_SUMMARY', value: true })} />
              )
            )}
          </m.div>
        )}
      </AnimatePresence>
      {currentStep >= 0 && selectedForm && !isLastStep && !showFarewell && (
        <NavigationButtons
          onPrevious={previousStep}
          onNext={nextStep}
          isNextDisabled={'questions' in selectedForm.sections[currentStep] && !isQuestionAnswered}
        />
      )}
    </div>
  );
};