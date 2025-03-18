import { render, screen } from '@testing-library/react';
import { render as renderWithProviders } from '../test-utils/test-providers';

// A simple test to verify Jest is working
describe('Test Setup', () => {
  it('should work with basic assertions', () => {
    expect(true).toBe(true);
    expect('Hello').toEqual('Hello');
    expect([1, 2, 3]).toHaveLength(3);
  });

  // Test that @testing-library/react works
  it('should support React Testing Library', () => {
    const { container } = render(<div data-testid="test-element">Test</div>);
    expect(screen.getByTestId('test-element')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });
  
  // Test that our custom provider setup works
  it('should work with custom test providers', () => {
    const { container } = renderWithProviders(<div data-testid="provider-test">With Providers</div>);
    expect(screen.getByTestId('provider-test')).toHaveTextContent('With Providers');
    expect(container).toBeInTheDocument();
  });
}); 