import { render, screen,cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
		it('should render without crash', () => {
			render(<ResultBox from="PLN" to="USD" amount={100} />)
		})
		it('should render proper info about conversion when PLN -> USD',() => {
			const testCases = [
				{amount: '100.00', result: '28.57'},
				{amount: '485.00', result: '138.57'},
				{amount: '17.00', result: '4.86'}
			];
			for (const testObj of testCases){
				render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amount)} />)
				
				const resultBoxField = screen.getByTestId('result-box')
				expect(resultBoxField).toHaveTextContent(`PLN ${testObj.amount} = $${testObj.result}`)
				cleanup();	
			}
		})
			it('should render proper info about conversion when USD -> PLN',() => {
				const testCases = [
					{amount: '100.00', result: '350.00'},
					{amount: '485.00', result: '1,697.50'},
					{amount: '17.00', result: '59.50'}
				];
				for (const testObj of testCases){
					render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />)
					
					const resultBoxField = screen.getByTestId('result-box')
					expect(resultBoxField).toHaveTextContent(`$${testObj.amount} = PLN ${testObj.result}`)
					cleanup();	
				}
		})
		it('should render proper info about conversion when PLN -> PLN',() => {
			const testCases = [
				{ amount: '167.00', result: '167.00'},
				{ amount: '478.00', result: '478.00'}
			];
			for (const testObj of testCases){
				render(<ResultBox from='PLN' to='PLN' amount={parseInt(testObj.amount)} />)
				const resultBoxField = screen.getByTestId('result-box');
				expect(resultBoxField).toHaveTextContent(`PLN ${testObj.amount} = PLN ${testObj.result}`)
				cleanup();	
			}
		})
		it('should render proper info about conversion when USD -> USD',() => {
			const testCases = [
				{amount: '167.00', result: '167.00'},
				{ amount: '478.00', result: '478.00'}
			];
			for (const testObj of testCases){
				render(<ResultBox from='USD' to='UDS' amount={parseInt(testObj.amount)} />)
				const resultBoxField = screen.getByTestId('result-box');
				expect(resultBoxField).toHaveTextContent(`$${testObj.amount} = $${testObj.result}`)
				cleanup();	
			}
		})
		it('should render Wrong Value if amount <= 0',() => {
			const testCases = [
				{from: 'USD', to: 'PLN',amount: -1.5},
				{from: 'PLN', to: 'USD', amount: -10},
				{from: 'USD', to: 'USD',amount: -270},
				{from: 'PLN', to: 'PLN', amount: -42}
			]

			for (const testObj of testCases){
				render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />)
				const resultBoxField = screen.getByTestId('result-box');
				expect(resultBoxField).toHaveTextContent('Wrong value...')
				cleanup();
			}
		})
	})
