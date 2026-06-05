import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlockchainService }from '../../services/blockchain.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './libros.html',
  styleUrl: './libros.css'
})
export class Libros {
  isbn = '';
  titulo = '';
  autor = '';
  idBusqueda = 1;
  resultado:any = null;
  

  constructor(
    private blockchain: BlockchainService
  ){}

  async guardar() {

    try {

 await this.blockchain.agregarLibro(
  this.isbn,
  this.titulo,
  this.autor
);

      alert(
        'Libro registrado'
      );

      this.titulo = '';
      this.autor = '';

    }
    catch(error){

      console.error(error);

      alert(
        'Error al registrar'
      );

    }

  }

  async consultar() {

  try {

    this.resultado =
      await this.blockchain
      .consultarLibro(
        this.idBusqueda
      );

    console.log(
      this.resultado
    );

  }
  catch(error){

    console.error(error);

    alert(
      'Libro no encontrado'
    );

  }

}

}