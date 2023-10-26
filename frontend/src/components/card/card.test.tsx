import { render, screen } from '@testing-library/react';
import Card from './index';

test('Renderiza os detalhes do cartão corretamente', () => {
    const name = 'Johão';
    const city = 'RJ';
    const country = 'BR';
    const favoriteSport = 'Soccer';

    render(<Card name={name} city={city} country={country} favorite_sport={favoriteSport} />);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(city)).toBeInTheDocument();
    expect(screen.getByText(country)).toBeInTheDocument();
    expect(screen.getByText(favoriteSport)).toBeInTheDocument();
});
