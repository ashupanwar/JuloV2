import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import {
    createHashRouter,
    RouterProvider,
} from "react-router-dom";
import ListPage from '../pages/ListPage';
import DetailsPage from '../pages/DetailsPage';
import FavoritesPage from '../pages/FavoritesPage';

const router = createHashRouter([
    {
        path: "/",
        element: (
            <ListPage />
        ),
    },
    {
        path: ":imdbId",
        element: (<DetailsPage />),
    },
    {
        path: "favorites",
        element: (<FavoritesPage />),
    },
]);

let data = { Poster: "", Title: "Title", Type: "Type", Year: "2000" }

const MockComponent = () => {
    return (
        <div className="App">
            <RouterProvider router={router} />
            <Card data />
        </div>
    )
}

test('renders card', () => {

    render(<MockComponent />);
    const titleText = screen.getByText(/title/i);
    expect(titleText).toBeInTheDocument();
});
