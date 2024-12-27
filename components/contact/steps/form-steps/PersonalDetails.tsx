'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';
import { getEmailError, getPhoneNumberError, formatPhoneNumber } from '../../../../lib/validation';

interface PersonalDetailsProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const PersonalDetails = ({ formData, onUpdate }: PersonalDetailsProps) => {
    const { t } = useTranslation();
    const [age, setAge] = useState<number>(formData.age);
    const [showRequestType, setShowRequestType] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [parentEmailError, setParentEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const isMinor = age < 18;

    const handleAgeSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (isFieldComplete(age)) {
            if (isMinor) {
                onUpdate({ 
                    age,
                    requestType: 'other'
                });
            } else {
                setShowRequestType(true);
                onUpdate({ age });
            }
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>, isParent: boolean = false) => {
        const email = e.target.value;
        const error = getEmailError(email, t);
        
        if (isParent) {
            setParentEmailError(error);
            onUpdate({ parentEmail: email });
        } else {
            setEmailError(error);
            onUpdate({ email });
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phone = e.target.value;
        const error = getPhoneNumberError(phone, t);
        const formattedPhone = formatPhoneNumber(phone);
        
        setPhoneError(error);
        onUpdate({ parentPhone: formattedPhone });
    };

    // Helper functie om te controleren of een veld is ingevuld
    const isFieldComplete = (value: any) => {
        if (typeof value === 'string') return value.trim() !== '';
        if (typeof value === 'number') return value > 0;
        return false;
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    // Update the email input fields to show validation errors
    const renderEmailInput = (value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error: string | null, label: string) => (
        <div>
            <label className="block text-yellow-300 mb-2">
                {label} *
            </label>
            <input
                type="email"
                value={value}
                onChange={onChange}
                className={`w-full p-3 rounded-lg bg-blue-700 text-white border ${
                    error ? 'border-red-500' : 'border-blue-600'
                } focus:border-yellow-400 focus:outline-none`}
                required
            />
            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-red-500 text-sm"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );

    const renderPhoneInput = () => (
        <div>
            <label className="block text-yellow-300 mb-2">
                {String(t({ EN: "Phone Number", NL: "Telefoonnummer" }))} *
            </label>
            <input
                type="tel"
                value={formData.parentPhone || ''}
                onChange={handlePhoneChange}
                placeholder="+31612345678"
                className={`w-full p-3 rounded-lg bg-blue-700 text-white border ${
                    phoneError ? 'border-red-500' : 'border-blue-600'
                } focus:border-yellow-400 focus:outline-none`}
                required
            />
            {phoneError && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-red-500 text-sm"
                >
                    {phoneError}
                </motion.p>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {/* Stap 1: Leeftijd */}
                {!showRequestType && !formData.requestType && (
                    <motion.form
                        key="age"
                        {...fadeInUp}
                        className="space-y-4"
                        onSubmit={handleAgeSubmit}
                    >
                        <label className="block text-yellow-300 mb-2">
                            {String(t({ EN: "What's your age?", NL: "Wat is je leeftijd?" }))} *
                        </label>
                        <input
                            type="number"
                            value={age || ''}
                            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                            className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
                            min="0"
                            required
                        />
                        <motion.button
                            type="submit"
                            disabled={!isFieldComplete(age)}
                            className={`w-full p-3 rounded-lg transition-colors ${
                                isFieldComplete(age)
                                    ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
                                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {String(t({
                                EN: "Next",
                                NL: "Volgende"
                            }))}
                        </motion.button>
                    </motion.form>
                )}

                {/* Stap 2: Toon verschillende content gebaseerd op leeftijd */}
                {isFieldComplete(age) && (
                    <>
                        {isMinor ? (
                            // Toon bericht voor minderjarigen
                            <motion.div
                                key="minorMessage"
                                {...fadeInUp}
                                className="space-y-4"
                            >
                                <div className="p-4 bg-yellow-400/10 rounded-lg text-yellow-300">
                                    {String(t({
                                        EN: "Since you are under 18, this form needs to be filled out by a parent or guardian.",
                                        NL: "Omdat je jonger bent dan 18, moet dit formulier door een ouder of voogd worden ingevuld."
                                    }))}
                                </div>
                                
                                <h3 className="text-lg font-semibold text-yellow-300">
                                    {String(t({
                                        EN: "Parent/Guardian Information",
                                        NL: "Ouder/Voogd Gegevens"
                                    }))}
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-yellow-300 mb-2">
                                            {String(t({ EN: "Parent/Guardian Name", NL: "Naam Ouder/Voogd" }))} *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.requesterName || ''}
                                            onChange={(e) => onUpdate({ requesterName: e.target.value })}
                                            className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    {isFieldComplete(formData.requesterName) && (
                                        <motion.div {...fadeInUp}>
                                            {renderEmailInput(
                                                formData.parentEmail || '',
                                                (e) => handleEmailChange(e, true),
                                                parentEmailError,
                                                String(t({ EN: "Parent/Guardian Email", NL: "E-mail Ouder/Voogd" }))
                                            )}
                                        </motion.div>
                                    )}
                                    {isFieldComplete(formData.parentEmail) && !parentEmailError && (
                                        <motion.div {...fadeInUp}>
                                            {renderPhoneInput()}
                                        </motion.div>
                                    )}
                                    {isFieldComplete(formData.relationship) && (
                                        <motion.div {...fadeInUp}>
                                            <label className="block text-yellow-300 mb-2">
                                                {String(t({ EN: "Relationship to Student", NL: "Relatie tot Leerling" }))} *
                                            </label>
                                            <select
                                                value={formData.relationship || ''}
                                                onChange={(e) => onUpdate({ relationship: e.target.value })}
                                                className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
                                                required
                                            >
                                                <option value="">
                                                    {String(t({ EN: "Select relationship", NL: "Kies relatie" }))}
                                                </option>
                                                <option value="parent">
                                                    {String(t({ EN: "Parent", NL: "Ouder" }))}
                                                </option>
                                                <option value="guardian">
                                                    {String(t({ EN: "Guardian", NL: "Voogd" }))}
                                                </option>
                                            </select>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            // Toon keuze voor volwassenen
                            showRequestType && (
                                <motion.div
                                    key="requestType"
                                    {...fadeInUp}
                                    className="space-y-4"
                                >
                                    <h2 className="text-lg font-semibold text-white">
                                        {String(t({
                                            EN: "Who is requesting the lesson?",
                                            NL: "Wie vraagt de les aan?"
                                        }))}
                                    </h2>

                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={() => onUpdate({ requestType: 'self' })}
                                            className={`p-4 rounded-lg border-2 transition-colors ${
                                                formData.requestType === 'self'
                                                    ? 'bg-yellow-400 text-blue-900 border-yellow-500'
                                                    : 'bg-blue-700 text-white border-blue-600 hover:border-yellow-400'
                                            }`}
                                        >
                                            {String(t({
                                                EN: "For myself",
                                                NL: "Voor mezelf"
                                            }))}
                                        </button>

                                        <button
                                            onClick={() => onUpdate({ requestType: 'other' })}
                                            className={`p-4 rounded-lg border-2 transition-colors ${
                                                formData.requestType === 'other'
                                                    ? 'bg-yellow-400 text-blue-900 border-yellow-500'
                                                    : 'bg-blue-700 text-white border-blue-600 hover:border-yellow-400'
                                            }`}
                                        >
                                            {String(t({
                                                EN: "For someone else",
                                                NL: "Voor iemand anders"
                                            }))}
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        )}
                    </>
                )}

                {/* Stap 3: Aanvrager informatie (alleen tonen als het NIET een minderjarige is) */}
                {formData.requestType === 'other' && !isMinor && (
                    <motion.div
                        key="requesterInfo"
                        {...fadeInUp}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold text-yellow-300">
                            {String(t({
                                EN: "Your Information",
                                NL: "Jouw Gegevens"
                            }))}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-yellow-300 mb-2">
                                    {String(t({ EN: "Your Name", NL: "Jouw Naam" }))} *
                                </label>
                                <input
                                    type="text"
                                    value={formData.requesterName || ''}
                                    onChange={(e) => onUpdate({ requesterName: e.target.value })}
                                    className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
                                    required
                                />
                            </div>
                            {isFieldComplete(formData.requesterName) && (
                                <motion.div {...fadeInUp}>
                                    {renderEmailInput(
                                        formData.requesterEmail || '',
                                        (e) => handleEmailChange(e, false),
                                        emailError,
                                        String(t({ EN: "Your Email", NL: "Jouw E-mail" }))
                                    )}
                                </motion.div>
                            )}
                            {isFieldComplete(formData.requesterEmail) && (
                                <motion.div {...fadeInUp}>
                                    <label className="block text-yellow-300 mb-2">
                                        {String(t({ EN: "Relationship", NL: "Relatie" }))} *
                                    </label>
                                    <select
                                        value={formData.relationship || ''}
                                        onChange={(e) => onUpdate({ relationship: e.target.value })}
                                        className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
                                        required
                                    >
                                        <option value="">
                                            {String(t({ EN: "Select relationship", NL: "Kies relatie" }))}
                                        </option>
                                        <option value="parent">
                                            {String(t({ EN: "Parent", NL: "Ouder" }))}
                                        </option>
                                        <option value="guardian">
                                            {String(t({ EN: "Guardian", NL: "Verzorger" }))}
                                        </option>
                                        <option value="family">
                                            {String(t({ EN: "Family member", NL: "Familielid" }))}
                                        </option>
                                        <option value="other">
                                            {String(t({ EN: "Other", NL: "Anders" }))}
                                        </option>
                                    </select>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Stap 4: Student informatie (aanpassen wanneer deze getoond wordt) */}
                {((formData.requestType === 'self') || 
                   (formData.requestType === 'other' && isFieldComplete(formData.relationship)) ||
                   (isMinor && isFieldComplete(formData.relationship))) && (
                    <motion.div
                        key="studentInfo"
                        {...fadeInUp}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold text-yellow-300">
                            {String(t({
                                EN: "Student Information",
                                NL: "Gegevens Leerling"
                            }))}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-yellow-300 mb-2">
                                    {String(t({ EN: "Name", NL: "Naam" }))} *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => onUpdate({ name: e.target.value })}
                                    className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
                                    required
                                />
                            </div>
                            {isFieldComplete(formData.name) && (
                                <motion.div {...fadeInUp}>
                                    {renderEmailInput(
                                        formData.email,
                                        (e) => handleEmailChange(e, false),
                                        emailError,
                                        String(t({ EN: "Email", NL: "E-mail" }))
                                    )}
                                </motion.div>
                            )}
                            {isFieldComplete(formData.email) && (
                                <motion.div {...fadeInUp}>
                                    <label className="block text-yellow-300 mb-2">
                                        {String(t({ EN: "Level", NL: "Niveau" }))} *
                                    </label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => onUpdate({ level: e.target.value })}
                                        className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
                                        required
                                    >
                                        <option value="">
                                            {String(t({ EN: "Select level", NL: "Kies niveau" }))}
                                        </option>
                                        <option value="university">
                                            {String(t({ EN: "University", NL: "Universiteit" }))}
                                        </option>
                                        <option value="hbo">HBO</option>
                                        <option value="vwo">VWO</option>
                                        <option value="havo">HAVO</option>
                                        <option value="vmbo">VMBO</option>
                                    </select>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PersonalDetails; 