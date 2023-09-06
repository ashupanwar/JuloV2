export interface FavoritesDictonary {
    [key: string]: Object
}


export interface FavoritesContextType {
    favorites: FavoritesDictonary;
    setFavorites: (favorites: FavoritesDictonary) => void;
};

export interface SearchProps {
    updateQuery: (query: string) => void;
}

export interface ListProps {
    query: string;
}
export interface CardProps {
    data: any;
}
