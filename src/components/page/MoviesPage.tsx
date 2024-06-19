import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import {IState} from "../../interface/interface";
import Preloader from "../Preloader";
import MoviesList from "../movies/MoviesList";
import {useEffect} from "react";
import ButtonNavigate from "../button/ButtonNavigate";
import {fetchMoviesWithOptions} from "../../redux/storage";
import ButtonPages from "../button/ButtonPages";
import Reloader from "../error/Reloader";
import * as React from "react";

// Компнент отображающий страницу с фильмами с\без расширенного поиска
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

    return <>
        <ButtonNavigate params={'/'} direction={'На главную'}/>
        <ButtonNavigate params={'favorites'} direction={'Избранное'}/>
        {/*Проверка на ответ с сервера, выводит прелоадер до успешного ответа, в случае ошибки выведет компонент перезагрузки страницы*/}
        {loadingStatusMovie !== "loaded"
            ? loadingStatusMovie === "failed"
                ? <Reloader onClick={handlerClickReboot} />
                : <Preloader/>
            : <MoviesList data={films}/>}
        <ButtonPages />
    </>
}

export default MoviesPage;