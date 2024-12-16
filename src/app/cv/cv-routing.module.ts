import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { CvListResolver } from './cv/resolver';

const routes: Routes = [
  {
    path: 'cvs',
    component: CvComponent,
    resolve: { 
      cvs: CvListResolver, // Associe le Resolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
