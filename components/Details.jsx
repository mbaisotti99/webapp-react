import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Details = () =>{
    
    const {id} = useParams()

    const [movie, setMovie] = useState({})

    useEffect(() =>{
        axios.get(`http://localhost:3000/movies/${id}`)
        .then((resp) =>{
            setMovie(resp.data.data)
        }).finally(() =>{
            console.log(movie);
        })
    },[])

    return(
        <div className="container text-center">
            <h1>{movie.title}</h1>
            <img width={500} src={`http://localhost:3000/${movie.images}`} alt={`Immagine di ${movie.title}`} />
            <p className="my-5">{movie.abstract}</p>
            <h2>Reviews</h2>
                {(movie.reviews) && movie.reviews.map((curReview) =>{
                    return(
                        <ul className="list-unstyled my-5">
                            <li>Reviewer: {curReview.reviewer}</li>
                            <li>Vote: {curReview.vote}</li>
                            <li>Description: {curReview.text}</li>
                        </ul>
                    )
                })}
            
        </div>
    )
}

export default Details