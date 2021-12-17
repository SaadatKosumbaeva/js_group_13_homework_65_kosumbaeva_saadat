import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../shared/movie.model';
import { MovieService } from '../../shared/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() index!: number;
  @Input() movie: Movie | undefined = undefined;
  movieId = '';

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    const movie = this.movieService.getMovie(this.index);
    this.movieId = movie.id;
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.movieId);
  }
}
