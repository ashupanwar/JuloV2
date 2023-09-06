import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getSearchResults } from '../common/axiosRequest'

const useMovieSearch = (query: string, page: number) => {

    const [movies, setMovies] = useState<Object[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const { data } = useQuery({
        queryKey: ['fetchSearchResults', query, page],
        queryFn: () => getSearchResults(query, page),
        onSuccess: (res) => {
            if (res.Response === 'True') {
                setMovies(prev => {
                    return [...prev, ...res.Search]
                });
                setTotalPages(Math.ceil(res.totalResults / 10))
                setHasMore(page * 10 < res.totalResults);
            }
            setLoading(false);
        },
        onError: (err) => {
            console.log("Error Fetching Search Results", err)
            setError(true);
            setLoading(false);
        }
    })

    useEffect(() => {
        setMovies([]);
    }, [query])

    useEffect(() => {
        if (query.length > 0) {
            setLoading(true);
            setError(false);
        }
    }, [query, page]);

    useEffect(() => {
        if (movies.length) {
            setLoading(false);
        }
    }, [movies])

    return { movies, totalPages, loading, error, hasMore }
}

export default useMovieSearch