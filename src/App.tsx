import './App.css';
import ListPage from './pages/ListPage';
import DetailsPage from './pages/DetailsPage';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import FavoritesPage from './pages/FavoritesPage';
import { FavoritesContext } from './state/FavoritesContext'
import React, { useEffect, useState } from 'react';
import { FavoritesDictonary } from './common/interfaces';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryClient = new QueryClient()

const App: React.FC = () => {

  const [favorites, setFavorites] = useState<FavoritesDictonary>({});

  useEffect(() => {
    let favFromLS: string | null = localStorage.getItem("favorites");
    if (favFromLS) {
      setFavorites(JSON.parse(favFromLS))
    }
  }, [])

  return (

    <QueryClientProvider client={queryClient}>
      <FavoritesContext.Provider value={{ favorites, setFavorites }}>
        <div className="App">

          <RouterProvider router={router} />

        </div>
      </FavoritesContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
