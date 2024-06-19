import {IMoviesItem, IRating, IState} from "../../interface/interface";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import Preloader from "../Preloader";

import {useEffect, useState} from "react";
import {addFavoritesMovie, fetchMoviesByID} from "../../redux/storage";

import Reloader from "../error/Reloader";
import * as React from "react";
import MovieCardItem from "./item/MovieCardItem";


// Компонент страницы фильма
const MovieCard : React.FC = () => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [isShadow, setIsShadow] = useState(true);

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
        //Проверка на ответ с сервера, выводит прелоадер до успешного ответа, в случае ошибки выведет компонент перезагрузки страницы
        loadingStatusMovie !== "loaded"
        ? loadingStatusMovie === "failed"
            ? <Reloader onClick={handlerClickReboot} />
            : <Preloader />
        : cardFilm.map((movie : IMoviesItem, id) => {
            return <MovieCardItem movie={movie} addAction={() => handlerClick(movie)}/>
        })
    )
}

export default MovieCard;