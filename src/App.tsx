import { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HolaMundo from './components/HolaMundo';
import Habitaciones from './components/Habitaciones';
import Clientes from './components/Clientes';
import Reservas from './components/Reservas';

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
type Reserva = {
  id: number;
  fechaInicio: Date;
  fechaFin: Date;
  idCliente: number;
  idHabitacion: number;
}



const App: React.FC = () => {

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() =>{
    const storedClientes = localStorage.getItem("clientes");
    const storedHabitaciones = localStorage.getItem("habitaciones");
    const storedReservas = localStorage.getItem("reservas");
  
    if (storedClientes) setClientes(JSON.parse(storedClientes));
    if (storedHabitaciones) setHabitaciones(JSON.parse(storedHabitaciones));
    if (storedReservas) setReservas(JSON.parse(storedReservas));  
  },[]);

  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);
  useEffect(() => {
    localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
  }, [habitaciones]);
  useEffect(() => {
    localStorage.setItem("reservas", JSON.stringify(reservas));
  }, [reservas]);

  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HolaMundo />} />
        <Route path="/habitaciones" element={<Habitaciones habitaciones={habitaciones} setHabitaciones={setHabitaciones} />} />
        <Route path="/clientes" element={<Clientes clientes={clientes} setClientes={setClientes}/>} />
        <Route path="/reservas" element={<Reservas reservas={reservas} clientes={clientes} habitaciones={habitaciones} setReservas={setReservas} />} />
        

      </Routes>
    </Router>
  )    
}

export default App;

