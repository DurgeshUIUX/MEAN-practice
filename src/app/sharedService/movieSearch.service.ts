import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

declare var require: any;



@Injectable()
export class MovieService {


  public API_ENDPOINT = 'http://www.omdbapi.com/?s=';
  public API_key = '24d0252e';

  public Local_API_ENDPOINT = 'http://localhost:8080/api/';
  





  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };



  constructor(private http: HttpClient) {



  }



  // Fetch device by serial Number
  getMovies(movieName: any) {

    return this.http.get(this.API_ENDPOINT + movieName +'&'+  'apikey' + '=' +this.API_key);
  }

  getUsers() {
   
    return this.http.get('http://localhost:8080/api/users',this.httpOptions);
  }

  //////// Save methods //////////

  /** POST: add a new user to the server */
  createusers (userDetails) {
    return this.http.post(this.Local_API_ENDPOINT+'users', userDetails,this.httpOptions)
    .pipe(
      tap((result) => console.log('result is-->',result)),
      catchError(this.handleError<any[]>('add'))
     );

  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.error(error.status);

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      // return of(result as T);
      throw error;
    };
  }



}
