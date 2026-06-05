import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { BlockchainService }
from '../../services/blockchain.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './prestamos.html',
  styleUrl: './prestamos.css'
})
export class Prestamos {

 idPrestamo = 1;
numControlPrestamo = '';

constructor(
  private blockchain: BlockchainService,
  private firebase: FirebaseService
){}

async prestar() {

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

    console.log(
      'Alumno encontrado:',
      alumno
    );

    await this.blockchain
    .prestarLibro(
      this.idPrestamo,
      alumno['wallet']
    );

    alert(
      'Préstamo registrado'
    );

    this.numControlPrestamo = '';

  }
  catch(error){

    console.error(error);

    alert(
      'Error al prestar libro'
    );

  }

}
}