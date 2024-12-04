import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MovieService } from '../sharedService/movieSearch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  h1Style: boolean = false;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  movieName: any;
  movieData: any;
  movieInfo: any;

  constructor(private _movieService: MovieService) { }

  value = new FormControl('', [Validators.required]);
  getErrorMessage() {
    return this.value.hasError('required') ? 'You must enter a value' :
      '';
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  firstClick() {
    this.h1Style = true;
  }

  getMovies() {
    if(this.movieName !== undefined && this.movieName.trim().length !== 0
      && this.movieName.length !== null)
    {

          this._movieService.getMovies(this.movieName).subscribe(
            // the first argument is a function which runs on success
            data => this.displaysearchdata(data)

          );
    }


  }

  displaysearchdata(data) {
      this.movieData = data;
      this.movieInfo = this.movieData.Search;

      console.log(this.movieData.Search);

    }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
