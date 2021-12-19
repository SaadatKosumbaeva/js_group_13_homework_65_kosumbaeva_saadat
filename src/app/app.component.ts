import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from './shared/movie.service';
import { Subscription } from 'rxjs';
import { Movie } from './shared/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  movieName = '';
  isUploading = false;
  movieUploadingSubscription!: Subscription;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieUploadingSubscription = this.movieService.movieUploading.subscribe((isUploading: boolean) => {
      this.isUploading = isUploading;
    })
  }

  addMovie() {
    if (this.movieName.trim().length > 0) {
      const id = Math.random().toString();
      const movie = new Movie(id, this.movieName);
      this.movieService.addMovie(movie).subscribe(() => {
        this.movieService.fetchMovies();
      });
      this.movieName = '';
    }
  }

  ngOnDestroy(): void {
    this.movieUploadingSubscription.unsubscribe();
  }
}
