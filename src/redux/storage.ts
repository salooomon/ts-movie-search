import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGenreMovies, IState} from "../interface/interface";
import axios, {RawAxiosRequestHeaders} from "axios";

 const instance = axios.create({
    baseURL: 'https://api.kinopoisk.dev',
    headers: {
        'X-API-KEY' : 'TTRP2E1-VXHMAS1-PWMJCK7-V86Y6EF'
    } as RawAxiosRequestHeaders
});

const dataAdapter = createEntityAdapter();

const initialState : IState = dataAdapter.getInitialState({
    loadingStatus: false,
    error: null,
    genreFilms: []
});

export const fetchGenreMovies = createAsyncThunk(
    'fetch/listMoviesGenre',
    async () => {
        try {
            const response = await instance.get('v1/movie/possible-values-by-field?field=genres.name');
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log('Ошибка запроса списка жанров', error);
        }
    }
)

const storageReducer = createSlice({
    name: 'storage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchGenreMovies.pending, (state : IState) => {
            state.loadingStatus = false,
            state.error = null
        })
        .addCase(fetchGenreMovies.fulfilled, (state : IState, action : PayloadAction<IGenreMovies[]>) => {
            state.loadingStatus = true,
            state.genreFilms = action.payload
            state.error = null
        })
        .addCase(fetchGenreMovies.rejected, (state : IState, action : PayloadAction<string>) => {
            state.loadingStatus = false,
            state.error = action.payload
        })
    }
})

export default storageReducer.reducer
