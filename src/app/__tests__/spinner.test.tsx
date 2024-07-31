import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from '@/app/components/Spinner';

describe('Spinner Component', () => {
  it('should render the spinner correctly', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeDefined();

    const loadingText = screen.findByText('Loading...');
    expect(loadingText).toBeDefined();
  });
});
