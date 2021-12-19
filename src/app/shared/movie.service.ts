import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class MovieService {
  private movies: Movie[] = [];
  moviesChange = new Subject<Movie[]>();
  moviesFetching = new Subject<boolean>();
  movieUploading = new Subject<boolean>();
  movieDeleting = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getMovies() {
    return this.movies.slice();
  }

  fetchMovies() {
    this.moviesFetching.next(true);
    this.http.get<{ [id: string]: Movie }>('https://skosumbaeva2502-default-rtdb.firebaseio.com/movies.json')
      .pipe(map(result => {
        return Object.keys(result).map(id => {
          const movieData = result[id];
          return new Movie(id, movieData.name);
        })
      }))
      .subscribe(movies => {
        this.movies = movies;
        this.moviesChange.next(this.movies);
        this.moviesFetching.next(false);
      }, () => {
        this.movies = [];
        this.moviesChange.next(this.movies);
        this.moviesFetching.next(false);
      });
  }

  addMovie(movie: Movie) {
    const movieData = {name: movie.name};
    this.movieUploading.next(true);
    return this.http.post('https://skosumbaeva2502-default-rtdb.firebaseio.com/movies.json', movieData)
      .pipe(tap(() => {
        this.movieUploading.next(false);
      }, () => {
        this.movieUploading.next(false);
      }));
  }

  deleteMovie(id: string) {
    this.movieDeleting.next(true);
    return this.http.delete('https://skosumbaeva2502-default-rtdb.firebaseio.com/movies/' + id + '.json')
      .pipe(tap(() => {
        this.movieDeleting.next(false);
      }, () => {
        this.movieDeleting.next(false);
      }));
  }

}
