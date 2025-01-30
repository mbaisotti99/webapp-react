import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../pages/Layout"
import HomePage from "../components/HomePage"
import Movies from "../components/Movies"
import "bootstrap/dist/css/bootstrap.min.css"
import {Details} from "../components/Details"
import AddMoviePage from "../components/AddMoviePage"
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout/>} >
        <Route path="/" element={<HomePage/>} />
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/movies/:id" element={<Details/>}/>
        <Route path="/movies/add" element={<AddMoviePage/>} />
      </Route>
    </Routes>
  </BrowserRouter>)
}

export default App
