import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import {IState} from "../../interface/interface";
import {useEffect} from "react";
import {fetchMovies} from "../../redux/storage";
import FormFilter from "../from/FormFilter";
import MoviesList from "../movies/MoviesList";
import Preloader from "../Preloader";


const IndexPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {loadingStatusMovie, films, page} = useSelector((state : {state: IState}) => state.state);

    useEffect(() => {
        dispatch(fetchMovies(page));
    }, [])

    const handlerClickReboot = () => {

    }

    return <>
        <FormFilter />
        {
            loadingStatusMovie !== "loaded"
            ? loadingStatusMovie === "failed"
                ? <div className="failed">
                    <h2>Что-то пошло не так</h2>
                    <button className="reboot" onClick={handlerClickReboot}> Перезагрузить </button>
                </div>
                : <Preloader />
            : <MoviesList  data={films}/>
        }
    </>

}

export default IndexPage;