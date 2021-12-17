import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieService {
  private movies: Movie[] = [];
  moviesFetching = new Subject<boolean>();
  moviesChange = new Subject<Movie[]>();

  constructor(private http: HttpClient) {
  }

  getMovies() {
    return this.movies.slice();
  }

  fetchMovies() {
    this.http.get<{[id: string]: Movie}>('https://skosumbaeva2502-default-rtdb.firebaseio.com/movies.json')
      .pipe(map(result => {
        return Object.keys(result).map(id => {
          const movieData = result[id];
          return new Movie(id, movieData.name);
        })
      }))
      .subscribe(movies => {
        this.movies = movies;
        this.moviesChange.next(this.movies);
      });
  }

  addMovie(movieData: object) {
    this.http.post('https://skosumbaeva2502-default-rtdb.firebaseio.com/movies.json', movieData)
      .subscribe(() => {
        this.fetchMovies();
      });
  }

  getMovie(index: number) {
    return this.movies[index];
  }

  deleteMovie(id: string) {
    this.movies.find(movie => movie.id === id);
    this.http.delete('https://skosumbaeva2502-default-rtdb.firebaseio.com/movies/' + id + '.json')
      .subscribe(() => {
      this.fetchMovies();
    });
  }

}
