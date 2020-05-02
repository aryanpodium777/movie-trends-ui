import { Component, OnInit } from '@angular/core';
import { MovieinfoService } from '@mvt/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.css']
})
export class MoviesContainerComponent implements OnInit {

  constructor(private readonly movieinfoService: MovieinfoService,
    private readonly messageService: MessageService) {
    this.movieinfoService.fetchAllMovieinfo();
  }

  inTheatreMovies: any[];
  comingSoonMovies: any[];
  allmovies: any[];
  loader = {
    inTheatre: true,
    comingSoon: true,
    all: true
  };
  ngOnInit(): void {
    this.movieinfoService.fetchAllMovieinfo('?inTheatre=true').subscribe(res => {
      this.inTheatreMovies = res;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Some error occured.' });
    }, () => {
      this.loader.inTheatre = false;
    });
    this.movieinfoService.fetchAllMovieinfo('?comingSoon=true').subscribe(res => {
      this.comingSoonMovies = res;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Some error occured.' });
    }, () => {
      this.loader.comingSoon = false;
    });
    this.movieinfoService.fetchAllMovieinfo().subscribe(res => {
      this.allmovies = res;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Some error occured.' });
    }, () => {
      this.loader.all = false;
    });
  }

}
