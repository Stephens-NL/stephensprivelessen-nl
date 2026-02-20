'use client';

import React, { useReducer } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';
import { getEmailError, getPhoneNumberError, formatPhoneNumber } from '../../../../lib/validation';
import { AgeStep } from './PersonalDetailsSteps/AgeStep';
import { RequestTypeStep } from './PersonalDetailsSteps/RequestTypeStep';
import { MinorForm } from './PersonalDetailsSteps/MinorForm';
import { RequesterForm } from './PersonalDetailsSteps/RequesterForm';
import { StudentForm } from './PersonalDetailsSteps/StudentForm';

interface PersonalDetailsProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
}

type DetailsState = {
  age: number;
  showRequestType: boolean;
  emailError: string | null;
  parentEmailError: string | null;
  phoneError: string | null;
};

function detailsReducer(state: DetailsState, action: { type: string; payload?: unknown }): DetailsState {
  switch (action.type) {
    case 'AGE': return { ...state, age: (action.payload as number) ?? 0 };
    case 'SHOW_REQUEST': return { ...state, showRequestType: (action.payload as boolean) ?? !state.showRequestType };
    case 'EMAIL_ERROR': return { ...state, emailError: (action.payload as string | null) ?? null };
    case 'PARENT_EMAIL_ERROR': return { ...state, parentEmailError: (action.payload as string | null) ?? null };
    case 'PHONE_ERROR': return { ...state, phoneError: (action.payload as string | null) ?? null };
    default: return state;
  }
}

function isFieldComplete(value: unknown): boolean {
  if (typeof value === 'string') return value.trim() !== '';
  if (typeof value === 'number') return value > 0;
  return false;
}

const PersonalDetails = ({ formData, onUpdate }: PersonalDetailsProps) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(detailsReducer, {
    age: formData.age,
    showRequestType: false,
    emailError: null,
    parentEmailError: null,
    phoneError: null,
  });
  const { age, showRequestType, emailError, parentEmailError, phoneError } = state;
  const isMinor = age < 18;

  const handleAgeSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isFieldComplete(age)) {
      if (isMinor) {
        onUpdate({ age, requestType: 'other' });
      } else {
        dispatch({ type: 'SHOW_REQUEST', payload: true });
        onUpdate({ age });
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>, isParent = false) => {
    const email = e.target.value;
    const error = getEmailError(email, t);
    if (isParent) {
      dispatch({ type: 'PARENT_EMAIL_ERROR', payload: error });
      onUpdate({ parentEmail: email });
    } else {
      dispatch({ type: 'EMAIL_ERROR', payload: error });
      onUpdate({ email });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    const error = getPhoneNumberError(phone, t);
    const formattedPhone = formatPhoneNumber(phone);
    dispatch({ type: 'PHONE_ERROR', payload: error });
    onUpdate({ parentPhone: formattedPhone });
  };

  const showStudentForm =
    formData.requestType === 'self' ||
    (formData.requestType === 'other' && isFieldComplete(formData.relationship)) ||
    (isMinor && isFieldComplete(formData.relationship));

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!showRequestType && !formData.requestType && (
          <AgeStep
            age={age}
            onAgeChange={(v) => dispatch({ type: 'AGE', payload: v })}
            onSubmit={handleAgeSubmit}
            isComplete={isFieldComplete(age)}
          />
        )}

        {isFieldComplete(age) && (
          <>
            {isMinor ? (
              <MinorForm
                formData={formData}
                onUpdate={onUpdate}
                parentEmailError={parentEmailError}
                phoneError={phoneError}
                onEmailChange={(e) => handleEmailChange(e, true)}
                onPhoneChange={handlePhoneChange}
                isFieldComplete={isFieldComplete}
              />
            ) : (
              showRequestType && (
                <RequestTypeStep requestType={formData.requestType ?? ''} onSelect={(v) => onUpdate({ requestType: v })} />
              )
            )}
          </>
        )}

        {formData.requestType === 'other' && !isMinor && (
          <RequesterForm
            formData={formData}
            onUpdate={onUpdate}
            emailError={emailError}
            onEmailChange={(e) => handleEmailChange(e, false)}
            isFieldComplete={isFieldComplete}
          />
        )}

        {showStudentForm && (
          <StudentForm
            formData={formData}
            onUpdate={onUpdate}
            emailError={emailError}
            onEmailChange={(e) => handleEmailChange(e, false)}
            isFieldComplete={isFieldComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalDetails;
