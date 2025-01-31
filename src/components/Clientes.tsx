import { useState } from "react";
import '../styles/Clientes.css';
type Cliente = {
    id: number;
    nombre: string;
    correo: string;    
}
type ClienteProps = {
    clientes: Cliente[];
    setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
}

// Función para validar el correo electrónico usando una expresión regular
const validarCorreo = (correo: string): boolean => {
    // Expresión regular básica para validar un correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
};

//localStorage es una api del navegador
const Clientes: React.FC<ClienteProps> = ({ clientes, setClientes }) => {

    const [nombreCliente, setnombreCliente] = useState<string>("");
    const [correoCliente, setcorreoCliente] = useState<string>("");
    const [ClienteEditando, setClienteEditando] = useState<Cliente | null>(null); // Estado para habitación en edición
    
    const agregarCliente = () => {
        if (nombreCliente.trim() !== "" && correoCliente.trim() !== "" ) {
            if(!validarCorreo(correoCliente)){
                alert("Por favor, ingresa un correo válido");
                return;
            }
            setClientes([...clientes,
            { id:clientes.length + 1,                
                nombre:nombreCliente,
                correo:correoCliente,                
            }]);//tpo=suite, individual,doble            
            setnombreCliente("");
            setcorreoCliente("");            
        } else {
            alert("EL nombre y el correo son obligatorios");
        }
    }

    const eliminar = (id: number) => {
        setClientes(
            clientes.filter((cli) => cli.id !== id)
        );
    }
    // Función para editar la habitación
  const actualizar = () => {
    if (ClienteEditando) {
        if(!validarCorreo(correoCliente)){
            alert("Por favor, ingresa un correo válido");
            return;
        }

        const clientesActualizado = clientes.map((cliente) =>
        cliente.id === ClienteEditando.id
          ? { ...cliente, nombre: nombreCliente, correo: correoCliente }
          : cliente
      );
      setClientes(clientesActualizado);
      setClienteEditando(null); // Limpiar el estado de edición
      setnombreCliente("");
      setcorreoCliente("");
    }
  };

  // Función para cargar los datos de la habitación seleccionada en los campos de entrada
  const editarCliente = (Cliente: Cliente) => {
    setClienteEditando(Cliente);
    setnombreCliente(Cliente.nombre);
    setcorreoCliente(Cliente.correo);
  };

    return (
        <div id ="container">
            <h1 id="h1C">Registro de Clientes</h1>
            <input id ="inputC"
                type="text"
                placeholder="nombre: ejm. individual "
                value={nombreCliente}
                onChange={(e) => setnombreCliente(e.target.value)}
            />
            <input id ="inputC"
                type="email"
                placeholder="correo "
                value={correoCliente}
                onChange={(e) => setcorreoCliente(e.target.value)}
            />

            {ClienteEditando ? (
            <button id ="botonC" onClick={actualizar}>Actualizar</button> // Botón de actualización
             ) : (
             <button id ="botonC" onClick={agregarCliente}>Agregar</button> // Botón de agregar
             )}

            <h3 id ="h3C">Listado de Clientes</h3>
            <table id="tablaC" border={2}>
                <thead>
                    <th>Id</th>                    
                    <th>nombre</th>
                    <th>correo</th>                    
                    <th>Acciones</th>
                </thead>
                <tbody>
                    {clientes.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>                            
                            <td>{c.nombre}</td>
                            <td>{c.correo}</td>                            
                            <td>
                                <button className="botones-container" id="botonC"onClick={() => eliminar(c.id)}>Eliminar</button>
                                <button className="botones-container" id = "botonC" onClick={() => editarCliente(c)}>Actualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Clientes;