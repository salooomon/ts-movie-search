import './App.css'
import { Routes, Route} from 'react-router-dom';
import IndexPage from "./components/page/IndexPage";
import MovieCard from "./components/movies/MovieCard"


function App() {

  return (
        <Routes>
            <Route path='/' element={<IndexPage />}/>
            <Route path='/movies/:id' element={<MovieCard />}/>
        </Routes>
  )
}

export default App
