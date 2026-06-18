import {
  voOnlinePackages,
  voPhysicalPackages,
  spoedPrices,
  scriptieRates,
} from '@/data/pricingData';
import { businessConfig } from '@/data/business-config.generated';

/**
 * SPL Fase 3 (#162): de prijstabellen worden afgeleid uit de vendored business-config
 * codegen. Deze test is de website-side drift-guard — verandert business-config (na een
 * re-sync) een tarief, dan veranderen deze verwachtingen mee of breekt de test.
 */
describe('pricing afgeleid uit business-config (SPL Fase 3)', () => {
  it('VO online = canonieke 4u-pakkettarieven', () => {
    expect(voOnlinePackages).toEqual([
      { students: 1, packagePrice: 240, pricePerPerson: 240 },
      { students: 2, packagePrice: 320, pricePerPerson: 160 },
      { students: 3, packagePrice: 420, pricePerPerson: 140 },
      { students: 4, packagePrice: 520, pricePerPerson: 130 },
    ]);
  });

  it('VO fysiek = canonieke 4u-pakkettarieven', () => {
    expect(voPhysicalPackages).toEqual([
      { students: 1, packagePrice: 300, pricePerPerson: 300 },
      { students: 2, packagePrice: 400, pricePerPerson: 200 },
      { students: 3, packagePrice: 525, pricePerPerson: 175 },
      { students: 4, packagePrice: 640, pricePerPerson: 160 },
    ]);
  });

  it('spoedprijzen = amount_cents/100 uit business-config', () => {
    expect(spoedPrices).toEqual({
      voOnline: 120,
      voPhysical: 180,
      hboWoOnline: 180,
      hboWoPhysical: 260,
    });
  });

  it('scriptie-tarieven afgeleid uit business-config', () => {
    expect(scriptieRates).toEqual([
      { duration: 'Statistiek & Onderzoek', price: '€90/uur' },
      { duration: 'Data Science & AI', price: '€100/uur' },
    ]);
  });

  it('bron == weergave (een business-config-wijziging propageert)', () => {
    const vo1 = businessConfig.rates.find((r) => r.rate_id === 'vo_online_1');
    expect(vo1?.amount_cents).toBe(24000);
    expect(voOnlinePackages[0].packagePrice).toBe((vo1?.amount_cents ?? 0) / 100);
  });
});
