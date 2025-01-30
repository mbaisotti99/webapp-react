import axios from "axios"
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { Link } from "react-router-dom"

const Movies = () => {

    const [movies, setMovies] = useState([])
    const [genre, setGenre] = useState("")
    const [filteredArr, setFiltered] = useState([])
    const [search, setSearch] = useState("")
    const [searchBy, setSearchBy] = useState("title")

    let genreArrDupes = []

    useEffect(() => {
        axios.get("http://localhost:3000/movies").then((resp) => {
            // console.log(resp.data.data);   
            setMovies(resp.data.data)
        })
    }, [])

    useEffect(() => {
        setFiltered([...movies])
    }, [movies])

    useEffect(() => {
        setFiltered(
            movies.filter((curMovie) => {
                return (curMovie.genre.includes(genre))
            }))
    }, [genre])

    const onSearchType = (event) => {
        setSearch(event.target.value)
        // console.log(search);

    }

    const onSearch = (event) => {
        event.preventDefault()
        // const params = {search}
        axios.get("http://localhost:3000/movies", { params: { [searchBy]: search } })
            .then((resp) => {
                console.log(resp);
                setFiltered(resp.data.data)
            })
    }

    const onFilterChange = (event) => {
        setSearchBy(event.target.value)
    }

    // const getKeys = () => {
    //     let arr = []
    //     for (let key in movies[0]) {
    //         arr.push(key)
    //     }
    //     return (
    //         arr.map((curKey) => <option value={curKey}>{curKey}</option>)
    //     )
    // }

    return (
        <>
            <div className="container">
                <div className="text-center">
                    <h1 className="mb-5">I film</h1>
                    <Link to={"add"} className="btn btn-primary mb-5">Aggiungi un film</Link>
                    <h2 className="mb-3">Filtra per genere:</h2>
                    <select className="form-control text-center fs-3 mb-5" aria-label="Filtra per Genere" value={genre} onChange={(event) => {
                        setGenre(event.target.value)
                    }}>
                        <option value="">Tutti</option>
                        {movies.map((curMovie, i) => {
                            if (!genreArrDupes.includes(curMovie.genre)) {
                                genreArrDupes.push(curMovie.genre)
                                return (
                                    <option key={i} value={curMovie.genre}>{curMovie.genre}</option>
                                )
                            }
                        })}
                    </select>
                    <form onSubmit={onSearch}>
                        <h2 className="mb-3" htmlFor="search">Cerca</h2>
                        <div className="d-flex mb-3">
                            <input type="text" name="search" id="search" className="form-control mb-3" value={search} onChange={onSearchType}></input>
                            <select name="searchFilter" id="searchFilter" className="form-control" onChange={onFilterChange}>
                                <option value={"title"}>Titolo</option>
                                <option value={"release_year"}>Anno</option>
                                <option value={"director"}>Regista</option>
                            </select>

                        </div>
                        <button type="submit" className="btn btn-primary">Cerca</button>
                    </form>
                </div>
                <ul className="row">
                    {
                        filteredArr.map((curMovie, i) => {
                            return (
                                // <li key={curMovie.id}>{curMovie.title}</li>
                                <div className="col-6" key={i}>
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