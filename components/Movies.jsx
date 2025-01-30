import axios from "axios"
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { Link } from "react-router-dom"

const Movies = () => {

    const [movies, setMovies] = useState([])
    const [genre, setGenre] = useState("")
    const [filteredArr, setFiltered] = useState([])
    let genreArrDupes = []

    useEffect(() => {
        axios.get("http://localhost:3000/movies").then((resp) => {
            // console.log(resp);   
            setMovies(resp.data.data)
        })
    }, [])
    
    useEffect(() =>{
        setFiltered([...movies])
    },[movies])

    useEffect(() =>{
        setFiltered(
            movies.filter((curMovie) => {
            return (curMovie.genre.includes(genre))
        }))
    }, [genre])

    return (
        <>
            <div className="container">
                <h1>I film</h1>
                <Link to={"add"} className="btn btn-primary">Aggiungi un film</Link>
                <h2>Filtra per genere:</h2>
                <select className="form-control" aria-label="Filtra per Genere" value={genre} onChange={(event) => {
                    setGenre(event.target.value)
                }}>
                    <option value="">Tutti</option>
                    {movies.map((curMovie) => {
                        if (!genreArrDupes.includes(curMovie.genre)){
                            genreArrDupes.push(curMovie.genre)
                            return (
                                <option value={curMovie.genre}>{curMovie.genre}</option>
                            )
                        }
                    })}
                </select>
                <ul className="row">
                    {
                        filteredArr.map((curMovie) => {
                            return (
                                // <li key={curMovie.id}>{curMovie.title}</li>
                                <div className="col-6">
                                    {/* <h1>{curMovie.id}</h1> */}
                                    <MovieCard movie={curMovie} />
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Movies