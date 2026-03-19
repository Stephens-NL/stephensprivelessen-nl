import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = {
    common: (await import(`../messages/${locale}/common.json`)).default,
    home: (await import(`../messages/${locale}/home.json`)).default,
    services: (await import(`../messages/${locale}/services.json`)).default,
    tutoring: (await import(`../messages/${locale}/tutoring.json`)).default,
    workshops: (await import(`../messages/${locale}/workshops.json`)).default,
    mbo: (await import(`../messages/${locale}/mbo.json`)).default,
    thesis: (await import(`../messages/${locale}/thesis.json`)).default,
    consultancy: (await import(`../messages/${locale}/consultancy.json`)).default,
    contact: (await import(`../messages/${locale}/contact.json`)).default,
    about: (await import(`../messages/${locale}/about.json`)).default,
    faq: (await import(`../messages/${locale}/faq.json`)).default,
    feedback: (await import(`../messages/${locale}/feedback.json`)).default,
    blog: (await import(`../messages/${locale}/blog.json`)).default,
    terms: (await import(`../messages/${locale}/terms.json`)).default,
    boa: (await import(`../messages/${locale}/boa.json`)).default,
    weekend: (await import(`../messages/${locale}/weekend.json`)).default,
    errors: (await import(`../messages/${locale}/errors.json`)).default,
  };

  return {locale, messages};
});
