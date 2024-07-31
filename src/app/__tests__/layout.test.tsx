import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';
import { describe, it, expect } from 'vitest';

describe('RootLayout', () => {
  it('renders the layout with header and children', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    const logo = screen.getByAltText('Logo neuralmed');
    expect(logo).toBeDefined();

    const user = screen.getByText('Usuário de Teste');
    expect(user).toBeDefined();

    const child = screen.getByText('Test Child');
    expect(child).toBeDefined();
  });
});
