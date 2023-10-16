import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private URL_BACKEND = environment.URL_BACKEND;

  constructor(private httpService: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Server returned code ${error.status}, body was: `, error.message);
      return throwError(() => new Error(error.message));
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  get(route: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    return this.httpService.get(this.URL_BACKEND + route, {... header}).pipe(
      catchError(this.handleError)
    );
  }

  post(route: string, body: any): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    return this.httpService.post(this.URL_BACKEND + route, body, {... header}).pipe(
      catchError(this.handleError)
    );
  }
}
