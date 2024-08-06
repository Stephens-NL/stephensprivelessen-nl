'use client';

import { generalContent, Service, services, TranslationFunction } from '../data'
import { CardBody, CardContainer, CardItem } from './ui/3d-card';
import React from 'react'
// import { Dispatch, SetStateAction } from 'react'

interface ChildComponentProps {
    onButtonClick: (service: Service) => void;
  }

const ButtonLearnMore = ({t, onButtonClick, index}: {t: TranslationFunction, onButtonClick: React.Dispatch<React.SetStateAction<Service | null>>, index: number}) => {
const {learnMore} = generalContent;
// const { setSelectedService, services, index } = props;

  return (
    <button
                  onClick={() => onButtonClick(services[index])}
                  className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
                >
                  {t(learnMore)} &rarr;
                </button>
  )
}

export default ButtonLearnMore