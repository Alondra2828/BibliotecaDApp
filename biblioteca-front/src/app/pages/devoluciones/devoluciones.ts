import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { BlockchainService }
from '../../services/blockchain.service';

@Component({
  selector: 'app-devoluciones',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './devoluciones.html',
  styleUrl: './devoluciones.css'
})
export class Devoluciones {

  idLibro = 1;

  constructor(
    private blockchain: BlockchainService
  ){}

  async devolver() {

    try {

      await this.blockchain
      .devolverLibro(
        this.idLibro
      );

      alert(
        'Libro devuelto'
      );

    }
    catch(error){

      console.error(error);

      alert(
        'Error al devolver libro'
      );

    }

  }

}