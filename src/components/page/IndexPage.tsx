import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {fetchMovies, updateCurrentPage} from "../../redux/storage";
import {AppDispatch} from "../../store/store";
import {IState} from "../../interface/interface";
import FormFilter from "../from/FormFilter";
import MoviesList from "../movies/MoviesList";
import Preloader from "../Preloader";
import ButtonPages from "../button/ButtonPages";
import Reloader from "../error/Reloader";
import ButtonNavigate from "../button/ButtonNavigate";

// Компонент главной страницы
const IndexPage : React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {loadingStatusMovie, films, currentPage} = useSelector((state : {state: IState}) => state.state);

    useEffect(() => {
        dispatch(updateCurrentPage(1));
        dispatch(fetchMovies(currentPage));
    }, [])

    const handlerClickReboot = () => {
        dispatch(fetchMovies(currentPage));
    }


    return <>
        <ButtonNavigate params={'/favorites'} direction={'Избранное'}/>
        <FormFilter />

        {/*//Проверка на ответ с сервера, выводит прелоадер до успешного ответа, в случае ошибки выведет компонент перезагрузки страницы*/}
        {loadingStatusMovie !== "loaded"
            ? loadingStatusMovie === "failed"
                ? <Reloader onClick={handlerClickReboot} />
                : <Preloader />
            : <MoviesList  data={films}/>}
        <ButtonPages />
    </>

}

export default IndexPage;