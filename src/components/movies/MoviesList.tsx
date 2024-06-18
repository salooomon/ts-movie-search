import {Link} from "react-router-dom";
import {IDocs, IMoviesList} from "../../interface/interface";
import {stubPosterList} from "../../assets/posters";
import {changeSizeImg} from "../../assets/posters";

const MoviesList = ({data} : IDocs) => {
    return (
        <div className="block-movies">
            <ul className="list-movies">
                {data.map((movie : IMoviesList, id) => {
                    return movie.name
                            ? <li className="item-movie" key={id}>
                                <Link to={`/movies/${movie.id}`}>
                                    {<img src={
                                        movie.poster
                                        ? `${changeSizeImg(movie.poster.previewUrl || movie.poster.url)}136x204`
                                        : stubPosterList
                                    } alt="постер к фильму" />}
                                    <div className="info-movie">
                                        <h4 className="title">{movie.name}, {movie.year}</h4>
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
