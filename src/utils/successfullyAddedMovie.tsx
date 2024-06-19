import * as React from "react";

// Компонент возвращает оповещение о добавление фильма
const SuccessfullyAddedMovie : React.FC = () => {
    return (
        <div className='successfully-added'>
            <p>Фильм успешно добавлен</p>
        </div>
    )
}

export default SuccessfullyAddedMovie