import * as React from "react";
import {useDispatch, useSelector} from "react-redux";

import {removeFavoriteMovie} from "../../redux/storage";
import {AppDispatch} from "../../store/store";
import {IState} from "../../interface/interface";
import MovieCardItem from "./item/MovieCardItem";
import ButtonNavigate from "../button/ButtonNavigate";

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
            <ButtonNavigate params={currentPage !== 1 ? '/movies': '/'} direction={'Назад'}/>
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