import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FeedbackForm } from '../../data';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import FeedbackSystem from '../../components/FeedbackSystem';

// Mock useTranslation hook
jest.mock('../../hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

// Mock useLanguage hook
jest.mock('../../contexts/LanguageContext', () => ({
    useLanguage: () => ({
        language: 'en',
        setLanguage: jest.fn(),
    }),
    LanguageProvider: ({ children }) => <div>{children}</div>,
}));

// Mock data
const mockShortVersion: FeedbackForm = {
    title: 'Short Feedback Form',
    sections: [
        {
            title: 'General Information',
            questions: [
                { id: 'learnerName', question: 'What is your name?', type: 'text' },
                { id: 'subject', question: 'What subject did you learn?', type: 'text' },
            ],
        },
        {
            title: 'Ratings',
            questions: [
                { id: 'overallQuality', question: 'Rate the overall quality of the course', type: 'rating' },
            ],
        },
    ],
};

const mockLongVersion: FeedbackForm = {
    title: 'Long Feedback Form',
    sections: [
        {
            title: 'General Information',
            questions: [
                { id: 'learnerName', question: 'What is your name?', type: 'text' },
                { id: 'subject', question: 'What subject did you learn?', type: 'text' },
            ],
        },
        {
            title: 'Detailed Feedback',
            questions: [
                { id: 'expectationsMet', question: 'Were your expectations met?', type: 'text' },
                { id: 'clarity', question: 'How clear was the instruction?', type: 'rating' },
            ],
        },
    ],
};

describe('FeedbackSystem Component', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('renders the language selector on initial load', () => {
        render(
            <LanguageProvider>
                <FeedbackSystem longVersion={mockLongVersion} shortVersion={mockShortVersion} />
            </LanguageProvider>
        );

        expect(screen.getByText('welcomeScreenData.lengthSelection.title')).toBeInTheDocument();
    });

    it('allows selecting a language and shows form type selector', async () => {
        render(
            <LanguageProvider>
                <FeedbackSystem longVersion={mockLongVersion} shortVersion={mockShortVersion} />
            </LanguageProvider>
        );

        fireEvent.click(screen.getByText('Language Selector'));

        await waitFor(() => {
            expect(screen.getByText('Form Type Selector')).toBeInTheDocument();
        });
    });

    it('allows selecting a form type and shows the first section', async () => {
        render(
            <LanguageProvider>
                <FeedbackSystem longVersion={mockLongVersion} shortVersion={mockShortVersion} />
            </LanguageProvider>
        );

        fireEvent.click(screen.getByText('Language Selector'));
        fireEvent.click(screen.getByText('shortVersion'));

        await waitFor(() => {
            expect(screen.getByText('General Information')).toBeInTheDocument();
        });
    });

    it('allows answering questions and moving to the next question', async () => {
        render(
            <LanguageProvider>
                <FeedbackSystem longVersion={mockLongVersion} shortVersion={mockShortVersion} />
            </LanguageProvider>
        );

        fireEvent.click(screen.getByText('Language Selector'));
        fireEvent.click(screen.getByText('shortVersion'));

        await waitFor(() => {
            const nameInput = screen.getByLabelText('What is your name?');
            fireEvent.change(nameInput, { target: { value: 'John Doe' } });
            fireEvent.click(screen.getByText('Next'));
            expect(screen.getByLabelText('What subject did you learn?')).toBeInTheDocument();
        });
    });

    it('displays an alert if trying to proceed without answering a question', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <LanguageProvider>
                <FeedbackSystem longVersion={mockLongVersion} shortVersion={mockShortVersion} />
            </LanguageProvider>
        );

        fireEvent.click(screen.getByText('Language Selector'));
        fireEvent.click(screen.getByText('shortVersion'));

        await waitFor(() => {
            fireEvent.click(screen.getByText('Next'));
            expect(window.alert).toHaveBeenCalledWith('Please answer the current question before proceeding.');
        });
    });

    it('saves feedback data to localStorage upon submission', async () => {
        jest.spyOn(Storage.prototype, 'setItem');

        render(
            <LanguageProvider>
                <FeedbackSystem longVersion={mockLongVersion} shortVersion={mockShortVersion} />
            </LanguageProvider>
        );

        fireEvent.click(screen.getByText('Language Selector'));
        fireEvent.click(screen.getByText('shortVersion'));

        await waitFor(() => {
            const nameInput = screen.getByLabelText('What is your name?');
            fireEvent.change(nameInput, { target: { value: 'John Doe' } });
            fireEvent.click(screen.getByText('Next'));

            const subjectInput = screen.getByLabelText('What subject did you learn?');
            fireEvent.change(subjectInput, { target: { value: 'Math' } });
            fireEvent.click(screen.getByText('Next'));

            fireEvent.click(screen.getByText('Submit'));
        });

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalled();
        });
    });

    it('handles swipe actions to navigate between steps', async () => {
        render(
            <LanguageProvider>
                <FeedbackSystem longVersion={mockLongVersion} shortVersion={mockShortVersion} />
            </LanguageProvider>
        );

        fireEvent.click(screen.getByText('Language Selector'));
        fireEvent.click(screen.getByText('shortVersion'));

        await waitFor(() => {
            const nameInput = screen.getByLabelText('What is your name?');
            fireEvent.change(nameInput, { target: { value: 'John Doe' } });

            fireEvent.swipe(screen.getByText('General Information'), { delta: { x: -150 } });
            expect(screen.getByLabelText('What subject did you learn?')).toBeInTheDocument();

            fireEvent.swipe(screen.getByText('Ratings'), { delta: { x: 150 } });
            expect(screen.getByLabelText('What is your name?')).toBeInTheDocument();
        });
    });

    it('resets the form after submission and returns to the language selector', async () => {
        render(
            <LanguageProvider>
                <FeedbackSystem longVersion={mockLongVersion} shortVersion={mockShortVersion} />
            </LanguageProvider>
        );

        fireEvent.click(screen.getByText('Language Selector'));
        fireEvent.click(screen.getByText('shortVersion'));

        await waitFor(() => {
            const nameInput = screen.getByLabelText('What is your name?');
            fireEvent.change(nameInput, { target: { value: 'John Doe' } });
            fireEvent.click(screen.getByText('Next'));

            const subjectInput = screen.getByLabelText('What subject did you learn?');
            fireEvent.change(subjectInput, { target: { value: 'Math' } });
            fireEvent.click(screen.getByText('Next'));

            fireEvent.click(screen.getByText('Submit'));
        });

        await waitFor(() => {
            expect(screen.getByText('welcomeScreenData.lengthSelection.title')).toBeInTheDocument();
        });
    });

    it('allows navigating back to previous steps', async () => {
        render(
            <LanguageProvider>
                <FeedbackSystem longVersion={mockLongVersion} shortVersion={mockShortVersion} />
            </LanguageProvider>
        );

        fireEvent.click(screen.getByText('Language Selector'));
        fireEvent.click(screen.getByText('shortVersion'));

        await waitFor(() => {
            const nameInput = screen.getByLabelText('What is your name?');
            fireEvent.change(nameInput, { target: { value: 'John Doe' } });
            fireEvent.click(screen.getByText('Next'));
            expect(screen.getByLabelText('What subject did you learn?')).toBeInTheDocument();

            fireEvent.click(screen.getByText('Previous'));
            expect(screen.getByLabelText('What is your name?')).toBeInTheDocument();
        });
    });

    it('prevents submission if all questions are not answered', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <LanguageProvider>
                <FeedbackSystem longVersion={mockLongVersion} shortVersion={mockShortVersion} />
            </LanguageProvider>
        );

        fireEvent.click(screen.getByText('Language Selector'));
        fireEvent.click(screen.getByText('shortVersion'));

        await waitFor(() => {
            const nameInput = screen.getByLabelText('What is your name?');
            fireEvent.change(nameInput, { target: { value: 'John Doe' } });
            fireEvent.click(screen.getByText('Next'));

            fireEvent.click(screen.getByText('Submit'));

            expect(window.alert).toHaveBeenCalledWith('Please answer the current question before proceeding.');
        });
    });
});
