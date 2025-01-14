import { type Location } from './types';

export const locations: Location[] = [
  {
    id: 'amsterdam-zuid',
    name: 'Amsterdam Zuid',
    title: 'Wiskunde & Statistiek Lessen Amsterdam Zuid',
    description: 'Persoonlijke wiskunde en statistiek lessen op ons kantoor in Amsterdam Zuid. Professionele begeleiding voor studenten en professionals. Priveles, bijles en groepslessen beschikbaar. Groepslessen mogelijk op de VU campus.',
    keywords: [
      'priveles amsterdam zuid',
      'bijles amsterdam zuid',
      'wiskunde les zuid',
      'statistiek les zuid',
      'wiskunde tutor zuid',
      'statistiek tutor zuid',
      'amsterdam zuid privelessen',
      'amsterdam zuid bijles',
      'groepsles VU amsterdam',
      'wiskunde groepsles zuid'
    ],
    metaDescription: 'Professionele wiskunde en statistiek lessen in Amsterdam Zuid. Persoonlijke begeleiding op ons kantoor voor optimaal leerresultaat. Groepslessen mogelijk op de VU. ✓ Ervaren docent ✓ Maatwerk aanpak',
    address: 'Gustav Mahlerlaan 2970',
    postalCode: '1081 LA',
    area: 'Zuid',
    groupLessons: {
      available: true,
      locations: ['VU Amsterdam - Hoofdgebouw', 'VU Amsterdam - W&N Gebouw'],
      info: 'Groepslessen worden aangeboden op de VU campus, perfect voor studenten die daar al studeren.'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.2802935398147!2d4.870827776816501!3d52.33764847201295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60a0237f68a75%3A0x9ada4b51b5e33aa4!2sGustav%20Mahlerlaan%202970%2C%201081%20LA%20Amsterdam!5e0!3m2!1sen!2snl!4v1705233391051!5m2!1sen!2snl'
  },
  {
    id: 'amsterdam-centrum',
    name: 'Amsterdam Centrum',
    title: 'Wiskunde & Statistiek Lessen Amsterdam Centrum',
    description: 'Persoonlijke wiskunde en statistiek lessen op ons kantoor in Amsterdam Centrum. Professionele begeleiding voor studenten en professionals. Priveles, bijles en groepslessen beschikbaar. Groepslessen mogelijk op UvA locaties.',
    keywords: [
      'priveles amsterdam centrum',
      'bijles amsterdam centrum',
      'wiskunde les centrum',
      'statistiek les centrum',
      'wiskunde tutor centrum',
      'statistiek tutor centrum',
      'amsterdam centrum privelessen',
      'amsterdam centrum bijles',
      'groepsles UvA amsterdam',
      'wiskunde groepsles centrum'
    ],
    metaDescription: 'Professionele wiskunde en statistiek lessen in Amsterdam Centrum. Persoonlijke begeleiding op ons kantoor voor optimaal leerresultaat. Groepslessen mogelijk op UvA locaties. ✓ Ervaren docent ✓ Maatwerk aanpak',
    address: 'Gustav Mahlerlaan 2970',
    postalCode: '1081 LA',
    area: 'Centrum',
    groupLessons: {
      available: true,
      locations: ['UvA Science Park', 'UvA Roeterseiland Campus'],
      info: 'Groepslessen worden aangeboden op verschillende UvA locaties, ideaal voor studenten die daar colleges volgen.'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.2802935398147!2d4.870827776816501!3d52.33764847201295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60a0237f68a75%3A0x9ada4b51b5e33aa4!2sGustav%20Mahlerlaan%202970%2C%201081%20LA%20Amsterdam!5e0!3m2!1sen!2snl!4v1705233391051!5m2!1sen!2snl'
  },
  {
    id: 'amsterdam-noord',
    name: 'Amsterdam Noord',
    title: 'Wiskunde & Statistiek Lessen Amsterdam Noord',
    description: 'Persoonlijke wiskunde en statistiek lessen voor studenten uit Amsterdam Noord. Voor optimale leerresultaten adviseren wij lessen op onze hoofdlocatie bij Science Park, perfect bereikbaar met het OV. Ook online bijles mogelijk.',
    keywords: [
      'priveles amsterdam noord',
      'bijles amsterdam noord',
      'wiskunde les noord',
      'statistiek les noord',
      'wiskunde tutor noord',
      'statistiek tutor noord',
      'amsterdam noord privelessen',
      'amsterdam noord bijles',
      'science park bijles',
      'online bijles noord'
    ],
    metaDescription: 'Professionele wiskunde en statistiek lessen voor Amsterdam Noord. Lessen op onze Science Park locatie of online. ✓ Ervaren docent ✓ Maatwerk aanpak ✓ Optimale bereikbaarheid',
    address: 'Science Park 904',
    postalCode: '1098 XH',
    area: 'Noord',
    preferredLocation: {
      name: 'UvA Science Park',
      reason: 'Voor studenten uit Noord adviseren wij lessen op onze Science Park locatie. Deze locatie is uitstekend bereikbaar met het OV en biedt een optimale leeromgeving met alle benodigde faciliteiten.',
      transport: 'Directe verbinding met metro 52 (Noord/Zuidlijn) - 15 minuten vanaf Noord'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5243874815184!2d4.954328776816768!3d52.35473247207656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60f859e7d6c45%3A0x1a6f70f4d5c1a69b!2sScience%20Park%20904%2C%201098%20XH%20Amsterdam!5e0!3m2!1sen!2snl!4v1705233391051!5m2!1sen!2snl'
  },
  {
    id: 'amsterdam-west',
    name: 'Amsterdam West',
    title: 'Wiskunde & Statistiek Lessen Amsterdam West',
    description: 'Persoonlijke wiskunde en statistiek lessen voor studenten uit Amsterdam West. Voor de beste leerervaring adviseren wij lessen op onze hoofdlocatie bij Science Park, uitstekend bereikbaar met het OV. Ook online bijles mogelijk.',
    keywords: [
      'priveles amsterdam west',
      'bijles amsterdam west',
      'wiskunde les west',
      'statistiek les west',
      'wiskunde tutor west',
      'statistiek tutor west',
      'amsterdam west privelessen',
      'amsterdam west bijles',
      'science park bijles',
      'online bijles west'
    ],
    metaDescription: 'Professionele wiskunde en statistiek lessen voor Amsterdam West. Lessen op onze Science Park locatie of online. ✓ Ervaren docent ✓ Maatwerk aanpak ✓ Goede bereikbaarheid',
    address: 'Science Park 904',
    postalCode: '1098 XH',
    area: 'West',
    preferredLocation: {
      name: 'UvA Science Park',
      reason: 'Voor studenten uit West adviseren wij lessen op onze Science Park locatie. Deze locatie is goed bereikbaar met het OV en biedt een professionele studieomgeving met alle faciliteiten.',
      transport: 'Goede verbinding met tram 19 en bus 40 - ongeveer 25 minuten reistijd'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5243874815184!2d4.954328776816768!3d52.35473247207656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60f859e7d6c45%3A0x1a6f70f4d5c1a69b!2sScience%20Park%20904%2C%201098%20XH%20Amsterdam!5e0!3m2!1sen!2snl!4v1705233391051!5m2!1sen!2snl'
  },
  {
    id: 'amsterdam-oost',
    name: 'Amsterdam Oost',
    title: 'Wiskunde & Statistiek Lessen Amsterdam Oost',
    description: 'Persoonlijke wiskunde en statistiek lessen in Amsterdam Oost, op loopafstand van Science Park. Professionele begeleiding in een academische omgeving. Priveles en bijles beschikbaar, met de flexibiliteit van zowel fysieke als online lessen.',
    keywords: [
      'priveles amsterdam oost',
      'bijles amsterdam oost',
      'wiskunde les oost',
      'statistiek les oost',
      'wiskunde tutor oost',
      'statistiek tutor oost',
      'amsterdam oost privelessen',
      'amsterdam oost bijles',
      'science park bijles',
      'online bijles oost'
    ],
    metaDescription: 'Professionele wiskunde en statistiek lessen in Amsterdam Oost, vlakbij Science Park. Persoonlijke begeleiding in een academische omgeving. ✓ Ervaren docent ✓ Maatwerk aanpak ✓ Perfecte locatie',
    address: 'Science Park 904',
    postalCode: '1098 XH',
    area: 'Oost',
    locationHighlight: {
      name: 'UvA Science Park',
      benefit: 'Gelegen in het hart van Amsterdam Oost, biedt onze Science Park locatie een ideale academische omgeving voor wiskunde en statistiek lessen.',
      accessibility: 'Uitstekend bereikbaar te voet, met de fiets of het OV vanuit heel Amsterdam Oost'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5243874815184!2d4.954328776816768!3d52.35473247207656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60f859e7d6c45%3A0x1a6f70f4d5c1a69b!2sScience%20Park%20904%2C%201098%20XH%20Amsterdam!5e0!3m2!1sen!2snl!4v1705233391051!5m2!1sen!2snl'
  },
  {
    id: 'online-bijles',
    name: 'Online Bijles',
    title: 'Online Wiskunde & Statistiek Lessen',
    description: 'Flexibele online wiskunde en statistiek lessen met persoonlijke begeleiding. Professionele een-op-een tutoring via video call met interactief whiteboard. Perfect voor studenten die efficiënt willen studeren vanaf elke locatie.',
    keywords: [
      'online priveles',
      'online bijles',
      'wiskunde online les',
      'statistiek online les',
      'wiskunde tutor online',
      'statistiek tutor online',
      'online privelessen amsterdam',
      'digitale bijles',
      'zoom bijles',
      'wiskunde video les'
    ],
    metaDescription: 'Professionele online wiskunde en statistiek lessen met persoonlijke begeleiding. Flexibel en effectief leren vanaf elke locatie. ✓ Ervaren docent ✓ Interactief whiteboard ✓ Maximaal leerrendement',
    address: 'Volledig online',
    postalCode: '',
    area: 'Online',
    onlineFeatures: {
      platform: 'Zoom of Teams met professioneel digitaal whiteboard',
      benefits: [
        'Flexibele planning',
        'Geen reistijd',
        'Opname van de les mogelijk',
        'Interactieve oefeningen',
        'Digitaal lesmateriaal'
      ],
      requirements: 'Stabiele internetverbinding en webcam aanbevolen voor optimale leerervaring'
    },
    mapUrl: ''
  }
]; 