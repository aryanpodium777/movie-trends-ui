import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from '../models/app-config.model';


const URL = 'https://movie-trends-be.herokuapp.com';
@Injectable(
    {
        providedIn: 'root'
    }
)
export class MovieinfoService {

    constructor(private readonly http: HttpClient,
        @Inject(APP_CONFIG) private readonly appConfig: AppConfig) {
        console.log(appConfig);
    }

    fetchAllMovieinfo(queryParams = ''): Observable<any> {
        const apiUrl = URL + '/movie-info' + queryParams;
        return this.http.get(apiUrl);
    }

    fetchMovieinfo(id: string): Observable<any> {
        const apiUrl = URL + '/movie-info/' + id;
        return this.http.get(apiUrl);
    }

}