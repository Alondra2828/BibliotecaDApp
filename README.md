# BibliotecaDApp

Sistema de Gestión Bibliotecaria basado en Blockchain desarrollado con Angular, Firebase y Ethereum Sepolia.

## Descripción

BibliotecaDApp es una aplicación web que permite administrar libros, alumnos, préstamos y devoluciones utilizando un contrato inteligente desplegado en la red Ethereum Sepolia.

El sistema combina Blockchain y Firebase para aprovechar las ventajas de ambas tecnologías:

* Blockchain garantiza la integridad y trazabilidad de los préstamos y devoluciones.
* Firebase almacena información administrativa y permite consultas rápidas.

## Tecnologías utilizadas

* Angular
* TypeScript
* Firebase Firestore
* Solidity
* Hardhat
* Ethers.js
* Ethereum Sepolia
* MetaMask

## Funcionalidades

### Gestión de alumnos

* Registro de alumnos.
* Asociación de wallet Ethereum.
* Consulta de información del alumno.

### Gestión de libros

* Registro de libros.
* Búsqueda por ISBN, título o autor.

### Préstamos

* Registro de préstamos.
* Asociación del libro con la wallet del alumno.
* Registro del evento en Blockchain.

### Devoluciones

* Registro de devoluciones.
* Actualización del estado del libro.
* Registro del evento en Blockchain.

### Historial

* Consulta de préstamos.
* Filtros por día, semana y mes.
* Consulta de libros prestados por alumno.

## Arquitectura

### Blockchain (Ethereum Sepolia)

Almacena:

* ID del libro.
* ISBN.
* Título.
* Autor.
* Disponibilidad.
* Wallet del prestatario.
* Eventos de préstamo.
* Eventos de devolución.

### Firebase Firestore

Almacena:

#### Colección alumnos

* Número de control.
* Nombre.
* Carrera.
* Correo.
* Wallet.

#### Colección libros

* Información bibliográfica.

#### Colección prestamos

* Libro prestado.
* Alumno.
* Fechas.
* Estado.
* Historial administrativo.

## Contrato Inteligente

Red: Ethereum Sepolia

Dirección del contrato:

0xea8411802A1Dae906f903D0338CCd6d8FE54a9e1

## Autor

Alondra Isabel González Martínez

Instituto Tecnológico Superior de Xalapa

Proyecto académico desarrollado para la materia de Blockchain.
