import { Link } from "react-router-dom"

const MovieCard = ({movie}) => {
    
    return (
        <div className="card my-5">
            <img src={`http://localhost:3000/${movie.images}`} className="card-img-top cardimg" alt={`Immagine di ${movie.title}`} />
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.abstract}</p>
                    <Link to={`/movies/${movie.id}`} className="btn btn-primary">Dettagli</Link>
                </div>
        </div>
    )
}

export default MovieCard