import React, { useState } from "react";
import '../styles/Reservas.css';

type Reserva = {
    id: number;
    fechaInicio: Date;
    fechaFin: Date;
    idCliente: number;
    idHabitacion: number;
}

type Cliente = {
    id: number;
    nombre: string;
    correo: string;
}
type Habitacion = {
    id: number;
    tipo: string;
    precio: number;
}

type ReservaProps = {
    clientes: Cliente[];
    habitaciones: Habitacion[];
    reservas: Reserva[];
    setReservas: React.Dispatch<React.SetStateAction<Reserva[]>>;
}

const Reservas: React.FC<ReservaProps> = ({ clientes, habitaciones, reservas, setReservas }) => {
    const [idClienteReserva, setIdClienteReserva] = useState<number>(0);
    const [idHabitacionReserva, setIdHabitacionReserva] = useState<number>(0);
    const [fechaInicioReserva, setFechaInicioReserva] = useState<string>("");
    const [fechaFinReserva, setFechaFinReserva] = useState<string>("");
    const [reservaEditando, setReservaEditando] = useState<Reserva | null>(null);

    // Función para verificar si hay solapamiento de fechas
    const hayConflictoDeFechas = (idHabitacion: number, fechaInicio: Date, fechaFin: Date, idReserva?: number): boolean => {
        return reservas.some(reserva => {
            console.log(`Comparando: ${fechaInicio.toISOString()} - ${fechaFin.toISOString()} con ${new Date(reserva.fechaInicio).toISOString()} - ${new Date(reserva.fechaFin).toISOString()}`);
            return reserva.idHabitacion === idHabitacion && 
                reserva.id !== idReserva && // Evita que la reserva se compare consigo misma en la actualización
                (
                    (fechaInicio >= new Date(reserva.fechaInicio) && fechaInicio < new Date(reserva.fechaFin)) || // Se solapa con fecha de inicio
                    (fechaFin > new Date(reserva.fechaInicio) && fechaFin <= new Date(reserva.fechaFin)) || // Se solapa con fecha de fin
                    (fechaInicio <= new Date(reserva.fechaInicio) && fechaFin >= new Date(reserva.fechaFin)) // La nueva reserva cubre toda la existente
                );
        });
    };

    const agregar = () => {
        if (idClienteReserva !== 0 && idHabitacionReserva !== 0 && fechaInicioReserva !== ""  && fechaFinReserva !== "") {
            const fechaInicio = new Date(fechaInicioReserva + 'T00:00:00Z'); // Convertir a UTC
            const fechaFin = new Date(fechaFinReserva + 'T00:00:00Z'); // Convertir a UTC

            if (hayConflictoDeFechas(idHabitacionReserva, fechaInicio, fechaFin)) {
                alert("Conflicto de fechas");
                return;
            }

            setReservas([...reservas,
            {
                id: reservas.length + 1,
                idCliente: idClienteReserva,
                idHabitacion: idHabitacionReserva,
                fechaInicio,
                fechaFin
            }]);

            // Limpiar los campos
            setIdClienteReserva(0);
            setIdHabitacionReserva(0);
            setFechaInicioReserva("");
            setFechaFinReserva("");
        } else {
            alert("Existen campos vacíos");
        }
    };

    const eliminar = (id: number) => {
        setReservas(reservas.filter((res) => res.id !== id));
    };

    const actualizarReserva = () => {
        if (reservaEditando) {
            const fechaInicio = new Date(fechaInicioReserva + 'T00:00:00Z'); // Convertir a UTC
            const fechaFin = new Date(fechaFinReserva + 'T00:00:00Z'); // Convertir a UTC

            if (fechaInicio >= fechaFin) {
                alert("La fecha de inicio debe ser anterior a la fecha de fin.");
                return;
            }

            if (hayConflictoDeFechas(idHabitacionReserva, fechaInicio, fechaFin, reservaEditando.id)) {
                alert("Error: La habitación ya está reservada en este rango de fechas.");
                return;
            }

            const reservasActualizadas = reservas.map((reserva) =>
                reserva.id === reservaEditando.id
                    ? { ...reserva, fechaInicio, fechaFin, idCliente: idClienteReserva, idHabitacion: idHabitacionReserva }
                    : reserva
            );
            
            setReservas(reservasActualizadas);
            setReservaEditando(null); 
            setIdClienteReserva(0);
            setIdHabitacionReserva(0);
            setFechaInicioReserva("");  
            setFechaFinReserva("");                       
        }
    };

    const editarReserva = (reserva: Reserva) => {
        setReservaEditando(reserva);
        setFechaInicioReserva(reserva.fechaInicio.toISOString().split('T')[0]);
        setFechaFinReserva(reserva.fechaFin.toISOString().split('T')[0]);
        setIdClienteReserva(reserva.idCliente);
        setIdHabitacionReserva(reserva.idHabitacion);
    };

    // Función para mostrar la fecha en formato local
    const mostrarFechaLocal = (fecha: Date) => {
        return new Date(fecha).toLocaleDateString();
    };

    return (
        <div id ="container">
            <h1 id ="h1R">Gestión de Reservas</h1>
            <select id ="select"
                value={idClienteReserva}
                onChange={(e) => setIdClienteReserva(Number(e.target.value))}
            >
                <option value={0}>-- Cliente --</option>
                {
                    clientes.map((cli) => (
                        <option key={cli.id} value={cli.id}>                          
                            {cli.nombre}
                        </option>
                    ))
                }
            </select>
            <select id ="select"
                value={idHabitacionReserva}
                onChange={(e) => setIdHabitacionReserva(Number(e.target.value))}
            >
                <option value={0}>-- Habitación --</option>
                {
                    habitaciones.map((hab) => (
                        <option key={hab.id} value={hab.id}>
                            {hab.id+" "}
                            {" "+hab.tipo}
                        </option>
                    ))
                }
            </select>
            
            <input id ="input"
                type="date"
                value={fechaInicioReserva}
                onChange={(e) => setFechaInicioReserva(e.target.value)}
            />
            <input id ="input"
                type="date"
                value={fechaFinReserva}
                onChange={(e) => setFechaFinReserva(e.target.value)}
            />

            {reservaEditando ? (
                <button onClick={actualizarReserva}>Actualizar</button>
            ) : (
                <button onClick={agregar}>Agregar</button>
            )}
            
            <h3 id ="h3R">Listado de Reservas</h3>
            <table id ="tablaR" border={2}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Cliente</th>
                        <th>Habitación</th>
                        <th>Fecha Ingreso</th>
                        <th>Fecha Salida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reservas.map((res) => (
                            <tr key={res.id}>
                                <td>{res.id}</td>
                                <td>{clientes.find((cli) => cli.id === res.idCliente)?.nombre}</td>                                
                                <td>{habitaciones.find((hab) => hab.id === res.idHabitacion)?.tipo}{"  Nº: "}{habitaciones.find((hab) => hab.id === res.idHabitacion)?.id} </td>
                                <td>{mostrarFechaLocal(res.fechaInicio)}</td>
                                <td>{mostrarFechaLocal(res.fechaFin)}</td>
                                <td>
                                    <button id="boton" onClick={() => eliminar(res.id)}>Eliminar</button>
                                    <button id="boton" onClick={() => editarReserva(res)}>Actualizar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Reservas;
