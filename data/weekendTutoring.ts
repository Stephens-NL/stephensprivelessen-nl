import { Bilingual } from './types';

interface WeekendLocation {
  id: string;
  title: Bilingual;
  subtitle: Bilingual;
  specialOffer: Bilingual;
  proverb?: {
    text: Bilingual;
    meaning: Bilingual;
  };
  discount: {
    text: Bilingual;
    subtext: Bilingual;
  };
  pricing: {
    regularPrice: {
      label: Bilingual;
      amount: number;
      perHour: Bilingual;
    };
    communityRate: {
      label: Bilingual;
      amount: number;
      perHour: Bilingual;
      savings: Bilingual;
    };
  };
  features: {
    location: {
      title: Bilingual;
      text: Bilingual;
    };
    availability: {
      title: Bilingual;
      text: Bilingual;
    };
    extras: {
      title: Bilingual;
      text: Bilingual;
    };
  };
  cta: {
    trial: Bilingual;
    whatsapp: Bilingual;
  };
  footer: Bilingual;
}

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
    footer: {
      EN: 'Yɛbɛyɛ bi akɔ!',
      NL: 'Yɛbɛyɛ bi akɔ!'
    }
  },
  {
    id: 'zuidoost-ghana',
    title: {
      EN: 'Ghanaian Tutoring',
      NL: 'Ghanese Bijles'
    },
    subtitle: {
      EN: 'Expert Tutoring for Ghanaian Students in Amsterdam Zuidoost',
      NL: 'Deskundige Bijles voor Ghanese Studenten in Amsterdam Zuidoost'
    },
    specialOffer: {
      EN: 'SPECIAL COMMUNITY OFFER',
      NL: 'SPECIALE GEMEENSCHAPSAANBIEDING'
    },
    discount: {
      text: {
        EN: 'COMMUNITY DISCOUNT',
        NL: 'GEMEENSCHAPSKORTING'
      },
      subtext: {
        EN: '(50% OFF REGULAR PRICE)',
        NL: '(50% KORTING OP NORMAAL TARIEF)'
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
          EN: 'Flexible scheduling throughout the week',
          NL: 'Flexibele planning door de week'
        }
      },
      extras: {
        title: {
          EN: 'Extras',
          NL: 'Extra\'s'
        },
        text: {
          EN: 'Free 30-minute trial lesson - Akwaaba!',
          NL: 'Gratis proefles van 30 minuten - Akwaaba!'
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
    footer: {
      EN: 'Akwaaba!',
      NL: 'Akwaaba!'
    }
  },
  {
    id: 'zuidoost-weekend',
    title: {
      EN: 'Weekend Tutoring',
      NL: 'Weekend Bijles'
    },
    subtitle: {
      EN: 'Weekend Tutoring Services in Amsterdam Zuidoost',
      NL: 'Weekend Bijles Diensten in Amsterdam Zuidoost'
    },
    specialOffer: {
      EN: 'WEEKEND SPECIAL OFFER',
      NL: 'WEEKEND SPECIALE AANBIEDING'
    },
    discount: {
      text: {
        EN: 'WEEKEND DISCOUNT',
        NL: 'WEEKEND KORTING'
      },
      subtext: {
        EN: '(50% OFF REGULAR PRICE)',
        NL: '(50% KORTING OP NORMAAL TARIEF)'
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
    footer: {
      EN: 'Available Saturdays & Sundays',
      NL: 'Beschikbaar op Zaterdag & Zondag'
    }
  }
]; 