import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DataViewModule } from 'primeng/dataview';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MovieRoutingModule } from './movies.routing.module';
import { MovieInfoListComponent } from './components/movie-info-list/movie-info-list.component';
import { MoviesContainerComponent } from './components/movies-container/movies-container.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import {RatingModule} from 'primeng/rating';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [MovieInfoListComponent, MoviesContainerComponent, MovieInfoComponent],
    imports: [
        CommonModule,
        MovieRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        DropdownModule,
        PanelModule,
        DataViewModule,
        TreeModule,
        InputTextModule,
        ButtonModule,
        SidebarModule,
        RatingModule,
        InputTextareaModule
    ]
})
export class MoviesModule { }
