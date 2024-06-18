import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    IDocs,
    IGenreMovies,
    IState,
    IMoviesResponse,
    IFilmGenre,
    IGenreFilms,
    IMoviesList
} from "../interface/interface";
import axios, {RawAxiosRequestHeaders} from "axios";

// Параметры для получение определенных полей
const selectFields = '&selectFields=alternativeName&selectFields=id&selectFields=year&selectFields=poster&selectFields=name&selectFields=description&selectFields=releaseYears&selectFields=genres'

 const instance = axios.create({
    baseURL: 'https://api.kinopoisk.dev',
    headers: {
        'X-API-KEY' : 'T5EG0HS-14X4AR4-JHBK0ZD-AW3E0BE'
    } as RawAxiosRequestHeaders
});

const dataAdapter = createEntityAdapter();
const initialState : IState = dataAdapter.getInitialState({
    loadingStatusGenre: 'loading',
    loadingStatusMovie: 'loading',
    error: null,
    genreFilms: [],
    optionsUrlMovie: '',
    films: [],
    cardFilm: [],
    pages: 0,
    page: 1
});

// Запрос на получение списка жанров фильмов
export const fetchGenreMovies = createAsyncThunk(
    'fetch/listMoviesGenre',
    async () => {
        const response = await instance.get('v1/movie/possible-values-by-field?field=genres.name');
        return response.data
    }
);

// Запрос на получения списка фильмов c переданными параметрами
// export const fetchMoviesWithOptions = createAsyncThunk(
//     'fetch/MoviesWithOptions',
//     async (url) => {
//
//     }
// )

// Запрос на получения фильмов без параметро, используется для первичной загрузки страницы
export const fetchMovies = createAsyncThunk(
    'fetch/Movies',
    async (numPage) => {
        const response = await instance.get(`v1.4/movie?page=${numPage}&limit=50${selectFields}`)
        return response.data
    }
);

// Запрос на получение фильма пой ID
export const fetchMoviesByID = createAsyncThunk(
    'fetch/MoviesByID',
    async (id: number) => {
        const response = await instance.get(`v1.4/movie?${selectFields}&selectFields=rating&id=${id}`)
        console.log(response.data)
        return response.data
    }
)


const storageReducer = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        addOptionsUrlMovie(state : IState, action : PayloadAction<string>) {
            state.optionsUrlMovie = action.payload
        }
    },
    extraReducers: (builder) => {
    builder
        // Обработка запроса на получение жанров
        .addCase(fetchGenreMovies.pending, (state : IState) => {
            state.loadingStatusGenre = "loading",
            state.error = null
        })
        .addCase(fetchGenreMovies.fulfilled, (state : IState, action : PayloadAction<IGenreFilms>) => {
            state.loadingStatusGenre = "loaded",
            state.genreFilms = action.payload
            state.error = null
        })
        .addCase(fetchGenreMovies.rejected, (state : IState, action : PayloadAction<string>) => {
            state.loadingStatusGenre = 'failed',
            state.error = action.payload
        })

        // Обработка запроса на получение списка фильмов
        .addCase(fetchMovies.pending, (state : IState) => {
            state.loadingStatusMovie = "loading",
            state.error = null
        })
        .addCase(fetchMovies.fulfilled, (state : IState, action : PayloadAction<IMoviesResponse>) => {
            state.loadingStatusMovie = "loaded"
            state.films = action.payload.docs
            state.page = action.payload.pages
            state.error = null
        })
        .addCase(fetchMoviesByID.rejected, (state : IState, action : PayloadAction<string>) => {
            state.loadingStatusMovie = 'failed',
            state.error = action.payload
        })

        // Обработка запроса на получения фильма по ID
        .addCase(fetchMoviesByID.pending, (state : IState) => {
            state.loadingStatusMovie = "loading",
                state.error = null
        })
        .addCase(fetchMoviesByID.fulfilled, (state : IState, action : PayloadAction<IMoviesResponse>) => {
            state.loadingStatusMovie = "loaded"
            state.cardFilm = action.payload.docs
            state.error = null
        })
        .addCase(fetchMovies.rejected, (state : IState, action : PayloadAction<string>) => {
            state.loadingStatusMovie = 'failed',
                state.error = action.payload
        })
    }
})

export const {addOptionsUrlMovie} = storageReducer.actions
export default storageReducer.reducer
