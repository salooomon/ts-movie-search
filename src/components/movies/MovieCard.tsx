import {IMoviesList, IRating, IState} from "../../interface/interface";
import { useParams } from "react-router-dom";
import {stubPosterCard} from "../../assets/posters";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import Preloader from "../Preloader";
import ButtonNavigate from "../button/ButtonNavigate";

import {useEffect, useState} from "react";
import {addFavoritesMovie, fetchMoviesByID} from "../../redux/storage";
import {changeSizeImg} from "../../assets/posters";
import Reloader from "../error/Reloader";
import * as React from "react";
import {genreOfString, ratingOfString} from "../../utils/utils";
import SuccessfullyAddedMovie from "../../utils/successfullyAddedMovie";

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

    useEffect(() => {
        setTimeout(() => {
            setIsShadow(true)
        }, 3000)
    }, [isShadow])

    const handlerClick = (movie) => {
        dispatch(addFavoritesMovie(movie));
        setIsShadow(false)
        // alert('Фильм успешно добавлен в список!')
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
        : cardFilm.map((movie : IMoviesList, id) => {
            return <div className="movie-card" key={id}>
                {isShadow ? '' : <SuccessfullyAddedMovie />}
                <img src={
                    movie.poster
                    ? `${changeSizeImg(movie.poster.url || movie.poster.previewUrl)}300x450`
                    : stubPosterCard} alt="Постер к фильму"
                />
                <div className="movie-info">
                    <h2 className="title">{movie.name}</h2>
                    <div className="block-btn">
                        <ButtonNavigate params={currentPage !== 1 ? '/movies' : '/'} direction={'Назад'}/>
                        <button className="btn-add" onClick={() => handlerClick(movie)}>В Избранное</button>
                    </div>
                    <h3 className="info">О фильме</h3>
                    <p> <b>Описание фильма:</b> {movie.description ? movie.description : 'Описание отсутвует'}</p>
                    <p> <b>Год выпуска: </b>{Array.isArray(movie.releaseYears) ? movie.releaseYears[0].start : movie.year }</p>
                    <p><b>Жанр:</b> {genreOfString(movie.genres)}</p>
                    <p><b>Рейтинг:</b> {movie.rating ? ratingOfString(movie.rating) : 'Нет оценок'}</p>
                </div>
            </div>
        })
    )
}

export default MovieCard;