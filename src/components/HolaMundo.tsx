import '../styles/HolaMundo.css';
const HolaMundo: React.FC = () => {
    return (
        <div id="containerHM">
            <h1 id="tituloHM">Bienvenidos a nuestro Hotel</h1>
            <p id="descripcionHM">
                Disfruta de una estancia inolvidable con nosotros. Ofrecemos comodidad, calidad y el mejor servicio para que tu experiencia sea única.
            </p>

            <h2 id="subtituloHM">Nuestro Equipo</h2>
            <ul id="listaHM">
                
                <li id="integranteHM">Flavio Mauricio Ordoñez Montero</li>
                <li id="integranteHM">Carlos Eduardo Cantuña Cela</li>
                <li id="integranteHM">Pool Fernando Chinche Cordovillo</li>
            </ul>
        </div>
    );
};

export default HolaMundo;
