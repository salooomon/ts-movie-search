// Интерфейс состояние фильтров поиска
export interface IFilterOptions {
    genre?: string
    ratingFrom?: string
    ratingTo?: string
    yearFrom?: string
    yearTo?: string
}
// Интерфейс объекта жанров
export interface IGenresMovies {
    name: string,
    slug: string
}

// Интерфейс списка жанров
export interface IGenreFilms {
    []: IGenresMovies
}

// Интерфейс глобально состояния
export interface IState {
    loadingStatusGenre: string
    loadingStatusMovie: string
    error: string | null
    genreFilms: IGenreFilms
    optionsUrlMovie: string
    films: IMoviesList[],
    cardFilm: IMoviesList[],
    pages: number,
    page: number

}

// Интерфейс жанров фильма
export interface IFilmGenre {
    []: IGenres
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
    releaseYears: IReleaseYears[]

}

// Интерфейс списка фильмов
export interface IDocs {
    []: IMoviesList
}

// Интерфейс запроса с сервера
export interface IMoviesResponse {
    docs: IDocs
    total: number
    limit: number
    page: number
    pages: number
}

