import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
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

export const FeedbackSystem: React.FC<{ longVersion: FeedbackForm, shortVersion: FeedbackForm }> = ({ longVersion, shortVersion }) => {
  const [currentStep, setCurrentStep] = useState(-2);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [selectedForm, setSelectedForm] = useState<FeedbackForm | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [feedbackFormData, setFeedbackFormData] = useState<FeedbackFormDataImportProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [direction, setDirection] = useState(0);
  const [contentHeight, setContentHeight] = useState('auto');
  const [isLastStep, setIsLastStep] = useState(false);
  const [showFarewell, setShowFarewell] = useState(false);


  useEffect(() => {
    const fetchFeedbackFormData = async () => {
      try {
        const response = await fetch('/api/feedback');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data: FeedbackFormDataImportProps = await response.json();
        setFeedbackFormData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFeedbackFormData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!feedbackFormData) return null;

  const { feedbackFormData: data } = feedbackFormData;
  const { languageSelection, lengthSelection } = data;

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
      setIsSubmitted(true);
      setShowFarewell(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setShowFarewell(false);
    setCurrentStep(-2);
    setSelectedForm(null);
    setFormData({});
    setShowSummary(false);
    setIsLastStep(false);
    setCurrentQuestionIndex(0);
  };


  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setCurrentStep(-1);
    setDirection(1);
  };

  const nextStep = () => {
    if (!selectedForm) return;

    const currentSection = selectedForm.sections[currentStep];

    if ('questions' in currentSection) {
      // If we're in a question group
      if (currentQuestionIndex < currentSection.questions.length - 1) {
        // Move to the next question in the current section
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Move to the next section
        if (currentStep < selectedForm.sections.length - 1) {
          setCurrentStep(currentStep + 1);
          setCurrentQuestionIndex(0);
        } else {
          setIsLastStep(true);
        }
      }
    } else {
      // If we're in an intermezzo or any other type of section
      if (currentStep < selectedForm.sections.length - 1) {
        setCurrentStep(currentStep + 1);
        setCurrentQuestionIndex(0);
      } else {
        setIsLastStep(true);
      }
    }

    setDirection(1);
  };

  const previousStep = () => {
    if (!selectedForm) return;

    if (currentQuestionIndex > 0) {
      // If we're not at the first question of a section, go to the previous question
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentStep > 0) {
      // If we're at the first question of a section, go to the previous section
      const previousSection = selectedForm.sections[currentStep - 1];
      setCurrentStep(currentStep - 1);
      if ('questions' in previousSection) {
        setCurrentQuestionIndex(previousSection.questions.length - 1);
      } else {
        setCurrentQuestionIndex(0);
      }
    }

    setDirection(-1);
  };


  const handleFormTypeSelect = (formType: 'short' | 'long') => {
    setSelectedForm(formType === 'long' ? longVersion : shortVersion);
    setCurrentStep(0);
    setDirection(1);
  };

  const handleSwipe = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      previousStep();
    } else if (info.offset.x < -100) {
      nextStep();
    }
  };

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setIsQuestionAnswered(value !== '' && value !== undefined);
  };

  // const handleSubmit = async () => {
  //   const feedbackData = {
  //     language,
  //     formType: selectedForm === longVersion ? 'long' : 'short',
  //     ...formData,
  //   };
  //   try {
  //     await fetch('/api/feedback', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(feedbackData),
  //     });
  //     setIsSubmitted(true);
  //   } catch (error) {
  //     console.error('Error submitting feedback:', error);
  //   }
  // };

  const shouldShowQuestion = (question: any) => {
    if (!question.conditional) return true;
    const { dependsOn, showIf } = question.conditional;
    const dependentValue = formData[dependsOn];
    try {
      return new Function('value', `return ${showIf}`)(dependentValue);
    } catch (error) {
      console.error('Error in conditional logic:', error);
      return false;
    }
  };

  const renderContent = () => {
    if (currentStep === -2) return <LanguageSelector onSelectLanguage={handleLanguageSelect} data={languageSelection} />;
    if (currentStep === -1) return <FormTypeSelector onSelectFormType={handleFormTypeSelect} />;

    if (selectedForm) {
      // console.log(selectedForm);
      const currentSection = selectedForm.sections[currentStep];

      // For question groups, handle normal question flow
      if ('questions' in currentSection) {
        const questionGroup = currentSection as QuestionGroup;
        const currentQuestion = questionGroup.questions[currentQuestionIndex];
        // console.log(currentQuestion);
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
      }
      // For intermezzos, allow direct next step
      else if ('content' in currentSection) {
        const personalIntermezzo = currentSection as PersonalIntermezzo;
        return <PersonalIntermezzoComponent intermezzo={personalIntermezzo} />;
      }
    }
    return null;
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 flex flex-col justify-center items-center p-8">
      <AnimatePresence custom={direction} mode="wait">
        {showFarewell ? (
          <FarewellScreen
            key="farewell"
            onClose={resetForm}
          />
        ) : (
          <motion.div
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
              {currentStep !== -2 && <FadeInText text={String(t(selectedForm ? selectedForm.title : lengthSelection.title))} />}
            </h1>
            {renderContent()}
            {isLastStep && (
              showSummary ? (
                <FeedbackSummary
                  formData={formData}
                  onSubmit={handleSubmit}
                  onEdit={() => setShowSummary(false)}
                />
              ) : (
                <SubmitCTA onSubmit={() => setShowSummary(true)} />
              )
            )}
          </motion.div>
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

export default FeedbackSystem;