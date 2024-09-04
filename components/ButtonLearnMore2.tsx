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
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                    translateZ="200"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {/* <h3>{services[index].title.EN}</h3>
                    <p>{services[index].shortDescription.EN}</p> */}

                    <button
                        onClick={() => onButtonClick(services[index])}
                        className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
                    >
                        {String(t(learnMore))} &rarr;
                    </button>
                </CardItem>
            </CardBody>
        </CardContainer>
    )
}

export default ButtonLearnMore