import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../common/axiosRequest'
import { css } from '@emotion/css'
import { useContext } from 'react';
import { FavoritesContext } from '../state/FavoritesContext';
import DetailsSkeleton from '../components/DetailsSkeleton';
import { FavoritesContextType } from '../common/interfaces';
import { useQuery } from '@tanstack/react-query';

const DetailsPage: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true);

    const { favorites, setFavorites } = useContext(FavoritesContext) as FavoritesContextType;
    const { imdbId } = useParams<string>()

    const { data } = useQuery({
        queryKey: ['fetchMovieById', imdbId],
        queryFn: () => getMovieById(imdbId!),
        onSuccess: () => {
            setLoading(false);
        },
        onError: (err) => {
            console.log("Error Fetching Movie Details", err)
        }
    })

    useEffect(() => {
        setLoading(true);
    }, [imdbId])

    const toggleFavorites = () => {
        let newFav = { ...favorites };

        if (imdbId && !favorites[imdbId]) {
            newFav[imdbId] = data;
            setFavorites(newFav)
        }
        else if (imdbId) {
            delete newFav[imdbId];
            setFavorites(newFav);
        }

        localStorage.setItem("favorites", JSON.stringify(newFav))
    }

    return (
        <>
            {
                loading ? <DetailsSkeleton /> :

                    <div className={css`
                        padding: 20px;
                        display: flex;
                        justify-content: center;
                        color: white;
                        @media (max-width: 768px) {
                            flex-direction: column;
                            padding: 10px;
                        }
                    `}>
                        <div className={css`
                            width: 400px;
                            height: 600px;
                            background-image: url(${data?.Poster});
                            background-repeat: no-repeat;
                            background-size: contain;
                            background-position: center;
                            @media (max-width: 768px) {
                                width: 100%;
                                height: 400px;
                            }
                        `}>
                        </div>
                        <div className={css`
                            padding: 20px;
                            display: flex;
                            flex-direction: column;
                            width: 500px;
                            @media (max-width: 768px) {
                                width: 100%;
                                align-items: center;
                                padding: 0px;
                                margin-top: 20px;
                            }
                        `}>
                            <h1 className={css`
                                @media (max-width: 768px) {
                                    text-align:center;
                                }
                            `}>{data?.Title}</h1>
                            <p>{data?.Year}</p>
                            <p className={css`
                                margin-top: 20px;
                                @media (max-width: 768px) {
                                    width: 100%;
                                    text-align: center;
                                }
                            `}>{data?.Plot}</p>


                            <div className={css`
                                display: flex;
                                margin: 20px 0px;
                                gap: 20px;
                                
                            `}>
                                <div className={css`
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                `}>
                                    <img className={css`width: 50px`} src='imdb.png' />
                                    <p>{data?.imdbRating}</p>
                                </div>
                                <div className={css`
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                `}>
                                    <img className={css`width: 50px`} src='metacritic.png' />
                                    <p>{data?.Metascore}</p>
                                </div>
                            </div>


                            <div
                                className={css`
                                margin-bottom: auto;
                                padding: 10px 20px;
                                background-color: ${imdbId && favorites[imdbId] ? 'red' : "white"};
                                color: ${imdbId && favorites[imdbId] ? 'white' : "black"};
                                width: fit-content;
                                display: flex;  
                                justify-content: center;
                                align-items: center;
                                border-radius: 20px;
                                transition: transform 0.2s;
                                cursor: pointer;
                                :hover{
                                    transform: scale(1.05); 
                                }
                                `}
                                onClick={toggleFavorites}
                            >
                                {imdbId && favorites[imdbId] ? "Remove from favorites" : "Add to favorites"}
                            </div>

                            <p className={css`
                                margin-top: 20px;
                                font-size: 14px;
                                @media (max-width: 768px) {
                                    text-align: center;
                                }
                            `}>Cast: {data?.Actors}</p>
                            <p className={css`
                                font-size: 14px;
                            `}>Genre: {data?.Genre}</p>
                            <p className={css`
                                font-size: 14px;
                            `}>Runtime: {data?.Runtime}</p>
                            <p className={css`
                                font-size: 14px;
                            `}>Box Office: {data?.BoxOffice}</p>
                        </div>
                    </div>
            }
        </>
    )
}

export default DetailsPage;