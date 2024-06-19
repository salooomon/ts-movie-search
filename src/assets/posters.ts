// Заглушка для постеров списка
export const stubPosterList = 'https://dummyimage.com/136x204/000/fff.png&text=%D0%BD%D0%B5%D1%82+%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F'
// Заглушка для страницы фильма
export const stubPosterCard = 'https://dummyimage.com/300x450/000/fff.png&text=%D0%BD%D0%B5%D1%82+%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F'

// Функция изменя размер исходного постреа, в зависимости от окончания исходной строки вернет ее без лишнего окончания
export const changeSizeImg = (str) => {
    const newStr = str.endsWith('x1000') ? str.replace(/.{5}$/, "") : str.replace(/.{4}$/, "")
    return `${newStr}`
}