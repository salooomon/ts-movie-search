
import {IFilterOptions, IRating} from "../interface/interface";

// Функция формирования числа страниц для кнопок плагинации
export function createPages(pages, pagesCount, currentPage) {
    if(pagesCount > 10) {
        if(currentPage > 5) {
            for (let i = currentPage-4; i <= currentPage+5; i++) {
                pages.push(i)
                if(i == pagesCount) break
            }
        }
        else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i)
                if(i == pagesCount) break
            }
        }
    }  else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
}

// Функция генерирует года для фильтра поиска
export function generateArrayOfYears() {
    const nowYear = new Date().getFullYear();
    const oldYear = nowYear - 34

    const years = [];

    for(let i = oldYear; i <= nowYear; i++ ) {
        years.push(i.toString());
    }
    return years.reverse()
}

// Функция генерирует рейтинг для фильтра поиска
export function generateArrayOfRating() {
    const ratings = []
    for(let i = 1; i <= 10; i++) {
        ratings.push(i.toString());
    }
    return ratings.reverse()
}


// Функция генерирует url для запроса
export const generationUrlRequestMovies = (options : IFilterOptions) => {
    let url = ''
    if(options.genre) {
        url += `&genres.name=${options.genre}`
    }
    if (options.ratingFrom && options.ratingTo) {
        if(options.ratingFrom > options.ratingTo) {
            throw Error("Не корректный ввод рейтинга, попробуйте снова!")
        }
        url += `&rating.kp=${options.ratingFrom}-${options.ratingTo}`
    }
    if (options.yearFrom && options.yearTo) {
        if(options.yearFrom > options.yearTo) {
            throw Error("Не корректный ввод года фильма, попробуйте снова!")
        }
        url += `&year=${options.yearFrom}-${options.yearTo}`
    }

    return url
}

// Функция генерирует строку с рейтингом
export function ratingOfString(rating : IRating){
    let str = ''
    let ratingIsZero = 0
    for (let key in rating) {
        if (rating[key] !== 0) {
            if (key === "kp") {
                str += `Кинопоиск: ${rating[key]}, `
            }
            if (key === "imdb") {
                str += `IMDb: ${rating[key]}, `
            }
            if (key === "filmCritics") {
                str += `Кинокрикитики: ${rating[key]}, `
            }
            if (key === "russianFilmCritics") {
                str += `Кинокритики России: ${rating[key]}, `
            }

        }
        ratingIsZero++
        if (ratingIsZero >= 4) {
            str += '-'
        }
    }
    return str.replace(/.{1}$/, '')
}

// Функция генерирует строку жанров
export function genreOfString (genres) {
    let str = '';
    genres.map((genre) => {
        str += `${genre.name}, `
    })
    return str.replace(/.{2}$/, '')
}