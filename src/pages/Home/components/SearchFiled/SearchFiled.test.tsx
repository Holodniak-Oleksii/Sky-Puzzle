import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchFiled from './SearchFiled';

// Mock useCities hook
vi.mock('@/hooks/useCities', () => ({
  default: () => ({
    addCity: vi.fn(),
  }),
}));

describe('SearchFiled', () => {
  it('renders the component correctly', () => {
    render(<SearchFiled />);
    expect(
      screen.getByPlaceholderText('Enter full city name')
    ).toBeInTheDocument();
    expect(screen.getByText('Get')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchFiled />);
    const input = screen.getByPlaceholderText(
      'Enter full city name'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Kyiv' } });
    expect(input).toHaveValue('Kyiv');
  });
});
