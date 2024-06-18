import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import {IState} from "../../interface/interface";
import {useEffect} from "react";
import {fetchMovies, updateCurrentPage} from "../../redux/storage";
import FormFilter from "../from/FormFilter";
import MoviesList from "../movies/MoviesList";
import Preloader from "../Preloader";
import ButtonPages from "../button/ButtonPages";
import Reloader from "../error/Reloader";
import * as React from "react";

// Компонент главной страници
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
        <FormFilter />
        {
            loadingStatusMovie !== "loaded"
            ? loadingStatusMovie === "failed"
                ? <Reloader onClick={handlerClickReboot} />
                : <Preloader />
            : <MoviesList  data={films}/>
        }
        <ButtonPages />
    </>

}

export default IndexPage;