import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Home, Demo, Docs, Resizable, About} from '../app/components/index';

const routes: Routes = [
  {
    path: 'home',
    component: Home,
    data: { title: 'i-wrappers, library for Angular' }
  },
  {
    path: 'docs',
    component: Docs,
    data: { title: 'i-wrappers, library for Angular' },
    children: [
      {
        path: '',
        outlet: 'doc',
        component: About
      },
      {
        path: 'resizable',
        outlet: 'doc',
        component: Resizable
      },
    ]
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
