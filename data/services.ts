import { GeneralContentProps, Service } from './types';

export const services: Service[] = [
  {
    icon: "/images/svg/math-icon.svg",
    title: { EN: "Mathematics & General Tutoring", NL: "Wiskunde & Algemene Bijles" },
    shortDescription: { 
      EN: "Comprehensive tutoring for all levels, including CCVX and adult education.", 
      NL: "Uitgebreide bijlessen voor alle niveaus, inclusief CCVX en volwassenenonderwijs." 
    },
    longDescription: { 
      EN: "Our tutoring services cover a wide range of subjects for students of all ages and levels, from elementary school to university and adult education. Whether you need help with basic arithmetic, advanced calculus, exam preparation (including CCVX), or professional certifications, we offer tailored lessons to meet your needs. Our experienced tutors provide personalized plans to help you achieve your educational goals.",
      NL: "Onze bijlessen dekken een breed scala aan vakken voor studenten van alle leeftijden en niveaus, van basisschool tot universiteit en volwassenenonderwijs. Of je nu hulp nodig hebt met basisrekenen, gevorderde calculus, examentraining (inclusief CCVX), of professionele certificeringen, wij bieden op maat gemaakte lessen die aan jouw behoeften voldoen. Onze ervaren docenten bieden gepersonaliseerde plannen om je te helpen je educatieve doelen te bereiken."
    },
    subjectsList: [
      "Wiskunde A/B/C/D", "Natuurkunde", "Scheikunde", "Engels", 
      "Bedrijfsstatistiek", "Calculus", "Economie", "Statistiek", 
      "Kansberekening", "Lineaire Algebra", "Verzamelingenleer"
    ]
  },
  {
    icon: "/images/png/programming-icon.png",
    title: { EN: "Programming Lessons", NL: "Programmeerlessen" },
    shortDescription: { 
      EN: "Learn coding in Python, Java, and more.", 
      NL: "Leer coderen in Python, Java, en meer." 
    },
    longDescription: { 
      EN: "Our programming courses cover a wide range of languages and skills, including Python, Java, C++, and web development. Whether you're a beginner or an advanced student, our lessons are tailored to your needs. We offer hands-on projects, real-world applications, and guidance on best practices in coding. Ideal for students, professionals, or hobbyists seeking to enhance their technical skills.",
      NL: "Onze programmeercursussen dekken een breed scala aan talen en vaardigheden, waaronder Python, Java, C++, en webontwikkeling. Of je nu een beginner bent of een gevorderde student, onze lessen zijn afgestemd op jouw behoeften. We bieden praktische projecten, real-world toepassingen en begeleiding bij de beste praktijken in coderen. Ideaal voor studenten, professionals of hobbyisten die hun technische vaardigheden willen verbeteren."
    },
    subjectsList: [
      "Python", "Java", "C#", "C++", "HTML", "CSS", "JavaScript", 
      "React", "SQL", "MATLAB", "SPSS", "R"
    ]
  },
  {
    icon: "/images/png/workshop-icon.png",
    title: { EN: "Creative Workshops", NL: "Creatieve Workshops" },
    shortDescription: { 
      EN: "Explore creativity through music, photography, and more.", 
      NL: "Ontdek creativiteit door muziek, fotografie, en meer." 
    },
    longDescription: { 
      EN: "Our creative workshops offer hands-on learning in a range of artistic fields, including music production, DJ skills, and photography. Perfect for both beginners and advanced learners, these workshops can be tailored to suit children, adults, or professionals looking for a unique team-building experience or a creative day out.",
      NL: "Onze creatieve workshops bieden hands-on leren in verschillende artistieke vakgebieden, waaronder muziekproductie, DJ-vaardigheden en fotografie. Perfect voor zowel beginners als gevorderden, kunnen deze workshops worden aangepast voor kinderen, volwassenen of professionals die op zoek zijn naar een unieke teambuilding-ervaring of een creatieve dag uit."
    }
  },
  {
    icon: "/images/png/workshop-icon.png",
    title: { EN: "Non-Creative Workshops", NL: "Niet-Creatieve Workshops" },
    shortDescription: { 
      EN: "Practical, skill-based workshops for various fields.", 
      NL: "Praktische, vaardigheidsgerichte workshops voor verschillende vakgebieden." 
    },
    longDescription: { 
      EN: "Our non-creative workshops focus on developing practical skills in areas such as data analysis, AI tools, and professional certifications. These workshops are ideal for professionals seeking to enhance their skills, students preparing for advanced studies, or teams looking to improve their technical capabilities. Workshops can be customized for various age groups and professional needs.",
      NL: "Onze niet-creatieve workshops richten zich op het ontwikkelen van praktische vaardigheden op gebieden zoals data-analyse, AI-tools en professionele certificeringen. Deze workshops zijn ideaal voor professionals die hun vaardigheden willen verbeteren, studenten die zich voorbereiden op gevorderde studies, of teams die hun technische capaciteiten willen verbeteren. Workshops kunnen worden aangepast voor verschillende leeftijdsgroepen en professionele behoeften."
    }
  },
  {
    icon: "/images/png/consultancy-icon.png",
    title: { EN: "Consultancy & Advisory", NL: "Consultancy & Advies" },
    shortDescription: { 
      EN: "Expert guidance for businesses and individuals.", 
      NL: "Deskundig advies voor bedrijven en individuen." 
    },
    longDescription: { 
      EN: "We offer consultancy and advisory services for businesses and individuals seeking expertise in data analysis, AI, and software development. Our tailored solutions help you tackle complex problems and implement effective strategies. Whether you need short-term advice or long-term project management, our services are designed to meet your specific needs.",
      NL: "We bieden consultancy en adviesdiensten voor bedrijven en individuen die op zoek zijn naar expertise in data-analyse, AI en softwareontwikkeling. Onze op maat gemaakte oplossingen helpen je bij het aanpakken van complexe problemen en het implementeren van effectieve strategieën. Of je nu behoefte hebt aan kortetermijnadvies of langdurig projectmanagement, onze diensten zijn ontworpen om aan jouw specifieke behoeften te voldoen."
    }
  },
  {
    icon: "/images/png/custom-icon.png",
    title: { EN: "Custom Solutions", NL: "Maatwerkoplossingen" },
    shortDescription: { 
      EN: "Tailored solutions for unique challenges.", 
      NL: "Maatwerkoplossingen voor unieke uitdagingen." 
    },
    longDescription: { 
      EN: "If you have a unique problem or project that requires a specialized solution, we offer custom services to meet your specific needs. Whether it's a data analysis challenge, software development project, or educational requirement, we'll work with you to create a solution that fits perfectly. Let's discuss your needs and develop a plan that works for you.",
      NL: "Als je een uniek probleem of project hebt dat een gespecialiseerde oplossing vereist, bieden we maatwerkdiensten aan om aan jouw specifieke behoeften te voldoen. Of het nu gaat om een data-analyse-uitdaging, softwareontwikkelingsproject of onderwijsbehoefte, we werken met je samen om een oplossing te creëren die perfect past. Laten we jouw behoeften bespreken en een plan ontwikkelen dat voor jou werkt."
    }
  }
];

export const generalContent: GeneralContentProps = {
  ourServices: { EN: "Our Services", NL: "Onze Diensten" },
  serviceDetails: {
    EN: "Explore our range of tutoring and education services, designed to help you excel in mathematics, programming, and more.",
    NL: "Ontdek ons aanbod van bijlessen en onderwijsdiensten, ontworpen om je te helpen uitblinken in wiskunde, programmeren, en meer."
  },
  learnMore: { EN: "Learn More", NL: "Meer Informatie" },
}