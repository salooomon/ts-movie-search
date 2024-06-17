export interface IFilterOptions {
    genre?: string
    ratingFrom?: string
    ratingTo?: string
    yearFrom?: string
    yearTo?: string
}

export interface IGenreMovies {
    name: string,
    slug: string
}

export interface IGenreFilms {
    []: IGenreMovies
}

export interface IState {
    loadingStatusGenre: string
    loadingStatusMovie: string
    error: string | null
    genreFilms: IGenreFilms
    optionsUrlMovie: string
    films: IDocs,
    pages: number,
    page

}

interface IGenres {
    name: string
}

interface IReleaseYears {
    start: number
    end: number | null
}

interface IPoster {
    url: string
    previewUrl: string
}

export interface IMoviesList {
    id: number
    name: string
    year: number
    description: string | null
    poster?: IPoster
    genres: IGenres[]
    releaseYears: IReleaseYears[]

}

export interface IDocs {
    []: IMoviesList
}

export interface IMoviesResponse {
    docs:IMoviesList[]
    total: number
    limit: number
    page: number
    pages: number
}

