import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'wall',
    loadChildren: () => import('./prayer-wall/prayer-wall.module').then(m => m.PrayerWallModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account-info/account-info.module').then(m => m.AccountInfoModule)
  },
  {
    path: 'create-wall',
    loadChildren: () => import('./create-wall/create-wall.module').then(m => m.CreateWallModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
