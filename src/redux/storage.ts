import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

import {
    IState,
    IMoviesResponse,
    IFetchMovieListOfParams,
    IGenreResponse, IMoviesItem,
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
//Начальный образ состояния
const initialState : IState = dataAdapter.getInitialState({
    loadingStatusGenre: 'loading',
    loadingStatusMovie: 'loading',
    error: null,
    genreFilms: [],
    optionsUrlMovie: '',
    films: [],
    cardFilm: [],
    favoriteMovies: [],
    pages: 0,
    currentPage: 1
});

// Запрос на получение списка жанров фильмов
export const fetchGenreMovies = createAsyncThunk(
    'fetch/listMoviesGenre',
    async () => {
        const response = await instance.get('v1/movie/possible-values-by-field?field=genres.name');
        return response.data
    }
);

// Запрос на получения фильмов без параметро, используется для первичной загрузки страницы
export const fetchMovies = createAsyncThunk(
    'fetch/Movies',
    async (numPage : number) => {
        const response = await instance.get(`v1.4/movie?page=${numPage}&limit=50${selectFields}`);
        return response.data
    }
);

// Запрос на получение фильма пой ID
export const fetchMoviesByID = createAsyncThunk(
    'fetch/MoviesByID',
    async (id: number) => {
        const response = await instance.get(`v1.4/movie?${selectFields}&selectFields=rating&id=${id}`);
        return response.data
    }
);

// Запрос на получения списка фильмов c переданными параметрами фильтра\номером страницы
export const fetchMoviesWithOptions = createAsyncThunk(
    'fetch/MoviesWithOptions',
    async ({url, page} : IFetchMovieListOfParams) => {
        if (!url) {
            const response = await instance.get(`v1.4/movie?page=${page}&limit=50${selectFields}`);
            return response.data
        } else {
            const response = await instance.get(`v1.4/movie?page=${page}&limit=50${selectFields}${url}`);
            return response.data
        }
    }
);

const storageReducer = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        // Сохраняет url для запроса
        addOptionsUrlMovie(state : IState, action : PayloadAction<string>) {
            state.optionsUrlMovie = action.payload
        },
        // Сохраняет число текущей страницы
        updateCurrentPage(state: IState, action : PayloadAction<number>) {
            state.currentPage = action.payload
        },
        // Сохраняет фильм в избранное
        addFavoritesMovie(state : IState, action : PayloadAction<IMoviesItem>) {
            if (state.favoriteMovies.some(elem => elem.id === action.payload.id)) {
                alert("Такой фильм уже есть в избранном")
            } else {
                state.favoriteMovies.push(action.payload)
                alert("Фильм успешно добавлен в избранное!")
            }

        },
        // Удаляет фильм из избранного
        removeFavoriteMovie(state: IState, action : PayloadAction<number>) {
            state.favoriteMovies = state.favoriteMovies.filter((elem) => elem.id !== action.payload)
        }
    },
    extraReducers: (builder : ActionReducerMapBuilder<IState>) => {
    builder
        // Обработка запроса на получение жанров
        .addCase(fetchGenreMovies.pending, (state : IState) => {
            state.loadingStatusGenre = "loading",
            state.error = null
        })
        .addCase(fetchGenreMovies.fulfilled, (state : IState, action : PayloadAction<IGenreResponse>) => {
            state.loadingStatusGenre = "loaded"
            state.genreFilms = [...action.payload, {name : 'все', slug: 'all'}]
            state.error = null
        })
        .addCase(fetchGenreMovies.rejected, (state : IState, action : PayloadAction<string>) => {
            state.loadingStatusGenre = "failed",
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
            state.pages = action.payload.pages
            state.error = null
        })
        .addCase(fetchMoviesByID.rejected, (state : IState, action : PayloadAction<string>) => {
            state.loadingStatusMovie = "failed",
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
            state.loadingStatusMovie = "failed",
                state.error = action.payload
        })

        // Обработка запроса на получения списка фильмов с параметрами фильтра
        .addCase(fetchMoviesWithOptions.pending, (state : IState) => {
            state.loadingStatusMovie = "loading",
                state.error = null
        })
        .addCase(fetchMoviesWithOptions.fulfilled, (state : IState, action : PayloadAction<IMoviesResponse>) => {
            state.loadingStatusMovie = "loaded"
            state.films = action.payload.docs
            state.pages = action.payload.pages
            state.error = null
        })
        .addCase(fetchMoviesWithOptions.rejected, (state : IState, action : PayloadAction<string>) => {
            state.loadingStatusMovie = "failed",
            state.error = action.payload
        })
    }
})

export const {addOptionsUrlMovie, updateCurrentPage, addFavoritesMovie, removeFavoriteMovie} = storageReducer.actions
export default storageReducer.reducer
