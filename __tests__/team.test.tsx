import React from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Team } from '@/components/Team';
import { team } from '@/data/team';
import nl from '@/messages/nl/tutoring.json';

const member = { firstName: 'Sam', programme: 'Wiskunde', subjects: ['Calculus'], photo: '/x.jpg', publishConsent: false };
const view = (members: typeof team) =>
  render(
    <NextIntlClientProvider locale="nl" messages={{ tutoring: nl }}>
      <Team members={members} />
    </NextIntlClientProvider>,
  );

describe('Team', () => {
  it('ships empty', () => expect(team).toEqual([]));
  it('renders nothing without consent', () => {
    expect(view([member]).container).toBeEmptyDOMElement();
  });
  it('renders only consenting members', () => {
    const { container, getByText } = view([member, { ...member, firstName: 'Kim', publishConsent: true }]);
    expect(getByText('Kim')).toBeInTheDocument();
    expect(container.textContent).not.toContain('Sam');
  });
});
