import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { Movie } from '../shared/movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  moviesChangeSubscription!: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
    this.moviesChangeSubscription = this.movieService.moviesChange.subscribe(movies => {
      this.movies = movies;
    });
    this.movieService.fetchMovies();
  }

  ngOnDestroy(): void {
    this.moviesChangeSubscription.unsubscribe();
  }

}
