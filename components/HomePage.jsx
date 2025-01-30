import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <>
            <div className="container text-center">
                <h1 className="my-5">Tutti i Film che cerchi, o almeno 4/5</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem nisi consectetur quos dolores ipsa nostrum maxime, sequi rem, officia ab facere. Voluptatibus sapiente rerum sit illum laboriosam quisquam perspiciatis aspernatur.</p>
                <Link to={"movies"} className="btn btn-primary">Vedi tutti i Film</Link>
            </div>
        </>
    )
}

export default HomePage