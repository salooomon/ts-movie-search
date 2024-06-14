import {useEffect, useState} from "react";
import {IFilterOptions, IGenreMovies} from "../../interface/interface";
import {useDispatch, useSelector} from "react-redux";
import {fetchGenreMovies} from "../../redux/storage";
import {Dispatch} from "redux";
import {AppDispatch} from "../../store/store";

const generateArrayOfYears = () => {
    const nowYear = new Date().getFullYear();
    const oldYear = nowYear - 34

    const years = [];

    for(let i = oldYear; i <= nowYear; i++ ) {
        years.push(i.toString());
    }
    console.log(years)
    return years
}

const generateArrayOfRating = () => {
    const ratings = []
    for(let i = 0; i <= 10; i++) {
        ratings.push(i.toString());
    }
    return ratings
}

const FormFilter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const genres = useSelector((state : {state: {genreFilms: IGenreMovies[] }}) => state.state.genreFilms);
    // const [optionsFilter, setOptions] = useState<IFilterOptions>({genre: '', rating: '', releaseDate: ''});

    const ratings = generateArrayOfRating();
    const years =  generateArrayOfYears();

    useEffect(() => {
        dispatch(fetchGenreMovies())
    }, [])

    return (
        <form>
            <label>
                Жанр:
                <select name="genre" required>
                    {genres.map((genre, id) => {
                        return <option key={id} value={genre.slug} selected>{genre.name}</option>
                    })}
                </select>
            </label>
            <label>
                Рейтинг:
                от :
                <select name="genre" required>
                    {ratings.map((rating, id) => {
                        return <option key={id} value={rating} selected>{rating}</option>
                    })}
                </select>

                до :
                <select name="genre" required>
                    {ratings.map((rating, id) => {
                        return <option key={id} value={rating} selected>{rating}</option>
                    })}
                </select>
            </label>
            <label>
                Год выхода:
               от :
                <select name="genre" required>
                    {years.map((year, id) => {
                        return <option key={id} value={year} selected>{year}</option>
                    })}
                </select>

                до :
                <select name="genre" required>
                    {years.map((year, id) => {
                        return <option key={id} value={year} selected>{year}</option>
                    })}
                </select>
            </label>

            <button type="submit">Поиск</button>
            {/*<button type="button" onClick={() => navigate('/favorites')}>Избранное</button>*/}
        </form>
    )
}

export default FormFilter;