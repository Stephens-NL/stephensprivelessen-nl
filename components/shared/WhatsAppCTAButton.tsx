'use client';

import { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from '@/hooks/useTranslation';
import { Textarea } from "@/components/ui/textarea";
import { contactInfo } from '@/data/config';

interface WhatsAppCTAButtonProps {
  phoneNumber?: string;
  prefilledMessage?: string;
  buttonText?: string;
  buttonClassName?: string;
  modalTitle?: string;
  modalDescription?: string;
  children?: React.ReactNode;
  onSubmit?: (formData: { 
    name: string; 
    age: string; 
    requestType: 'trial' | 'info';
    message?: string;
    preferredTimes?: string[];
  }) => void;
  customFormFields?: React.ReactNode;
}

export default function WhatsAppCTAButton({
  phoneNumber = contactInfo.phone.whatsapp.replace('https://wa.me/', ''),
  prefilledMessage = '',
  buttonText,
  buttonClassName = "bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2",
  modalTitle,
  modalDescription,
  children,
  onSubmit,
  customFormFields
}: WhatsAppCTAButtonProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    requestType: 'info' as 'trial' | 'info',
    message: '',
    preferredTimes: [] as string[]
  });

  const handleTimeSelect = (time: string) => {
    setFormData(prev => {
      const times = prev.preferredTimes.includes(time)
        ? prev.preferredTimes.filter(t => t !== time)
        : [...prev.preferredTimes, time].slice(0, 3);
      return { ...prev, preferredTimes: times };
    });
  };

  const isFormValid = formData.name.trim() !== '' && 
    formData.age.trim() !== '' && 
    (formData.requestType === 'info' || 
      (formData.requestType === 'trial' && formData.preferredTimes.length === 3));

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Default behavior
      const message = `${prefilledMessage}
- Name: ${formData.name}
- Age: ${formData.age}
- Request Type: ${formData.requestType === 'trial' ? 'Trial Lesson' : 'Information'}${
  formData.requestType === 'trial' 
    ? `\n- Preferred Times:\n  1. ${formData.preferredTimes[0]}\n  2. ${formData.preferredTimes[1]}\n  3. ${formData.preferredTimes[2]}`
    : ''
}${formData.message ? `\n\nAdditional Message:\n${formData.message}` : ''}`;
      
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
    setIsModalOpen(false);
    setFormData({ 
      name: '', 
      age: '', 
      requestType: 'info',
      message: '',
      preferredTimes: []
    });
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={buttonClassName}
      >
        {children || (
          <>
            <FaWhatsapp className="text-xl" />
            <span>{buttonText || String(t({
              EN: 'Contact via WhatsApp',
              NL: 'Contact via WhatsApp'
            }))}</span>
          </>
        )}
      </button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-blue-900 border border-blue-300/50 text-blue-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-400">
              {modalTitle || String(t({
                EN: 'Student Information',
                NL: 'Student Informatie'
              }))}
            </DialogTitle>
            <DialogDescription className="text-blue-200">
              {modalDescription || String(t({
                EN: 'Please provide some information before we connect via WhatsApp',
                NL: 'Vul alstublieft wat informatie in voordat we verbinden via WhatsApp'
              }))}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {customFormFields || (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-blue-300">
                    {String(t({
                      EN: 'Student Name',
                      NL: 'Naam Student'
                    }))}
                  </Label>
                  <Input
                    id="name"
                    placeholder={String(t({
                      EN: 'Enter student name...',
                      NL: 'Vul naam student in...'
                    }))}
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-blue-800 border-blue-300/50 text-blue-100 placeholder:text-blue-200/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-blue-300">
                    {String(t({
                      EN: 'Student Age',
                      NL: 'Leeftijd Student'
                    }))}
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder={String(t({
                      EN: 'Enter student age...',
                      NL: 'Vul leeftijd student in...'
                    }))}
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="bg-blue-800 border-blue-300/50 text-blue-100 placeholder:text-blue-200/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-blue-300">
                    {String(t({
                      EN: 'What would you like to do?',
                      NL: 'Wat wil je doen?'
                    }))}
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, requestType: 'info' }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.requestType === 'info'
                          ? 'border-blue-400 bg-blue-400/10'
                          : 'border-blue-300/20 hover:border-blue-300/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl">💡</span>
                        <span className="text-center">
                          {String(t({
                            EN: 'More Information',
                            NL: 'Meer Informatie'
                          }))}
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, requestType: 'trial' }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.requestType === 'trial'
                          ? 'border-blue-400 bg-blue-400/10'
                          : 'border-blue-300/20 hover:border-blue-300/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl">📚</span>
                        <span className="text-center">
                          {String(t({
                            EN: 'Trial Lesson',
                            NL: 'Proefles'
                          }))}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {formData.requestType === 'trial' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-blue-300">
                        {String(t({
                          EN: 'Choose three preferred times',
                          NL: 'Kies drie voorkeurstijden'
                        }))}
                      </Label>
                      <span className="text-sm text-blue-200">
                        {formData.preferredTimes.length}/3
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        "12:00", "12:30", "13:00", "13:30", 
                        "14:00", "14:30", "15:00", "15:30",
                        "16:00", "16:30", "17:00", "17:30"
                      ].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleTimeSelect(time)}
                          disabled={formData.preferredTimes.length >= 3 && !formData.preferredTimes.includes(time)}
                          className={`p-2 rounded-lg border transition-all ${
                            formData.preferredTimes.includes(time)
                              ? 'border-blue-400 bg-blue-400/20'
                              : formData.preferredTimes.length >= 3
                                ? 'border-blue-300/20 opacity-50 cursor-not-allowed'
                                : 'border-blue-300/20 hover:border-blue-300/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-blue-300">
                    {String(t({
                      EN: 'Additional Message (Optional)',
                      NL: 'Extra Bericht (Optioneel)'
                    }))}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={String(t({
                      EN: 'Any specific questions or requirements...',
                      NL: 'Specifieke vragen of wensen...'
                    }))}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="bg-blue-800 border-blue-300/50 text-blue-100 placeholder:text-blue-200/50 min-h-[100px]"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="border-blue-300/50 text-blue-200 hover:bg-blue-800 hover:text-blue-100"
            >
              {String(t({
                EN: 'Cancel',
                NL: 'Annuleren'
              }))}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="bg-green-500 hover:bg-green-400 text-white flex items-center gap-2"
            >
              <FaWhatsapp />
              {String(t({
                EN: 'Continue to WhatsApp',
                NL: 'Ga door naar WhatsApp'
              }))}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 