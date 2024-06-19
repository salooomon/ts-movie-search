import * as React from "react";
import {changeSizeImg, stubPosterCard} from "../../../assets/posters";
import {genreOfString, ratingOfString} from "../../../utils/utils";
import {IMoviesItem} from "../../../interface/interface";

interface IMovieCardItemProps {
    movie: IMoviesItem
    removeAction?: () => void
    addAction?: () => void
}
// Компонент возвращает блок фильма
const MovieCardItem: React.FC<IMovieCardItemProps> = (props) => {
    const {removeAction, addAction, movie} = props;
    const {poster, name, alternativeName, genres, rating, year, releaseYears, description} = movie;

    return(
        <div>
            <img src={
                poster
                    ? `${changeSizeImg(poster.url || poster.previewUrl)}300x450`
                    : stubPosterCard} alt="Постер к фильму"
            />
            <div className="movie-info">
                <h2 className="title">{name ?? alternativeName}</h2>
                {addAction != null && <button className="btn-add" onClick={addAction}>В Избранное</button>}
                <h3 className="info">О фильме</h3>
                <p> <b>Описание фильма:</b> {description ? description : 'Описание отсутвует'}</p>
                <p> <b>Год выпуска: </b>{Array.isArray(releaseYears) ? releaseYears[0].start : year }</p>
                <p><b>Жанр:</b> {genreOfString(genres)}</p>
                <p><b>Рейтинг:</b> {rating ? ratingOfString(rating) : 'Нет оценок'}</p>
            </div>
            {removeAction != null && <button className="btn-delete" onClick={removeAction}>Удалить</button>}
        </div>
    )
}

export default MovieCardItem;