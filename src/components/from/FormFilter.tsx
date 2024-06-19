import {useEffect, useState} from "react";
import {IFilterOptions, IState} from "../../interface/interface";
import {useDispatch, useSelector} from "react-redux";
import {addOptionsUrlMovie, fetchGenreMovies} from "../../redux/storage";
import {AppDispatch} from "../../store/store";
import { useNavigate } from "react-router-dom";
import Preloader from "../Preloader";
import {generateArrayOfRating, generateArrayOfYears, generationUrlRequestMovies} from "../../utils/utils";
import Reloader from "../error/Reloader";
import * as React from "react";

//Компонент фромы фильтров (жанр, рейтинг, год)
const FormFilter : React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {genreFilms, loadingStatusGenre} = useSelector((state : {state: IState}) => state.state);
    const [optionsFilter, setOptions] = useState<IFilterOptions>({
        genre: '',
        ratingFrom: '1',
        ratingTo: '10',
        yearFrom: '1990',
        yearTo: '2024'
    });

    const ratings = generateArrayOfRating();
    const years =  generateArrayOfYears();

    useEffect(() => {
        dispatch(fetchGenreMovies());
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            newOptions.genre = target.value === 'все' ? '' : target.value
        }
        setOptions(newOptions);
    }

    const handleSubmit = (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const url : string = generationUrlRequestMovies<string>(optionsFilter);
            dispatch(addOptionsUrlMovie(url));
            navigate(`/movies`);
        } catch (error) {
            alert(error)
        }
    }

    const handlerClickReboot = () => {
        dispatch(fetchGenreMovies());
    }

    return (
        //Проверка на ответ с сервера, выводит прелоадер до успешного ответа, в случае ошибки выведет компонент перезагрузки страницы
        loadingStatusGenre !== "loaded"
        ? loadingStatusGenre === "failed"
            ? <Reloader onClik={handlerClickReboot} />
            : <Preloader />
       : <div>
            <form onSubmit={handleSubmit}>
                <label onChange={handleChange}>
                    <span className='text-label'>Жанр:</span>
                    <select name="genre" required>
                        {genreFilms.map((genre, id) => {
                            return <option key={id} value={genre.name} selected>{genre.name}</option>
                        })}
                    </select>
                </label>
                <label onChange={handleChange}>
                    <span className='text-label'>Рейтинг от:</span>
                    <select name="rating_from" required>
                        {ratings.map((rating, id) => {
                            return <option key={id} value={rating} selected>{rating}</option>
                        })}
                    </select>
                    <span className='text-label'>до:</span>
                    <select name="rating_to" required>
                        {ratings.reverse().map((rating, id) => {
                            return <option key={id} value={rating} selected>{rating}</option>
                        })}
                    </select>
                </label>
                <label onChange={handleChange}>
                    <span className='text-label'>Год выхода от:</span>
                    <select name="year_from" required>
                        {years.map((year, id) => {
                            return <option key={id} value={year} selected>{year}</option>
                        })}
                    </select>
                    <span className='text-label'>до:</span>
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