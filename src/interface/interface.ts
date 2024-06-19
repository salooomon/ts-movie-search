// Интерфейс состояние фильтров поиска
import {fetchMoviesWithOptions} from "../redux/storage";

export interface IFilterOptions {
    genre?: string
    ratingFrom?: string
    ratingTo?: string
    yearFrom?: string
    yearTo?: string
}
// Интерфейс объекта жанров
export interface IGenresMovies{
    name: string,
    slug: string
}

// Интерфейс глобально состояния
export interface IState {
    loadingStatusGenre: string
    loadingStatusMovie: string
    error: string | null
    genreFilms: IGenresMovies[]
    optionsUrlMovie: string
    films: IMoviesList[],
    cardFilm: IMoviesList[],
    favoriteMovies: IMoviesList[],
    pages: number,
    currentPage: number

}

// Интерфейс объекта жанров
interface IGenres {
    name: string
}

// Интерфейс объекта года выпуска фильма\сериала
interface IReleaseYears {
    start: number
    end: number | null
}

//Интерфейс объекта с постерами
interface IPoster {
    url: string
    previewUrl: string
}

// Интерфейс рейтинг фильмов
export interface IRating {
    kp: number
    imdb: number
    filmCritics: number
    russianFilmCritics: number
    await: number
}

// Интерфейс объекта фильма
export interface IMoviesList {
    id: number
    name: string
    alternativeName: string,
    year: number
    description: string | null
    rating?: IRating
    poster?: IPoster
    genres: IGenres[]
    releaseYears: IReleaseYears[],
    year: number

}

// Интерфейс запроса с сервера
export interface IMoviesResponse {
    docs: IMoviesList[]
    total: number
    limit: number
    page: number
    pages: number
}

export interface IFetchMovieListOfParams {
    url?: string,
    page: number
}

export interface IGenreResponse {
    []: IGenres
}