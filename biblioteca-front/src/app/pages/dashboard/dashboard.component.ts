import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlockchainService } from '../../services/blockchain.service';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  conectado = false;
  wallet = '';
  titulo = '';
  autor = '';
  isbn = '';
  idBusqueda = 1;
  resultado:any = null;
  idPrestamo = 1;
  numControlPrestamo = '';
  idDevolucion = 1;
  numControl = '';
  nombreAlumno = '';
  carreraAlumno = '';
  correoAlumno = '';
  walletAlumno = '';
  textoBusqueda = '';
  resultadosBusqueda:any[] = [];
  historialPrestamos:any[] = [];
  historialCompleto:any[] = [];
  numControlConsulta = '';
  alumnoConsultado:any = null;
  librosPrestadosAlumno:any[] = [];

  constructor(
    private blockchain: BlockchainService,
    private firebase: FirebaseService
  ) {}

  async conectar() {

  try {

    await this.blockchain.conectarWallet();

    this.wallet =
      await this.blockchain.obtenerDireccion();

    this.conectado = true;

    await this.cargarHistorial();

    alert('Wallet conectada');

  } catch(error) {

    console.error(error);

    alert('Error al conectar');

  }

}

 async guardarLibro(){

  try{

    await this.blockchain
      .agregarLibro(

        this.isbn,
        this.titulo,
        this.autor

      );

    const total =

      await this.blockchain
        .obtenerTotalLibros();

    await this.firebase
      .registrarLibro({

        idBlockchain:
          Number(total),

        isbn:
          this.isbn,

        titulo:
          this.titulo,

        autor:
          this.autor

      });

    alert(
      'Libro registrado'
    );

    this.isbn = '';
    this.titulo = '';
    this.autor = '';

  }
  catch(error){

    console.error(error);

  }

}

async consultarLibro() {

  try {

    this.resultado =
      await this.blockchain
      .consultarLibro(
        this.idBusqueda
      );

  } catch(error){

    console.error(error);

  }

}

async buscarLibroTexto(){

  try{

    const libros =

      await this.firebase
        .obtenerLibros();

    const texto =

      this.textoBusqueda
      .toLowerCase();

    this.resultadosBusqueda =

      libros.filter(

        (libro:any) =>

          libro.isbn
          .toLowerCase()
          .includes(texto)

          ||

          libro.titulo
          .toLowerCase()
          .includes(texto)

          ||

          libro.autor
          .toLowerCase()
          .includes(texto)

      );

  }
  catch(error){

    console.error(error);

  }

}

async prestarLibro() {

  try {

    const alumno =
      await this.firebase
        .obtenerAlumno(
          this.numControlPrestamo
        );

    if(!alumno){

      alert(
        'Alumno no encontrado'
      );

      return;

    }

    await this.blockchain
      .prestarLibro(
        this.idPrestamo,
        alumno['wallet']
      );

    const fechaPrestamo =
      new Date();

    const fechaDevolucion =
      new Date();

    fechaDevolucion.setDate(
      fechaPrestamo.getDate() + 7
    );

    const libro =
      this.resultadosBusqueda.find(
        l =>
          l.idBlockchain ==
          this.idPrestamo
      );

    await this.firebase
      .registrarPrestamo({

        idLibro:
          this.idPrestamo,

        isbn:
          libro?.isbn,

        titulo:
          libro?.titulo,

        autor:
          libro?.autor,

        numControl:
          this.numControlPrestamo,

        nombreAlumno:
          alumno['nombre'],

        wallet:
          alumno['wallet'],

fechaPrestamo:
  fechaPrestamo.toLocaleDateString(),

fechaLimite:
  fechaDevolucion.toLocaleDateString(),

fechaDevolucionReal:
  '',

        estado:
          'Prestado'

      });

    alert(
      'Préstamo registrado'
    );

    this.numControlPrestamo = '';
    this.idPrestamo = 1;

    await this.cargarHistorial();

  } catch(error){

    console.error(error);

  }

}

async devolverLibro() {

  try {

    await this.blockchain
      .devolverLibro(
        this.idDevolucion
      );

    await this.firebase
      .registrarDevolucion(
        this.idDevolucion
      );

    alert(
      'Libro devuelto'
    );

    await this.cargarHistorial();

  } catch(error){

    console.error(error);

  }

}

async probarFirebase(){

  const alumno =
    await this.firebase
      .obtenerAlumno(
        'E21020388'
      );

  console.log(
    alumno
  );

  alert(
    JSON.stringify(
      alumno
    )
  );

}

async guardarAlumno(){

  try{

    await this.firebase.registrarAlumno({

      numControl: this.numControl,

      nombre: this.nombreAlumno,

      carrera: this.carreraAlumno,

      correo: this.correoAlumno,

      wallet: this.walletAlumno

    });

    alert(
      'Alumno registrado'
    );

    this.numControl = '';
    this.nombreAlumno = '';
    this.carreraAlumno = '';
    this.correoAlumno = '';
    this.walletAlumno = '';

  }
  catch(error){

    console.error(error);

  }

}

async cargarHistorial() {

  const prestamos =
    await this.firebase
      .obtenerPrestamos();

  this.historialCompleto =
    prestamos;

  this.historialPrestamos =
    [...prestamos];

}

mostrarTodo() {

  this.historialPrestamos =
    [...this.historialCompleto];

}

filtrarHoy() {

  const hoy =
    new Date()
      .toLocaleDateString();

  this.historialPrestamos =
    this.historialCompleto.filter(
      p =>
        p.fechaPrestamo === hoy
    );

}

filtrarSemana() {

  const hoy =
    new Date();

  this.historialPrestamos =
    this.historialCompleto.filter(
      p => {

        const fecha =
          new Date(
            p.fechaPrestamo
          );

        const dias =
          (
            hoy.getTime() -
            fecha.getTime()
          ) /
          (
            1000 *
            60 *
            60 *
            24
          );

        return dias <= 7;

      }
    );

}

filtrarMes() {

  const hoy =
    new Date();

  this.historialPrestamos =
    this.historialCompleto.filter(
      p => {

        const fecha =
          new Date(
            p.fechaPrestamo
          );

        const dias =
          (
            hoy.getTime() -
            fecha.getTime()
          ) /
          (
            1000 *
            60 *
            60 *
            24
          );

        return dias <= 30;

      }
    );

}



async probarEventos(){

  try{

    const eventos =
      await this.blockchain
        .obtenerEventosPrestamos();

    console.log(
      'Prestados:',
      eventos.prestados
    );

    console.log(
      'Devueltos:',
      eventos.devueltos
    );

  }
  catch(error){

    console.error(error);

  }

}

async consultarAlumno() {

  this.alumnoConsultado =
    await this.firebase
      .obtenerAlumno(
        this.numControlConsulta
      );

  const prestamos =
    await this.firebase
      .obtenerPrestamos();

  this.librosPrestadosAlumno =
  prestamos.filter(
  (p:any) =>

        p.numControl ===
        this.numControlConsulta

        &&

        p.estado ===
        'Prestado'

    );

}

}