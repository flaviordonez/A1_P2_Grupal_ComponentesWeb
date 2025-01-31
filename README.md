# Para clonar el repositorio abrimos git sobre la carpeta donde queremos guardar e inicializamos con 
git init

# Ejecutamos el comando
git clone https://github.com/flaviordonez/A1_P2_Grupal_ComponentesWeb.git

# Para instalar las dependencias utilizamos el comando 
npm i

# Para ejecutar la aplicación 
npm run dev

# Descripción de funcionalidades

/NavBar: el componente NavBar nos permite navegar por todas las páginas de la
aplicación, antes debemos instalar 
npm install react-router-dom
npm install @types/react-routes-dom
Este componente nos permite la navegación entre los componentes creados.

/HolaMundo: Decidimos dejar el nombre del primer componente con React creado
en clases, para que sea nuestra página de inicio.

/Clientes:
Este componente permite ingresar clientes y que se almacenen en localStorage
para poder aplicar funciones CRUD, como agregar, eliminar, y actualizar los 
registros en la tabla clientes, los cuales se exportan como información para
manejarla en reservas.

/Habitaciones:
Similar a clientes o contiene un formulario para ingresar habitaciones, una 
aplicación implementada fue el cambio de la variable number de Precio a string
para poder manejarla de mejor forma en el formulario, y después nuevamente 
a Number para manejarla en la lógica.

/Reservas:
En este componente se procede a traer la información de clientes y habitaciones
para utilizarla en un formulario que permite crear reservas a partir de los id
tanto de clientes como de habitaciones.
Para validar la información de reservas a crear se realiza una  función que
valida las fechas de reserva, esto no permite que una habitación se reserve 
cuando ya está ocupada, evitando solaparse entre habitaciones ocupadas y fechas 
de reservas.
Adicional se implementa el CRUD para las reservas con ello se las puede modificar 
o eliminar según se desee


Todos los datos ingresados se guardan el localStorage y se despliegan debajo
en una tabla para su visualización.

Se crea id para los .CSS de cada componente.


#Creacion del repositorio*************************

…or create a new repository on the command line

echo "# A1_P2_Grupal_ComponentesWeb" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/flaviordonez/A1_P2_Grupal_ComponentesWeb.git
git push -u origin main

…or push an existing repository from the command line

git remote add origin https://github.com/flaviordonez/A1_P2_Grupal_ComponentesWeb.git
git branch -M main
git push -u origin main