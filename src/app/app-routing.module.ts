import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./pages/registro-usuario/registro-usuario.module').then(m => m.RegistroUsuarioPageModule)
  },
  {
    path: 'registrar-mascota',
    loadChildren: () => import('./pages/registrar-mascota/registrar-mascota.module').then(m => m.RegistrarMascotaPageModule),
  },
  {
    path: 'ficha-mascota/:id',
    loadChildren: () => import('./pages/ficha-mascota/ficha-mascota.module').then(m => m.FichaMascotaPageModule),
  },
  {
    path: 'editar-mascota/:id',
    loadChildren: () => import('./pages/editar-mascota/editar-mascota.module').then(m => m.EditarMascotaPageModule)
  },
  {
    path: 'explorar-razas',
    loadChildren: () => import('./pages/explorar-razas/explorar-razas.module').then( m => m.ExplorarRazasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
