import * as React from "react";
import {Link} from "react-router-dom";
import { IMoviesItem} from "../../interface/interface";
import {stubPosterList} from "../../assets/posters";
import {changeSizeImg} from "../../assets/posters";

// Компонент выводит список фильмов
const MoviesList: React.FC = ({data} : IMoviesItem[]) => {
    return (
        <div className="block-movies">
            <ul className="list-movies">
                {data.map((movie : IMoviesItem, id) => {
                    return movie.name || movie.alternativeName
                            ? <li className="item-movie" key={id}>
                                <Link to={`/movies/${movie.id}`}>
                                    {<img src={
                                        movie.poster
                                            ? `${changeSizeImg(movie.poster.previewUrl || movie.poster.url)}136x204`
                                            : stubPosterList
                                    } alt="постер к фильму" />}
                                    <div className="info-movie">
                                        <h4 className="title">{movie.name ? movie.name : movie.alternativeName}, {movie.year}</h4>
                                    </div>
                                </Link>
                            </li>
                            : ''
                })}
            </ul>
        </div>
    )
}

export default  MoviesList;
