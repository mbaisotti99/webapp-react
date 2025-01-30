import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const initialValues = {
    name: "",
    vote: "",
    text: 0
}

const printStars = (n) =>{
    let count = ""
    for (let i = 0; i < n; i++){
        count += "⭐"
    }
    return count
  }

const Details = () =>{
    
    const getMovie = () =>{
        axios.get(`http://localhost:3000/movies/${id}`)
        .then((resp) =>{
            setMovie(resp.data.data)
        })
    }
    
    const {id} = useParams()

    const [movie, setMovie] = useState({})

    const [review, setReview] = useState(initialValues)

    const handleChange = (event) =>{
        const {value, name} = event.target 
        
        let newFormData = {...review}
        newFormData[name] = value 
        setReview(newFormData)
        // console.log(review);
        
    }


    const handleSubmit = () =>{
        axios.post(`http://localhost:3000/movies/${id}/review`, review)
        .then((resp) =>{
            // console.log(resp);
            getMovie()
        })
    }

    useEffect(() =>{
        getMovie()
    },[])

    // const numbers = Array.from({ length: 5 }, (_, i) => i + 1);
    const stars = Array.from({ length: 5 }, (_, i) => (
        "⭐".repeat(i + 1)
      ));

      

    return(
        <div className="container text-center">
            <h1 className="my-5" >{movie.title}</h1>
            <img width={500} src={`http://localhost:3000/${movie.images}`} alt={`Immagine di ${movie.title}`} />
            <p className="my-5">{movie.abstract}</p>
            <h2>Reviews</h2>
                {(movie.reviews) && movie.reviews.map((curReview, i) =>{
                    return(
                        <ul className="list-unstyled my-5" key={i}>
                            <li>Reviewer: {curReview.name}</li>
                            <li>Vote: {printStars(curReview.vote)}</li>
                            <li>Description: {curReview.text}</li>
                        </ul>
                    )
                })}
            <form onSubmit={(event) =>{
                event.preventDefault();
                handleSubmit()}}>
                <h2 className="mb-3">Username:</h2>
                <input className="form-control mb-5" type="text" id="user" name="name" onChange={handleChange}/>
                <h2>Vote:</h2> 
                <select className="form-control text-center fs-2 mb-5" id="vote" name="vote" onChange={handleChange}>
                    {stars.map((curNum, i) =>
                    <option key={i} value={i + 1}>{curNum}</option>
                    )}
                </select>
                <h2 className="mb-3">Text:</h2>
                <textarea className="form-control mb-5" type="text" id="text" name="text" onChange={handleChange}/>
                <br />
                <button type="submit" className="btn btn-primary mb-5">Aggiungi Recensione</button>
            </form>
        </div>
    )
}

export {Details, printStars}
