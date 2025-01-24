const MovieCard = (movie) => {
    
    return (
        <div className="card my-5">
            <img src={`http://localhost:3000/${movie.movie.images}`} className="card-img-top cardimg" alt={`Immagine di ${movie.title}`} />
                <div className="card-body">
                    <h5 className="card-title">{movie.movie.title}</h5>
                    <p className="card-text">{movie.movie.abstract}</p>
                </div>
        </div>
    )
}

export default MovieCard