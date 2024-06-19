import * as React from "react";
import ButtonNavigate from "../button/ButtonNavigate";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../interface/interface";
import {changeSizeImg, stubPosterCard} from "../../assets/posters";
import {genreOfString, ratingOfString} from "../../utils/utils";
import {removeFavoriteMovie} from "../../redux/storage";
import {AppDispatch} from "../../store/store";
import MovieCardItem from "./item/MovieCardItem";


// Компонент страницы с избранными фильмами
const FavoritesMovies : React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {favoriteMovies, currentPage} = useSelector((state : {state: IState}) => state.state);

    const handlerClickRemove = (id) => {
        const idToNumber = parseInt(id);
        dispatch(removeFavoriteMovie(idToNumber));
    }

    return (
        <div className="favorite">
            <ButtonNavigate params={currentPage ? '/movies': '/'} direction={'Назад'}/>
            {favoriteMovies.length === 0
                ? <div className="missing"><p>Нет избранных фильмов</p></div>
                :<ul className="favorite-movies">
                    {favoriteMovies.map((movie , i) => {
                        return <MovieCardItem movie={movie} removeAction={() => handlerClickRemove(movie.id)} key={i}/>
                    })}
                </ul>
            }
        </div>
    )
}

export default FavoritesMovies;