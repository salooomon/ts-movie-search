import * as React from "react";
import ButtonNavigate from "../button/ButtonNavigate";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../interface/interface";
import {changeSizeImg, stubPosterCard} from "../../assets/posters";
import {genreOfString, ratingOfString} from "../../utils/utils";
import {removeFavoriteMovie} from "../../redux/storage";
import {AppDispatch} from "../../store/store";


// Компонент страницы с избранными фильмами
const FavoritesMovies : React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {favoriteMovies, currentPage} = useSelector((state : {state: IState}) => state.state);

    const handlerClickRemove = (event : React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const {id} = target.parentNode as HTMLFormElement;
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
                        return <li className="item-movie" key={i} id={movie.id}>
                            <img src={
                                movie.poster
                                    ? `${changeSizeImg(movie.poster.url || movie.poster.previewUrl)}300x450`
                                    : stubPosterCard} alt="Постер к фильму"
                            />
                            <div className="movie-info">
                                <h2 className="title">{movie.name}</h2>
                                <h3 className="info">О фильме</h3>
                                <p> <b>Описание фильма:</b> {movie.description ? movie.description : 'Описание отсутвует'}</p>
                                <p> <b>Год выпуска: </b>{Array.isArray(movie.releaseYears) ? movie.releaseYears[0].start : movie.year }</p>
                                <p><b>Жанр:</b> {genreOfString(movie.genres)}</p>
                                <p><b>Рейтинг:</b> {movie.rating ? ratingOfString(movie.rating) : 'Нет оценок'}</p>
                            </div>
                            <button className="btn-delete" onClick={handlerClickRemove}>Удалить</button>
                        </li>
                    })}
                </ul>
            }
        </div>
    )
}

export default FavoritesMovies;