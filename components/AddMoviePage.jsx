import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const AddMoviePage = () => {

    const navigate = useNavigate()

    const initialFormData = {
        title: "",
        director: "",
        abstract: "",
        images: null
    }

    const [data, setData] = useState({ ...initialFormData })

    const handleChange = (event) => {
        let newArr = { ...data }
        const { name, value } = event.target
        if (name === "images") {
            const imgName = event.target.files[0]
            newArr = {
                ...data,
                images: imgName
            }
        } else {
            newArr[name] = value
        }
        setData(newArr)
        console.log(data);

    }

    const handleSub = (event) => {
        event.preventDefault()

        const dataToSend = new FormData()
        // for (let key in data) {
        //     dataToSend.append(key, data[key])
        // }
        dataToSend.append("title", data.title)
        dataToSend.append("director", data.director)
        dataToSend.append("abstract", data.abstract)
        dataToSend.append("genre", data.genre)
        if (data.images) {
            dataToSend.append("images", data.images)
        }
        axios
            .post("http://localhost:3000/movies/add", dataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then((resp) => {
                console.log(resp);
            })

        navigate("/movies")
    }


    return (
        <div className="container">
            <h1>Aggiungi un film</h1>
            <form onSubmit={handleSub}>
                <label htmlFor="title">Titolo:</label>
                <input value={data.title} className="form-control mb-3" type="text" name="title" id="title" onChange={handleChange} />

                <label htmlFor="director">Regista:</label>
                <input value={data.director} className="form-control mb-3" type="text" name="director" id="director" onChange={handleChange} />

                <label htmlFor="abstract">Descrizione:</label>
                <input value={data.abstract} className="form-control mb-3" type="text" name="abstract" id="abstract" onChange={handleChange} />

                <label htmlFor="images">Immagine di copertina:</label>
                <input className="form-control mb-5" type="file" name="images" id="images" onChange={handleChange} />

                <button className="btn btn-primary" type="submit">Crea Libro</button>
            </form>
        </div>
    )
}

export default AddMoviePage