import React from "react";
import { Link} from "react-router-dom";
import '../styles/NavBar.css';
//import "./NavBar.css";

const NavBar: React.FC = ({ }) => {

    return (
        <nav>
            <Link to="/">
                Inicio
            </Link>
            <Link to="/habitaciones">
                Habitaciones
            </Link>
            <Link to="/clientes">
                Clientes
            </Link>
            <Link to="/reservas">
                Reservas
            </Link>
            
        </nav>
    )
}

export default NavBar;