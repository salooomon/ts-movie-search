import { useNavigate } from "react-router-dom";
import * as React from "react";
interface IButtonNavigate {
    params: string
    direction: string
}

const ButtonNavigate : React.FC<IButtonNavigate> = ({params, direction}) => {
    const navigate = useNavigate();
    console.log(params, direction)

    return(
        <button className="btn" onClick={() => navigate(params)}>{direction}</button>
    )
}

export default ButtonNavigate