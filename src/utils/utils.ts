
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