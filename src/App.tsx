import './App.css'
import { Routes, Route} from 'react-router-dom';
import IndexPage from "./components/page/IndexPage";
import MovieCard from "./components/movies/MovieCard"
import MoviesPage from "./components/page/MoviesPage";
import FavoritesMovies from "./components/movies/FavoritesMovies";


function App() {

  return (
        <Routes>
            <Route path='/' element={<IndexPage />}/>
            <Route path='/favorites' element={<FavoritesMovies />}/>
            <Route path='/movies' element={<MoviesPage />}/>
            <Route path='/movies/:id' element={<MovieCard />}/>
        </Routes>
  )
}

export default App
