import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeedbackSystem } from '../../components/FeedbackSystem';
import { LanguageProvider, LanguageContext } from '../../contexts/LanguageContext';
import { longVersion, shortVersion } from '../../data';
import { Question, QuestionGroup, Language, Bilingual } from '../../data';
import LanguageSelector from '../../components/FeedbackSystem';
import FormTypeSelector from '../../components/FeedbackSystem';
import QuestionComponent from '../../components/FeedbackSystem';
import VakkenSelector from '../../components/VakkenSelector';
import FarewellScreen from '../../components/FeedbackSystem';
import { useTranslation } from '../../hooks/useTranslation';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const getBilingualText = (text: Bilingual): string => {
  return typeof text === 'string' ? text : text.EN;
};

describe('FeedbackSystem', () => {
  const renderComponent = () => {
    return render(
      <LanguageProvider>
        <FeedbackSystem longVersion={longVersion} shortVersion={shortVersion} />
      </LanguageProvider>
    );
  };

  describe('Initial Rendering', () => {
    test('renders language selector initially', () => {
      renderComponent();
      expect(screen.getByText(/Select Your Language/i)).toBeInTheDocument();
      expect(screen.getByText(/Kies Je Taal/i)).toBeInTheDocument();
    });
  });

  describe('Language Selection', () => {
    test('allows language selection and moves to form type selection', async () => {
      renderComponent();
      fireEvent.click(screen.getByText('English'));
      await waitFor(() => {
        expect(screen.getByText(/Choose Feedback Form Length/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Type Selection', () => {
    test('allows form type selection and starts the feedback process', async () => {
      renderComponent();
      fireEvent.click(screen.getByText('English'));
      await waitFor(() => {
        fireEvent.click(screen.getByText(/Short \(1-2 min\)/i));
      });
      await waitFor(() => {
        const firstSectionTitle = shortVersion.sections[0].title;
        expect(screen.getByText(getBilingualText(firstSectionTitle))).toBeInTheDocument();
      });
    });
  });

  describe('Question Navigation', () => {
    test('navigates through questions correctly', async () => {
      renderComponent();
      fireEvent.click(screen.getByText('English'));
      await waitFor(() => {
        fireEvent.click(screen.getByText(/Short \(1-2 min\)/i));
      });

      const firstSection = shortVersion.sections[0] as QuestionGroup;
      const firstQuestion = firstSection.questions[0];
      const input = screen.getByLabelText(getBilingualText(firstQuestion.label));
      fireEvent.change(input, { target: { value: 'Test answer' } });
      
      fireEvent.click(screen.getByText(/Next/i));

      await waitFor(() => {
        const nextQuestion = firstSection.questions[1];
        expect(screen.getByText(getBilingualText(nextQuestion.label))).toBeInTheDocument();
      });
    });
  });

  describe('Question Types', () => {
    test('handles different question types correctly', async () => {
      renderComponent();
      fireEvent.click(screen.getByText('English'));
      await waitFor(() => {
        fireEvent.click(screen.getByText(/Short \(1-2 min\)/i));
      });

      const firstSection = shortVersion.sections[0] as QuestionGroup;

      // Test text input
      const textQuestion = firstSection.questions.find((q: Question) => q.type === 'text');
      if (textQuestion) {
        const textInput = screen.getByLabelText(getBilingualText(textQuestion.label));
        fireEvent.change(textInput, { target: { value: 'Test text input' } });
        expect(textInput).toHaveValue('Test text input');
      }

      // Test multiple choice
      const mcQuestion = firstSection.questions.find((q: Question) => q.type === 'multipleChoice');
      if (mcQuestion && 'options' in mcQuestion) {
        const mcOption = screen.getByText(getBilingualText(mcQuestion.options[0].label));
        fireEvent.click(mcOption);
        expect(mcOption).toBeInTheDocument();
      }

      // Test rating
      const ratingQuestion = firstSection.questions.find((q: Question) => q.type === 'rating');
      if (ratingQuestion) {
        const ratingButtons = screen.getAllByRole('button', { name: /graduation/i });
        fireEvent.click(ratingButtons[2]); // Select 3 stars
        expect(ratingButtons[2]).toHaveClass('text-yellow-400');
      }
    });
  });

  describe('Form Submission', () => {
    test('submits the form and shows farewell screen', async () => {
      renderComponent();
      fireEvent.click(screen.getByText('English'));
      await waitFor(() => {
        fireEvent.click(screen.getByText(/Short \(1-2 min\)/i));
      });

      // Fill out all required fields
      shortVersion.sections.forEach((section) => {
        if ('questions' in section) {
          section.questions.forEach((question) => {
            if (question.type === 'text' || question.type === 'textarea') {
              const input = screen.getByLabelText(getBilingualText(question.label));
              fireEvent.change(input, { target: { value: 'Test answer' } });
            } else if (question.type === 'multipleChoice' && 'options' in question) {
              fireEvent.click(screen.getByText(getBilingualText(question.options[0].label)));
            } else if (question.type === 'rating') {
              const ratingButtons = screen.getAllByRole('button', { name: /graduation/i });
              fireEvent.click(ratingButtons[0]);
            }
            fireEvent.click(screen.getByText(/Next/i));
          });
        } else {
          fireEvent.click(screen.getByText(/Next/i));
        }
      });

      fireEvent.click(screen.getByText(/Submit/i));

      await waitFor(() => {
        expect(screen.getByText(/Thank you for your feedback/i)).toBeInTheDocument();
      });
    });
  });
});

describe('Bilingual Functionality', () => {
  const TestComponent: React.FC<{ text: Bilingual }> = ({ text }) => {
    const { t } = useTranslation();
    return <div>{t(text)}</div>;
  };

  test('renders correct language for Bilingual text', () => {
    const bilingualText: Bilingual = {
      EN: 'Hello',
      NL: 'Hallo'
    };

    render(
      <LanguageProvider>
        <TestComponent text={bilingualText} />
      </LanguageProvider>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();

    // Change language to Dutch
    act(() => {
      const context = React.useContext(LanguageContext);
      if (context && 'setLanguage' in context) {
        context.setLanguage('NL');
      }
    });

    expect(screen.getByText('Hallo')).toBeInTheDocument();
  });

  test('handles Bilingual arrays correctly', () => {
    const bilingualArray: Bilingual = {
      EN: ['First', 'Second'],
      NL: ['Eerste', 'Tweede']
    };

    render(
      <LanguageProvider>
        <TestComponent text={bilingualArray} />
      </LanguageProvider>
    );

    expect(screen.getByText('First Second')).toBeInTheDocument();

    // Change language to Dutch
    act(() => {
      const context = React.useContext(LanguageContext);
      if (context && 'setLanguage' in context) {
        context.setLanguage('NL');
      }
    });

    expect(screen.getByText('Eerste Tweede')).toBeInTheDocument();
  });
});

// Sub-component tests

describe('LanguageSelector', () => {
  test('renders language options and calls onSelectLanguage', () => {
    const mockOnSelectLanguage = jest.fn();
    render(<LanguageSelector onSelectLanguage={mockOnSelectLanguage} />);

    fireEvent.click(screen.getByText('Nederlands'));
    expect(mockOnSelectLanguage).toHaveBeenCalledWith('NL' as Language);

    fireEvent.click(screen.getByText('English'));
    expect(mockOnSelectLanguage).toHaveBeenCalledWith('EN' as Language);
  });
});

describe('FormTypeSelector', () => {
  test('renders form type options and calls onSelectFormType', () => {
    const mockOnSelectFormType = jest.fn();
    render(<FormTypeSelector onSelectFormType={mockOnSelectFormType} />);

    fireEvent.click(screen.getByText(/Short \(1-2 min\)/i));
    expect(mockOnSelectFormType).toHaveBeenCalledWith('short');

    fireEvent.click(screen.getByText(/Long \(8-10 min\)/i));
    expect(mockOnSelectFormType).toHaveBeenCalledWith('long');
  });
});

describe('QuestionComponent', () => {
  const mockQuestion: Question = {
    id: 'test-question',
    type: 'text',
    label: { EN: 'Test Question', NL: 'Test Vraag' },
    required: true,
  };

  test('renders question and handles input change', () => {
    const mockOnChange = jest.fn();
    render(
      <QuestionComponent
        question={mockQuestion}
        onChange={mockOnChange}
        value=""
        onNext={jest.fn()}
        formData={{}}
        setIsQuestionAnswered={jest.fn()}
      />
    );

    const input = screen.getByLabelText('Test Question');
    fireEvent.change(input, { target: { value: 'Test answer' } });
    expect(mockOnChange).toHaveBeenCalledWith('test-question', 'Test answer');
  });
});

describe('VakkenSelector', () => {
  test('allows selecting and deselecting subjects', () => {
    const mockOnChange = jest.fn();
    render(<VakkenSelector onChange={mockOnChange} />);

    fireEvent.click(screen.getByText('Wiskunde A/B/C/D'));
    expect(mockOnChange).toHaveBeenCalledWith(['Wiskunde A/B/C/D']);

    fireEvent.click(screen.getByText('Natuurkunde'));
    expect(mockOnChange).toHaveBeenCalledWith(['Wiskunde A/B/C/D', 'Natuurkunde']);

    fireEvent.click(screen.getByText('Wiskunde A/B/C/D'));
    expect(mockOnChange).toHaveBeenCalledWith(['Natuurkunde']);
  });

  test('allows adding custom subjects', () => {
    const mockOnChange = jest.fn();
    render(<VakkenSelector onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Anders, namelijk...');
    fireEvent.change(input, { target: { value: 'New Subject' } });
    fireEvent.click(screen.getByText('Toevoegen'));

    expect(mockOnChange).toHaveBeenCalledWith(['New Subject']);
  });
});

describe('FarewellScreen', () => {
  test('renders farewell message and close button', () => {
    const mockOnClose = jest.fn();
    render(<FarewellScreen onClose={mockOnClose} />);

    expect(screen.getByText(/Thank you for your feedback/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Close/i));
    expect(mockOnClose).toHaveBeenCalled();
  });
});