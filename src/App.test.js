import { render, screen } from '@testing-library/react';
import App from './App';

test('Render table as requirement', () => {
  render(<App />);
  const idColumn = screen.getByText(/ID/i);
  const nameColumn = screen.getByText(/Name/i);
  const emailColumn = screen.getByText(/Email/i);
  const statusColumn = screen.getByText(/Status/i);
  const actionColumn = screen.getByText(/Action/i);
  expect(idColumn).toBeInTheDocument();
  expect(nameColumn).toBeInTheDocument();
  expect(emailColumn).toBeInTheDocument();
  expect(statusColumn).toBeInTheDocument();
  expect(actionColumn).toBeInTheDocument();
});