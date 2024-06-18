import {IMoviesList, IRating, IState} from "../../interface/interface";
import { useParams } from "react-router-dom";
import {stubPosterCard} from "../../assets/posters";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import Preloader from "../Preloader";
import ButtonNavigate from "../button/ButtonNavigate";

import {useEffect} from "react";
import {fetchMoviesByID} from "../../redux/storage";
import {changeSizeImg} from "../../assets/posters";
import Reloader from "../error/Reloader";
import * as React from "react";

const ratingOfString = (rating : IRating) => {
    let str = ''
    let ratingIsZero = 0
    for (let key in rating) {
        if (rating[key] !== 0) {
            if (key === "kp") {
                str += `Кинопоиск: ${rating[key]}, `
            }
            if (key === "imdb") {
                str += `IMDb: ${rating[key]}, `
            }
            if (key === "filmCritics") {
                str += `Кинокрикитики: ${rating[key]}, `
            }
            if (key === "russianFilmCritics") {
                str += `Кинокритики России: ${rating[key]}, `
            }

        }
        ratingIsZero++
        if (ratingIsZero >= 4) {
            str += '-'
        }
    }
    return str.replace(/.{1}$/, '')
}

const genreOfString = (genres) => {
    let str = '';
    genres.map((genre) => {
        str += `${genre.name}, `
    })
    return str.replace(/.{2}$/, '')
}

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

    const handlerClick = () => {

    }

    const handlerClickReboot = () => {
        dispatch(fetchMoviesByID(params.id));
    }

    return (
        loadingStatusMovie !== "loaded"
        ? loadingStatusMovie === "failed"
            ? <Reloader onClick={handlerClickReboot} />
            : <Preloader />
        : cardFilm.map((movie : IMoviesList, id) => {
            return <div className="movie-card" key={id}>
                <img src={
                    movie.poster
                    ? `${changeSizeImg(movie.poster.url || movie.poster.previewUrl)}300x450`
                    : stubPosterCard} alt="Постер к фильму"
                />
                <div className="movie-info">
                    <h2 className="title">{movie.name}</h2>
                    <div className="block-btn">
                        <ButtonNavigate params={currentPage !== 1 ? '/movies' : '/'} direction={'Назад'}/>
                        <button className="btn-add" onClick={handlerClick}>В Избранное</button>
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