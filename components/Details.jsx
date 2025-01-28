import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const initialValues = {
    name: "",
    vote: "",
    text: 0
}

const Details = () =>{
    
    const {id} = useParams()

    const [movie, setMovie] = useState({})

    const [review, setReview] = useState(initialValues)

    const handleChange = (event) =>{
        const {value, name} = event.target 
        
        let newFormData = {...review}
        newFormData[name] = value 
        setReview(newFormData)
        console.log(review);
        
    }

    const getMovie = () =>{
        axios.get(`http://localhost:3000/movies/${id}`)
        .then((resp) =>{
            setMovie(resp.data.data)
        }).finally(() =>{
            console.log(movie);
        })
    }

    const handleSubmit = () =>{
        axios.post(`http://localhost:3000/movies/${id}/review`, review)
        .then((resp) =>{
            console.log(resp);
            getMovie()
        })
    }

    useEffect(() =>{
        getMovie()
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
            <form onSubmit={(event) =>{
                event.preventDefault();
                handleSubmit()}}>
                <h2>Username:</h2>
                <input type="text" id="user" name="name" onChange={handleChange}/>
                <h2>Vote:</h2> 
                <select id="vote" name="vote" onChange={handleChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <h2>Text:</h2>
                <input type="text" id="text" name="text" onChange={handleChange}/>
                <br />
                <button type="submit" className="btn btn-primary">Aggiungi Recensione</button>
            </form>
        </div>
    )
}

export default Details 