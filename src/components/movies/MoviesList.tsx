import {Link} from "react-router-dom";
import {IDocs, IMoviesList} from "../../interface/interface";

const changeSizeImg = (str) => {
    const newStr = str.replace(/.{5}$/, "")
    return `${newStr}136x204`
}

const MoviesList = ({data} : IDocs) => {
    return (
        <div className="block-movies">
            <ul className="list-movies">
                {data.map((movie : IMoviesList, id) => {
                    return movie.name
                            ? <li className="item-movie" key={id}>
                                <Link to={`/movies/${movie.id}`}>
                                    {movie.poster && <img src={changeSizeImg(movie.poster.previewUrl)} alt="постер к фильму" />}
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
