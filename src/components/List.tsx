import React, { useEffect, useState, useRef, useCallback } from 'react'
import { getSearchResults } from '../common/axiosRequest'
import Card from './Card';
import { css } from '@emotion/css'
import CardSkeleton from './CardSkeleton';
import { ListProps } from '../common/interfaces';
import { useQuery } from '@tanstack/react-query';
import useMovieSearch from '../hooks/useMovieSearch';

const List: React.FC<ListProps> = ({ query }) => {

    const [page, setPage] = useState<number>(1);

    const { movies, totalPages, loading, error, hasMore } = useMovieSearch(query, page)

    const observer = useRef<IntersectionObserver>();
    const lastMovieCardRef = useCallback((node: any) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        })
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <div className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `}>

            <div className={css`
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 10px;
                justify-content: center;
                @media (max-width: 768px) {
                    grid-template-columns: 1fr 1fr;
                }
            `}>
                {movies.map((elem: any, index: number) => {
                    if (movies.length === index + 1) {
                        return <div ref={lastMovieCardRef} key={elem.imdbID}><Card data={elem} /></div>
                    }
                    return <Card key={elem.imdbID} data={elem} />
                })}
                {loading && [0].map((elem, index) => {
                    return <CardSkeleton key={index} />
                })}
            </div>

        </div>
    )
}

export default List