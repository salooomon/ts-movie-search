import {MouseEventHandler} from "react";
import * as React from "react";

interface IReloader {
    handlerClickReboot: MouseEventHandler<HTMLButtonElement>
}

const Reloader : React.FC<IReloader> = ({handlerClickReboot}) => {
    return(
        <div className="failed">
            <h2>Что-то пошло не так</h2>
            <button className="reboot" onClick={handlerClickReboot}> Перезагрузить </button>
        </div>
    )
}

export default Reloader;