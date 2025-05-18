import { WeekendLocation } from './types';
import { config } from './config';

export const weekendLocations: WeekendLocation[] = [
  {
    id: 'boa-me-na-menboa-mo',
    title: {
      EN: 'Boa me na menboa mo',
      NL: 'Boa me na menboa mo'
    },
    subtitle: {
      EN: 'Weekend Tutoring for Ghanaian Youth in Amsterdam Zuidoost',
      NL: 'Weekend Bijles voor Ghanese Jongeren in Amsterdam Zuidoost'
    },
    specialOffer: {
      EN: 'SPECIAL COMMUNITY OFFER',
      NL: 'SPECIALE GEMEENSCHAPSAANBIEDING'
    },
    proverb: {
      text: {
        EN: 'Nea onnim no sua a, ohu!',
        NL: 'Nea onnim no sua a, ohu!'
      },
      meaning: {
        EN: '(One who doesn\'t know can learn!)',
        NL: '(Wie niet weet kan leren!)'
      }
    },
    discount: {
      text: {
        EN: 'FA MA YƐNKA!',
        NL: 'FA MA YƐNKA!'
      },
      subtext: {
        EN: '(50% DISCOUNT!)',
        NL: '(50% KORTING!)'
      }
    },
    pricing: {
      regularPrice: {
        label: {
          EN: 'Regular Price',
          NL: 'Normale Prijs'
        },
        amount: 60,
        perHour: {
          EN: 'per hour',
          NL: 'per uur'
        }
      },
      communityRate: {
        label: {
          EN: 'Community Rate',
          NL: 'Gemeenschapstarief'
        },
        amount: 30,
        perHour: {
          EN: 'per hour',
          NL: 'per uur'
        },
        savings: {
          EN: 'SAVE €30 EVERY HOUR!',
          NL: 'BESPAAR €30 PER UUR!'
        }
      }
    },
    features: {
      location: {
        title: {
          EN: 'Location',
          NL: 'Locatie'
        },
        text: {
          EN: 'At Douwe Egberts (Dubbelink 2) or home tutoring in Gein',
          NL: 'Bij Douwe Egberts (Dubbelink 2) of bijles aan huis in Gein'
        }
      },
      availability: {
        title: {
          EN: 'Availability',
          NL: 'Beschikbaarheid'
        },
        text: {
          EN: 'Saturdays and Sundays, flexible hours',
          NL: 'Zaterdag en zondag, flexibele tijden'
        }
      },
      extras: {
        title: {
          EN: 'Extras',
          NL: 'Extra\'s'
        },
        text: {
          EN: 'Free 30-minute trial lesson - Sɔhwɛ adesua!',
          NL: 'Gratis proefles van 30 minuten - Sɔhwɛ adesua!'
        }
      }
    },
    cta: {
      trial: {
        EN: 'Book Free Trial',
        NL: 'Boek Gratis Proefles'
      },
      whatsapp: {
        EN: 'WhatsApp Us',
        NL: 'WhatsApp Ons'
      }
    },
    programOffers: {
      weekendTutoring: {
        title: {
          EN: 'Weekend Tutoring for Ghanaian Youth',
          NL: 'Weekend Bijles voor Ghanese Jongeren'
        },
        titleTwi: 'Adesua mma sukuufo',
        description: {
          EN: '🎓 Special community discount for Ghanaian youth in Zuidoost! Only €30 per hour (regular €60). Home tutoring available in Gein or at Douwe Egberts. Ɛyɛ mmerɛw! Start with a free 30-minute trial lesson!',
          NL: '🎓 Speciale gemeenschapskorting voor Ghanese jongeren in Zuidoost! Slechts €30 per uur (normaal €60). Bijles aan huis in Gein of bij Douwe Egberts. Ɛyɛ mmerɛw! Begin met een gratis proefles van 30 minuten!'
        },
        whatsappMessage: {
          EN: "Hi! I'm interested in the Boa me na menboa mo tutoring program. Can I book a trial lesson?",
          NL: "Hoi! Ik ben geïnteresseerd in het Boa me na menboa mo bijlesprogramma. Kan ik een proefles boeken?"
        }
      },
      personalCoaching: {
        title: {
          EN: 'Personal Coaching & Study Support',
          NL: 'Persoonlijke Coaching & Studiebegeleiding'
        },
        titleTwi: 'Akwankyerɛ ne Mmoa',
        description: {
          EN: '💡 Need guidance with your studies or personal development? Available weekends for €30/hour in Zuidoost. Me ne wo bɛyɛ adwuma! (We\'ll work together!) First 30-minute consultation is free.',
          NL: '💡 Hulp nodig bij je studie of persoonlijke ontwikkeling? Beschikbaar in het weekend voor €30/uur in Zuidoost. Me ne wo bɛyɛ adwuma! (We werken samen!) Eerste consult van 30 minuten is gratis.'
        },
        whatsappMessage: {
          EN: "Hi! I'm interested in personal coaching/study support from the Boa me na menboa mo program. Can you tell me more?",
          NL: "Hoi! Ik ben geïnteresseerd in persoonlijke coaching/studiebegeleiding van het Boa me na menboa mo programma. Kun je me meer vertellen?"
        }
      },
      flexibleSupport: {
        title: {
          EN: 'Flexible Weekend Support',
          NL: 'Flexibele Weekend Ondersteuning'
        },
        titleTwi: 'Mmerɛ-mmerɛ Mmoa',
        description: {
          EN: '✨ Whether it\'s math, coaching, or just discussing your studies - I\'m here to help! Special rate of €30/hour (save €30). Yɛbɛyɛ bi akɔ! Available at Douwe Egberts or home tutoring in Gein.',
          NL: '✨ Of het nu gaat om wiskunde, coaching of gewoon je studie bespreken - ik ben er om te helpen! Speciaal tarief van €30/uur (bespaar €30). Yɛbɛyɛ bi akɔ! Beschikbaar bij Douwe Egberts of bijles aan huis in Gein.'
        },
        whatsappMessage: {
          EN: "Hi! I'm interested in the flexible weekend support from Boa me na menboa mo. I'd like to learn more about the possibilities.",
          NL: "Hoi! Ik ben geïnteresseerd in de flexibele weekendondersteuning van Boa me na menboa mo. Ik wil graag meer weten over de mogelijkheden."
        }
      }
    },
    location: {
      name: {
        EN: 'Douwe Egberts Café',
        NL: 'Douwe Egberts Café'
      },
      description: {
        EN: 'Centrally located in Amsterdam Zuidoost, right at Bijlmer Arena metro station. Easily accessible by public transport and car.',
        NL: 'Centraal gelegen in Amsterdam Zuidoost, direct bij metrostation Bijlmer Arena. Makkelijk bereikbaar met OV en auto.'
      },
      address: `${config.business.weekendOffice.address}, ${config.business.weekendOffice.postalCode} ${config.business.weekendOffice.city}`,
      mapUrl: 'https://maps.app.goo.gl/nMBBA9MAaKhDrPmSA?g_st=iwb',
      hours: {
        EN: 'Open daily: 08:00 - 22:00',
        NL: 'Dagelijks geopend: 08:00 - 22:00'
      }
    },
    footer: {
      EN: 'Yɛbɛyɛ bi akɔ!',
      NL: 'Yɛbɛyɛ bi akɔ!'
    }
  },
  {
    id: 'zuidoost-weekend',
    title: {
      EN: 'Weekend Tutoring Zuidoost',
      NL: 'Weekend Bijles Zuidoost'
    },
    subtitle: {
      EN: 'Weekend Tutoring in Amsterdam Zuidoost',
      NL: 'Weekend Bijles in Amsterdam Zuidoost'
    },
    specialOffer: {
      EN: 'SPECIAL WEEKEND OFFER',
      NL: 'SPECIAAL WEEKEND AANBOD'
    },
    discount: {
      text: {
        EN: 'SAVE 50%',
        NL: '50% KORTING'
      },
      subtext: {
        EN: '(Limited spots available)',
        NL: '(Beperkt aantal plekken)'
      }
    },
    pricing: {
      regularPrice: {
        label: {
          EN: 'Regular Price',
          NL: 'Normale Prijs'
        },
        amount: 60,
        perHour: {
          EN: 'per hour',
          NL: 'per uur'
        }
      },
      communityRate: {
        label: {
          EN: 'Weekend Rate',
          NL: 'Weekend Tarief'
        },
        amount: 30,
        perHour: {
          EN: 'per hour',
          NL: 'per uur'
        },
        savings: {
          EN: 'SAVE €30 EVERY HOUR!',
          NL: 'BESPAAR €30 PER UUR!'
        }
      }
    },
    features: {
      location: {
        title: {
          EN: 'Location',
          NL: 'Locatie'
        },
        text: {
          EN: 'At Douwe Egberts (Dubbelink 2) or home tutoring in Gein',
          NL: 'Bij Douwe Egberts (Dubbelink 2) of bijles aan huis in Gein'
        }
      },
      availability: {
        title: {
          EN: 'Availability',
          NL: 'Beschikbaarheid'
        },
        text: {
          EN: 'Saturdays and Sundays, flexible hours',
          NL: 'Zaterdag en zondag, flexibele tijden'
        }
      },
      extras: {
        title: {
          EN: 'Extras',
          NL: 'Extra\'s'
        },
        text: {
          EN: 'Free 30-minute trial lesson',
          NL: 'Gratis proefles van 30 minuten'
        }
      }
    },
    cta: {
      trial: {
        EN: 'Book Free Trial',
        NL: 'Boek Gratis Proefles'
      },
      whatsapp: {
        EN: 'WhatsApp Us',
        NL: 'WhatsApp Ons'
      }
    },
    programOffers: {
      weekendTutoring: {
        title: {
          EN: 'Weekend Tutoring',
          NL: 'Weekend Bijles'
        },
        description: {
          EN: '🎓 Special weekend discount! Only €30 per hour (regular €60). Home tutoring available in Gein. Start with a free 30-minute trial lesson!',
          NL: '🎓 Speciale weekendkorting! Slechts €30 per uur (normaal €60). Bijles aan huis in Gein. Begin met een gratis proefles van 30 minuten!'
        },
        whatsappMessage: {
          EN: "Hi! I'm interested in the weekend tutoring program. Can I book a trial lesson?",
          NL: "Hoi! Ik ben geïnteresseerd in het weekend bijlesprogramma. Kan ik een proefles boeken?"
        }
      },
      personalCoaching: {
        title: {
          EN: 'Personal Coaching',
          NL: 'Persoonlijke Coaching'
        },
        description: {
          EN: '💡 Need guidance with your studies? Available weekends for €30/hour in Zuidoost. First 30-minute consultation is free!',
          NL: '💡 Hulp nodig met je studie? Beschikbaar in het weekend voor €30/uur in Zuidoost. Eerste 30 minuten gesprek is gratis!'
        },
        whatsappMessage: {
          EN: "Hi! I'm interested in personal coaching. Can you tell me more?",
          NL: "Hoi! Ik ben geïnteresseerd in persoonlijke coaching. Kun je me meer vertellen?"
        }
      },
      flexibleSupport: {
        title: {
          EN: 'Flexible Support',
          NL: 'Flexibele Ondersteuning'
        },
        description: {
          EN: '✨ Whether it\'s math, coaching, or just discussing your studies - I\'m here to help! Special rate of €30/hour (save €30). Home service in Gein.',
          NL: '✨ Of het nu gaat om wiskunde, coaching of gewoon je studie bespreken - ik help je graag! Speciaal tarief van €30/uur (bespaar €30). Service aan huis in Gein.'
        },
        whatsappMessage: {
          EN: "Hi! I'm interested in flexible study support. I'd like to learn more about the possibilities.",
          NL: "Hoi! Ik ben geïnteresseerd in flexibele studieondersteuning. Ik zou graag meer willen weten over de mogelijkheden."
        }
      }
    },
    location: {
      name: {
        EN: 'Douwe Egberts Café',
        NL: 'Douwe Egberts Café'
      },
      description: {
        EN: 'Centrally located in Amsterdam Zuidoost, right at Bijlmer Arena metro station. Easily accessible by public transport and car.',
        NL: 'Centraal gelegen in Amsterdam Zuidoost, direct bij metrostation Bijlmer Arena. Makkelijk bereikbaar met OV en auto.'
      },
      address: `${config.business.weekendOffice.address}, ${config.business.weekendOffice.postalCode} ${config.business.weekendOffice.city}`,
      mapUrl: 'https://maps.app.goo.gl/nMBBA9MAaKhDrPmSA?g_st=iwb',
      hours: {
        EN: 'Open daily: 08:00 - 22:00',
        NL: 'Dagelijks geopend: 08:00 - 22:00'
      }
    },
    footer: {
      EN: 'Let\'s learn together!',
      NL: 'Samen leren we meer!'
    }
  }
]; 