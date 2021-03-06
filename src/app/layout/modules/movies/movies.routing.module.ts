import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesContainerComponent } from './components/movies-container/movies-container.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';


const routes: Routes = [
  {
    path:'',
    component:MoviesContainerComponent
  },
  {
    path:'view/:id',
    component:MovieInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
