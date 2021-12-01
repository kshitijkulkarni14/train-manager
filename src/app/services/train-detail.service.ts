import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Departure } from '../model/departure';
import { Station } from '../model/station';

@Injectable({
  providedIn: 'root'
})
export class TrainDetailService {
  stationsUrl: string  = environment.apiBaseUrl + environment.statinosEndpoint;
  departureUrl: string = environment.apiBaseUrl + environment.trainsEndpoint;
  headers: any = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.token
  });

  constructor(private http: HttpClient) {}

  public getDepartures(stationCode): Observable<Departure[]> {
    var parameters = {
      'stationCode': stationCode
    }
    return this.http.post<Departure[]>(this.departureUrl, parameters, {
      headers: this.headers
    }).pipe(
      map((departures) => {
        return departures;
      })
    ).pipe(
      catchError((error) => {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error)
        return throwError(() => error);
      })
    )
  }

  public getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.stationsUrl, {
      headers: this.headers
    }).pipe(
      map((stations) => {
        return stations;
      })
    ).pipe(
      catchError((error) => {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error)
        return throwError(() => error);
      })
    )
  }
}
