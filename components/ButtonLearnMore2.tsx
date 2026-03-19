'use client';

import { generalContent, Service, services, TranslationFunction } from '../data'
import { CardBody, CardContainer, CardItem } from './ui/3d-card';
import React from 'react'
// import { Dispatch, SetStateAction } from 'react'

interface ChildComponentProps {
    onButtonClick: (service: Service) => void;
}

const ButtonLearnMore = ({ t, onButtonClick, index }: { t: TranslationFunction, onButtonClick: React.Dispatch<React.SetStateAction<Service | null>>, index: number }) => {
    const { learnMore } = generalContent;
    // const { setSelectedService, services, index } = props;

    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-[var(--cream-dark)] relative group/card border-[var(--border-warm)] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                    translateZ="200"
                    className="text-xl font-bold text-[var(--warm-text)]"
                >
                    {/* <h3>{services[index].title.EN}</h3>
                    <p>{services[index].shortDescription.EN}</p> */}

                    <button
                        onClick={() => onButtonClick(services[index])}
                        className="inline-block bg-[var(--ink)] text-[var(--cream)] font-bold py-2 px-4 rounded-full hover:bg-[var(--ink-light)] transition-colors duration-300"
                    >
                        {String(t(learnMore))} &rarr;
                    </button>
                </CardItem>
            </CardBody>
        </CardContainer>
    )
}

export default ButtonLearnMore