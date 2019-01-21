import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Home, Demo} from '../app/components/index';

const routes: Routes = [
  {
    path: 'home',
    component: Home,
    data: { title: 'i-wrappers, library for Angular' }
  },
  {
    path: 'demo',
    component: Demo,
    data: { title: 'i-wrappers, library for Angular' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
