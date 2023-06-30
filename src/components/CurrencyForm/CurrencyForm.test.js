import { render, screen,cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });
	it('should run action callback with proper data on form submit', () => {
    const action = jest.fn();
		const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
	];
		for(const testObj of testCases){

			render(<CurrencyForm action={action} />);

			const submitButton = screen.getByText('Convert');
			const amountField = screen.getByTestId('amount');
			const from = screen.getByTestId('from-select');
			const to = screen.getByTestId('to-select');
			userEvent.type(amountField, testObj.amount);
			userEvent.selectOptions(from, testObj.from);
			userEvent.selectOptions(to, testObj.to);
			userEvent.click(submitButton);
			expect(action).toBeCalledWith({amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to});

			cleanup();
		};
	});
});