export interface IFilterOptions {
    genre?: string,
    rating?: string,
    releaseDate?: string
}

export interface IGenreMovies {
    name: string,
    slug: string
}

export interface IState {
    loadingStatus: boolean,
    error: string | null,
    genreFilms: IGenreMovies[]
    // films: [],
    // optionsFilter: IFilterOptions
}



