import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {fetchMoviesWithOptions} from "../../redux/storage";
import {AppDispatch} from "../../store/store";
import {IState} from "../../interface/interface";
import Preloader from "../Preloader";
import MoviesList from "../movies/MoviesList";
import ButtonNavigate from "../button/ButtonNavigate";

import ButtonPages from "../button/ButtonPages";
import Reloader from "../error/Reloader";


// Компонент отображающий страницу с фильмами с\без расширенного поиска
const MoviesPage : React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        loadingStatusMovie,
        films,
        currentPage,
        optionsUrlMovie
    } = useSelector((state : {state: IState}) => state.state);

    useEffect(() => {
        optionsUrlMovie
        ? dispatch(fetchMoviesWithOptions({url : optionsUrlMovie, page: currentPage}))
        : dispatch(fetchMoviesWithOptions({url : '', page: currentPage}));

    }, [currentPage]);

    const handlerClickReboot = () => {
        optionsUrlMovie
        ? dispatch(fetchMoviesWithOptions({url : optionsUrlMovie, page: currentPage}))
        : dispatch(fetchMoviesWithOptions({url : '', page: currentPage}));
    }

    return (
        <div className='movie-page'>
            <ButtonNavigate params={'/'} direction={'На главную'}/>
            <ButtonNavigate params={'/favorites'} direction={'Избранное'}/>
            {/*Проверка на ответ с сервера, выводит прелоадер до успешного ответа, в случае ошибки выведет компонент перезагрузки страницы*/}
            {loadingStatusMovie !== "loaded"
                ? loadingStatusMovie === "failed"
                    ? <Reloader onClick={handlerClickReboot} />
                    : <Preloader/>
                : <MoviesList data={films}/>}
            <ButtonPages />

        </div>
    )
}

export default MoviesPage;