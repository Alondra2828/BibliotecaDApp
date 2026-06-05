import { Routes } from '@angular/router';

import { DashboardComponent }
from './pages/dashboard/dashboard.component';

import { Libros }
from './pages/libros/libros';

import { Prestamos }
from './pages/prestamos/prestamos';

import { Devoluciones }
from './pages/devoluciones/devoluciones';

export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },

  {
    path: 'libros',
    component: Libros
  },

  {
    path: 'prestamos',
    component: Prestamos
  },

  {
    path: 'devoluciones',
    component: Devoluciones
  }

];