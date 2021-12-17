import { Component } from '@angular/core';
import { MovieService } from './shared/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movieName = '';

  constructor(private movieService: MovieService) {
  }

  addMovie() {
    if (this.movieName.trim().length > 0) {
      const movieData = {name: this.movieName};
      this.movieService.addMovie(movieData);
      this.movieName = '';
    }
  }
}
