import * as React from "react";
import { useNavigate } from "react-router-dom";

interface IButtonNavigate {
    params: string
    direction: string
}
// Компонент принимает параметр навигации и описание для кнопки
const ButtonNavigate : React.FC<IButtonNavigate> = ({params, direction}) => {
    const navigate = useNavigate();
    return(
        <button className="btn" onClick={() => navigate(params)}>{direction}</button>
    )
}

export default ButtonNavigate;