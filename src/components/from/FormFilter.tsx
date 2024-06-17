import  {useEffect, useState} from "react";
import {IFilterOptions, IState} from "../../interface/interface";
import {useDispatch, useSelector} from "react-redux";
import {addOptionsUrlMovie, fetchGenreMovies} from "../../redux/storage";
import {AppDispatch} from "../../store/store";
import Preloader from "../Preloader"

const generateArrayOfYears = () => {
    const nowYear = new Date().getFullYear();
    const oldYear = nowYear - 34

    const years = [];

    for(let i = oldYear; i <= nowYear; i++ ) {
        years.push(i.toString());
    }

    return years.reverse()
}

const generateArrayOfRating = () => {
    const ratings = []
    for(let i = 1; i <= 10; i++) {
        ratings.push(i.toString());
    }
    return ratings.reverse()
}

const generationUrlRequestMovies = (options : IFilterOptions) => {
    let url = ''
    if(options.genre) {
        url += `&genres.name=${options.genre}`
        console.log(url, 1)
    }
    if (options.ratingFrom && options.ratingTo) {
        console.log(url, 2)
        url += `&rating.kp=${options.ratingFrom}-${options.ratingTo}`
    }
    if (options.yearFrom && options.yearTo) {
        console.log(url, 3)
        url += `&year=${options.yearFrom}-${options.yearTo}`
    }

    return url
}

const FormFilter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {genreFilms, loadingStatusGenre} = useSelector((state : {state: IState}) => state.state);
    const [optionsFilter, setOptions] = useState<IFilterOptions>({genre: '', ratingFrom: '1', ratingTo: '10', yearFrom: '1990', yearTo: '2024'});

    const ratings = generateArrayOfRating();
    const years =  generateArrayOfYears();

    useEffect(() => {
        dispatch(fetchGenreMovies());
    }, []);

    function handleChange(event: React.FormEvent) {
        const target = event.target as HTMLInputElement;
        const valueToString = target.value.toString();

        const newOptions = optionsFilter
        if (target.name === "rating_from") {
            newOptions.ratingFrom = valueToString
        } else if (target.name === "rating_to") {
            newOptions.ratingTo = valueToString
        } else if (target.name === "year_from") {
            newOptions.yearFrom = valueToString
        } else if (target.name === "year_to") {
            newOptions.yearTo = valueToString
        } else if (target.name === "genre") {
            newOptions.genre = target.value
        }
        setOptions(newOptions);
    }

    function handleSubmit (event: React.FormEvent) {
        event.preventDefault();
        const url : string = generationUrlRequestMovies<string>(optionsFilter);
        console.log(url)
        dispatch(addOptionsUrlMovie(url))

    }

    const handlerClickReboot = () => {
        dispatch(fetchGenreMovies());
    }

    return (
        loadingStatusGenre !== "loaded"
        ? loadingStatusGenre === "failed"
            ? <div className="failed">
                <h2>Что-то пошло не так</h2>
                <button className="reboot" onClick={handlerClickReboot}> Перезагрузить </button>
            </div>
            : <Preloader />
       : <div>
            <form onSubmit={handleSubmit}>
                <label onChange={handleChange}>
                    Жанр:
                    <select name="genre" required>
                        {genreFilms.map((genre, id) => {
                            return <option key={id} value={genre.name} selected>{genre.name}</option>
                        })}
                    </select>
                </label>
                <label onChange={handleChange}>
                    Рейтинг:
                    от :
                    <select name="rating_from" required>
                        {ratings.map((rating, id) => {
                            return <option key={id} value={rating} selected>{rating}</option>
                        })}
                    </select>

                    до :
                    <select name="rating_to" required>
                        {ratings.reverse().map((rating, id) => {
                            return <option key={id} value={rating} selected>{rating}</option>
                        })}
                    </select>
                </label>
                <label onChange={handleChange}>
                    Год выхода:
                    от :
                    <select name="year_from" required>
                        {years.map((year, id) => {
                            return <option key={id} value={year} selected>{year}</option>
                        })}
                    </select>

                    до :
                    <select name="year_to" required>
                        {years.reverse().map((year, id) => {
                            return <option key={id} value={year} selected>{year}</option>
                        })}
                    </select>
                </label>

                <button type="submit">Поиск</button>
            </form>
        </div>
    )
}

export default FormFilter;