import * as React from "react";
import { useParams } from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {AppDispatch} from "../../store/store";
import {addFavoritesMovie, fetchMoviesByID} from "../../redux/storage";
import {IMoviesItem, IState} from "../../interface/interface";

import Preloader from "../Preloader";
import Reloader from "../error/Reloader";
import MovieCardItem from "./item/MovieCardItem";
import ButtonNavigate from "../button/ButtonNavigate";

// Компонент страницы фильма
const MovieCard : React.FC = () => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const {
        loadingStatusMovie,
        cardFilm,
        currentPage
    } = useSelector((state : {state: IState}) => state.state);

    useEffect(() => {
        dispatch(fetchMoviesByID(params.id));
    }, [params])


    const handlerClick = (movie) => {
        dispatch(addFavoritesMovie(movie));
    }

    const handlerClickReboot = () => {
        dispatch(fetchMoviesByID(params.id));
    }

    return (
        <div className='movie-card'>
            <ButtonNavigate params={currentPage !== 1 ? '/movies': '/'} direction={'Назад'}/>
            {
                //Проверка на ответ с сервера, выводит прелоадер до успешного ответа, в случае ошибки выведет компонент перезагрузки страницы
                loadingStatusMovie !== "loaded"
                    ? loadingStatusMovie === "failed"
                        ? <Reloader onClick={handlerClickReboot} />
                        : <Preloader />
                    : cardFilm.map((movie : IMoviesItem, id) => {
                        return <MovieCardItem movie={movie} addAction={() => handlerClick(movie)} key={id}/>
                    })
            }
        </div>

    )
}

export default MovieCard;