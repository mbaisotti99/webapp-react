import { NavLink } from "react-router-dom"

const NavBar = () => {
    const navLinks = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Movies",
            path: "/movies"
        }
    ]
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">BoolMovies</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navLinks.map((curLink) => {
                            return (
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to={curLink.path}>{curLink.name}</NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar