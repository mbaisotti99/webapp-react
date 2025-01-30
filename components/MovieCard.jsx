import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { printStars } from "./Details"


const MovieCard = ({movie}) => {

    const [movieReviews, setMovieReviews] = useState([])

    useEffect(() =>{
        axios.get(`http://localhost:3000/movies/${movie.id}`)
        .then((resp) =>{
            setMovieReviews(resp.data.data.reviews)
        })
    },[])


    const voteAvg = (curMovieReviews) => {
        let asd = 0
        for (let i = 0; i < curMovieReviews.length; i++){
            asd += curMovieReviews[i].vote 
        }
        // console.log(asd);
        
        return Math.floor( asd / curMovieReviews.length)
    }
    
    return (
        <div className="card my-5">
            <img src={`http://localhost:3000/${movie.images}`} className="card-img-top cardimg" alt={`Immagine di ${movie.title}`} />
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.abstract}</p>
                    <p>Media Recensioni: {
                        (movieReviews.length !== 0) ? printStars(voteAvg(movieReviews)) : "Ancora nessuna recensione"
                        
                }</p>
                    <Link to={`/movies/${movie.id}`} className="btn btn-primary">Dettagli</Link>
                </div>
        </div>
    )
}

export default MovieCard