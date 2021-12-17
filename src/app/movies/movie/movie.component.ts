import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../shared/movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
