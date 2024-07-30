import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Cards from '../components/Cards';

vi.mock('../Spinner', () => ({
  default: () => <div>Spinner Mock</div>,
}));

describe('Cards Component', () => {
  it('should render Spinner when isFetching is true', () => {
    const mockCards = {
      isFetching: true,
      data: undefined,
    };

    render(<Cards cards={mockCards} />);

    expect(screen.findByText('Spinner Mock')).toBeDefined();
  });

  it('should render "Sem conteúdo" when data is undefined or results is empty', () => {
    const mockCards = {
      isFetching: false,
      data: {
        results: [],
      },
    };

    render(<Cards cards={mockCards} />);

    expect(screen.findByText('Sem conteúdo')).toBeDefined();
  });

  it('should render cards when data and results contain data', () => {
    const mockCards = {
      isFetching: false,
      data: {
        results: [
          {
            title: 'Card Title 1',
            description: 'Card Description 1',
            thumbnail: {
              path: 'path/to/image1',
              extension: 'jpg',
            },
          },
          {
            title: 'Card Title 2',
            description: 'Card Description 2',
            thumbnail: {
              path: 'path/to/image2',
              extension: 'jpg',
            },
          },
        ],
      },
    };

    render(<Cards cards={mockCards} />);

    expect(screen.findByText('Card Title 1')).toBeDefined();
    expect(screen.findByText('Card Description 1')).toBeDefined();
    expect(screen.findByText('Card Title 2')).toBeDefined();
    expect(screen.findByText('Card Description 2')).toBeDefined();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
