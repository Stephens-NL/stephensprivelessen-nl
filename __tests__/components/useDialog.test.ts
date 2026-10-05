/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDialog } from '@/hooks/useDialog';

function Harness({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = React.useState(false);
  const ref = useDialog(open, () => {
    onClose();
    setOpen(false);
  });
  return React.createElement(
    'div',
    null,
    React.createElement('button', { 'data-testid': 'opener', onClick: () => setOpen(true) }, 'open'),
    open &&
      React.createElement(
        'div',
        { ref, role: 'dialog', 'aria-modal': 'true' },
        React.createElement('button', { 'data-testid': 'first' }, 'a'),
        React.createElement('button', { 'data-testid': 'last' }, 'b'),
      ),
  );
}

describe('useDialog', () => {
  it('focuses into the dialog, traps Tab, closes on Escape and restores focus', () => {
    const onClose = jest.fn();
    const { getByTestId, queryByRole } = render(React.createElement(Harness, { onClose }));
    const opener = getByTestId('opener');
    opener.focus();
    fireEvent.click(opener);

    expect(document.activeElement).toBe(getByTestId('first'));

    getByTestId('last').focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(getByTestId('first'));

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(getByTestId('last'));

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(opener);
  });
});
