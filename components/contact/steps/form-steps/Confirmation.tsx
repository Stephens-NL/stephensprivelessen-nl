'use client';

import React from 'react';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';

interface ConfirmationProps {
    formData: FormData;
}

const Confirmation = ({ formData }: ConfirmationProps) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 text-white">
            <h2 className="text-2xl font-semibold text-center mb-6">
                {String(t({
                    EN: "Please review your information",
                    NL: "Controleer je gegevens"
                }))}
            </h2>
            
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-yellow-300">
                        {String(t({
                            EN: "Personal Details",
                            NL: "Persoonlijke Gegevens"
                        }))}
                    </h3>
                    <p>
                        <strong>{String(t({ EN: "Name", NL: "Naam" }))}: </strong>
                        {formData.name}
                    </p>
                    <p>
                        <strong>{String(t({ EN: "Email", NL: "E-mail" }))}: </strong>
                        {formData.email}
                    </p>
                    <p>
                        <strong>{String(t({ EN: "Age", NL: "Leeftijd" }))}: </strong>
                        {formData.age}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-yellow-300">
                        {String(t({
                            EN: "Lesson Details",
                            NL: "Les Details"
                        }))}
                    </h3>
                    <p>
                        <strong>{String(t({ EN: "Subject", NL: "Vak" }))}: </strong>
                        {formData.subject}
                    </p>
                    <p>
                        <strong>{String(t({ EN: "Level", NL: "Niveau" }))}: </strong>
                        {formData.level}
                    </p>
                    <p>
                        <strong>{String(t({ EN: "Location", NL: "Locatie" }))}: </strong>
                        {formData.isOnline 
                            ? String(t({ EN: "Online", NL: "Online" }))
                            : String(t({ EN: "In-Person", NL: "Fysiek" }))
                        }
                    </p>
                </div>

                {formData.age < 18 && (
                    <div>
                        <h3 className="font-semibold text-yellow-300">
                            {String(t({
                                EN: "Parent/Guardian Details",
                                NL: "Ouder/Verzorger Details"
                            }))}
                        </h3>
                        <p>
                            <strong>{String(t({ EN: "Name", NL: "Naam" }))}: </strong>
                            {formData.parentName}
                        </p>
                        <p>
                            <strong>{String(t({ EN: "Email", NL: "E-mail" }))}: </strong>
                            {formData.parentEmail}
                        </p>
                        {formData.parentPhone && (
                            <p>
                                <strong>{String(t({ EN: "Phone", NL: "Telefoon" }))}: </strong>
                                {formData.parentPhone}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Confirmation;