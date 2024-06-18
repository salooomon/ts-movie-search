import {useDispatch, useSelector} from "react-redux";
import {createPages} from "../../utils/utils";
import {IState} from "../../interface/interface";
import {AppDispatch} from "../../store/store";
import { useNavigate } from "react-router-dom";
import {updateCurrentPage} from "../../redux/storage";

// Компонент кнопок пагинации
const ButtonPages = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {currentPage, pages}  = useSelector((state : {state: IState}) => state.state);

    const arrayPages = []

    // Функция принимает массив страниц, общее число страниц, нынешнюю страницу
    // После перехода на 10 страницу добавляет новые страницы
    createPages(arrayPages, pages, currentPage);

    const handlerClick = (page) => {
        navigate(`/movies/`)
        dispatch(updateCurrentPage(page));
    }

    return (
        <div className="pages">
            {arrayPages.map((page,i) => <span
                key={i}
                className={page === currentPage ? "current-page" : "page"}
                onClick={() => handlerClick(page)}
            >{page}</span>) }
        </div>
    )
}

export default ButtonPages;