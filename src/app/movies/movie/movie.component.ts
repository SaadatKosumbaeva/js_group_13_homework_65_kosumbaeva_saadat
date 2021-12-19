import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../shared/movie.model';
import { MovieService } from '../../shared/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {
  @Input() movie!: Movie;
  movieDeletingSubscription!: Subscription;
  movieId = '';
  isDeleting = false;
  movieDeleted!: Movie;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    if (!this.movie) return;
    this.movieId = this.movie.id;
    this.movieDeletingSubscription = this.movieService.movieDeleting.subscribe((isDeleting: boolean) => {
      this.isDeleting = isDeleting;
    })
  }

  deleteMovie() {
    this.movieDeleted = new Movie(this.movie.id, this.movie.name);

    this.movieService.deleteMovie(this.movieId).subscribe(() => {
      this.movieService.fetchMovies();
    });
  }

  showButtons() {
    if (!this.movieDeleted) {
      return true;
    }
    if (this.movie.id !== this.movieDeleted.id && !this.isDeleting) {
      return true;
    } else return;
  }

  ngOnDestroy(): void {
    this.movieDeletingSubscription.unsubscribe();
  }
}
