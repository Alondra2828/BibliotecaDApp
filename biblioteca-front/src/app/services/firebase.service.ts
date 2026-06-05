import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  updateDoc
} from 'firebase/firestore';

import {
  firebaseConfig
} from '../../environments/firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  app = initializeApp(
    firebaseConfig
  );

  db = getFirestore(
    this.app
  );

  constructor() {}

  async obtenerAlumno(
    numControl:string
  ){

    const referencia =
      doc(
        this.db,
        'alumnos',
        numControl
      );

    const documento =
      await getDoc(
        referencia
      );

    if(documento.exists()){

      return documento.data();

    }

    return null;

  }

  async obtenerTodos(){

    const snapshot =
      await getDocs(
        collection(
          this.db,
          'alumnos'
        )
      );

    return snapshot.docs.map(
      doc => doc.data()
    );

  }

async registrarAlumno(alumno:any){

  await setDoc(

    doc(
      this.db,
      'alumnos',
      alumno.numControl
    ),

    alumno

  );

}

async registrarLibro(libro:any){

  await setDoc(

    doc(
      this.db,
      'libros',
      libro.isbn
    ),

    libro

  );

}

async obtenerLibros(){

  const snapshot =

    await getDocs(

      collection(
        this.db,
        'libros'
      )

    );

  return snapshot.docs.map(

    doc => doc.data()

  );

}

async registrarPrestamo(prestamo:any){

  const id = Date.now().toString();

  await setDoc(

    doc(
      this.db,
      'prestamos',
      id
    ),

    prestamo

  );

}

async obtenerPrestamos(){

  const snapshot =

    await getDocs(

      collection(
        this.db,
        'prestamos'
      )

    );

  return snapshot.docs.map(

    doc => doc.data()

  );

}
async actualizarEstadoPrestamo(
  idLibro:number,
  estado:string
){

  const snapshot =
    await getDocs(
      collection(
        this.db,
        'prestamos'
      )
    );

  for(const documento of snapshot.docs){

    const datos =
      documento.data();

    if(
      datos['idLibro'] ==
      idLibro
    ){

      await updateDoc(

        doc(
          this.db,
          'prestamos',
          documento.id
        ),

        {
          estado: estado
        }

      );

      break;

    }

  }

}

async registrarDevolucion(
  idLibro:number
){

  const snapshot =
    await getDocs(
      collection(
        this.db,
        'prestamos'
      )
    );

  for(
    const documento
    of snapshot.docs
  ){

    const datos =
      documento.data();

    if(
      datos['idLibro']
      ==
      idLibro
      &&
      datos['estado']
      ==
      'Prestado'
    ){

      await updateDoc(

        doc(
          this.db,
          'prestamos',
          documento.id
        ),

        {

          estado:
            'Devuelto',

          fechaDevolucionReal:
            new Date()
            .toLocaleDateString()

        }

      );

      break;

    }

  }

}

}