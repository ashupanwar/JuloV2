import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import FavoritesPage from '../pages/FavoritesPage';
import { FavoritesContext } from '../state/FavoritesContext'
import { FavoritesDictonary } from '../common/interfaces';


const MockComponent = () => {
    const [favorites, setFavorites] = useState<FavoritesDictonary>({});

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites }}>
            <FavoritesPage />
        </FavoritesContext.Provider>
    )
}

test('renders favorites page', () => {
    render(<MockComponent />);
    const headerElement = screen.getByText(/favorites/i);
    expect(headerElement).toBeInTheDocument();
});
