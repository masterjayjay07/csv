import { render, screen } from '@testing-library/react';
import CardsList from './index';
import CardInterface from '../../interfaces/cardInterface';

test('Render components when length of csvDta is greater than 0', () => {
  const mockCsvData = [
    {
      name: 'Johão',
      city: 'RJ',
      country: 'BR',
      favorite_sport: 'Soccer',
    },
    {
      name: 'Maria',
      city: 'NY',
      country: 'USA',
      favorite_sport: 'Basketball',
    },
  ];

  render(<CardsList csvData={mockCsvData} />);

  const carouselItems = screen.getAllByTestId('carousel-item');
  expect(carouselItems.length).toBe(mockCsvData.length);

  mockCsvData.forEach((item, index) => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.city)).toBeInTheDocument();
  });
});

test('Not render item because length of csvData', () => {
  const mockCsvData: CardInterface[] = [];
  render(<CardsList csvData={mockCsvData} />);

  const carouselItems = screen.queryAllByTestId('carousel-item');
  expect(carouselItems.length).toBe(0);
});
