import { useState } from "react";
import '../styles/Habitaciones.css';

type Habitacion = {
    id: number;
    tipo: string;
    precio: number;    
}
type HabitacionProps = {
    habitaciones: Habitacion[];
    setHabitaciones: React.Dispatch<React.SetStateAction<Habitacion[]>>;
}

//localStorage es una api del navegador
const Habitaciones: React.FC<HabitacionProps> = ({ habitaciones, setHabitaciones }) => {

    const [tipoHabitacion, setTipoHabitacion] = useState<string>("");
    const [precioHabitacion, setPrecioHabitacion] = useState<string>("");  // C
    const [habitacionEditando, setHabitacionEditando] = useState<Habitacion | null>(null); // Estado para habitación en edición
    
    const agregarHabitacion = () => {
        if (tipoHabitacion.trim() !== "" && precioHabitacion.trim() !== "") {
            setHabitaciones([...habitaciones,
            { id:habitaciones.length + 1,                
                tipo:tipoHabitacion,
                precio: Number(precioHabitacion),             
            }]);//tpo=suite, individual,doble            
            setTipoHabitacion("");
            setPrecioHabitacion("");            
        } else {
            alert("EL nombre es obligatorio");
        } 
    }

    const eliminar = (id: number) => {
        setHabitaciones(
            habitaciones.filter((hab) => hab.id !== id)
        );
    }
    // Función para editar la habitación
  const actualizar = () => {
    if (habitacionEditando) {
      const habitacionesActualizadas = habitaciones.map((habitacion) =>
        habitacion.id === habitacionEditando.id
          ? { ...habitacion, tipo: tipoHabitacion, precio: Number(precioHabitacion) }
          : habitacion
      );
      setHabitaciones(habitacionesActualizadas);
      setHabitacionEditando(null); // Limpiar el estado de edición
      setTipoHabitacion("");
      setPrecioHabitacion("");
    }
  }

  // Función para cargar los datos de la habitación seleccionada en los campos de entrada
  const editarHabitacion = (habitacion: Habitacion) => {
    setHabitacionEditando(habitacion);
    setTipoHabitacion(habitacion.tipo);
    setPrecioHabitacion(String(habitacion.precio));
  };

    return (
        <div id ="container">
            <h1 id="h1H">Registro de Habitaciones</h1>
            <input id="inputH"
                type="text"
                placeholder="Tipo: ejm. individual "
                value={tipoHabitacion}
                onChange={(e) => setTipoHabitacion(e.target.value)}
            />
            <input id="inputH"
                type="number"
                placeholder="Precio"
                value={precioHabitacion}
                onChange={(e) => setPrecioHabitacion(e.target.value)}  // Se puede borrar ahora
            />

            {habitacionEditando ? (
            <button id="botonH" onClick={actualizar}>Actualizar</button> // Botón de actualización
             ) : (
             <button id ="botonH" onClick={agregarHabitacion}>Agregar</button> // Botón de agregar
             )}

            <h3 id="h3H">Listado de Habitaciones</h3>
            <table id ="tablaH" border={2}>
                <thead>
                    <th>Id</th>                    
                    <th>Tipo</th>
                    <th>Precio</th>                    
                    <th>Acciones</th>
                </thead>
                <tbody>
                    {habitaciones.map((h) => (
                        <tr key={h.id}>
                            <td>{h.id}</td>                            
                            <td>{h.tipo}</td>
                            <td>{h.precio}</td>                            
                            <td>
                                <button id ="botonH"  onClick={() => eliminar(h.id)}>
                                    Eliminar
                                </button>
                                <button id ="botonH"  onClick={() => editarHabitacion(h)}>
                                    Actualizar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Habitaciones;