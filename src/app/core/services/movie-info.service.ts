import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendHostnameProviderService } from './backend-hostname-provider';
import { Review } from '../models/review-model';


@Injectable(
    {
        providedIn: 'root'
    }
)
export class MovieinfoService {

    constructor(private readonly http: HttpClient,
        private readonly backendHostnameProviderService: BackendHostnameProviderService) {
    }

    fetchAllMovieinfo(queryParams = ''): Observable<any> {
        const apiUrl = this.backendHostnameProviderService.getServiceUrl('mtBackend') + '/movie-info' + queryParams;
        return this.http.get(apiUrl);
    }

    fetchMovieinfo(id: string): Observable<any> {
        const apiUrl = this.backendHostnameProviderService.getServiceUrl('mtBackend') + '/movie-info/' + id;
        return this.http.get(apiUrl);
    }

    fetchDoughnutData(ofSent: string): Observable<any> {
        const apiUrl = this.backendHostnameProviderService.getServiceUrl('mtBackend') + `/analytics/doughnut?of=${ofSent}`;
        return this.http.get(apiUrl);
    }


    fetchBarData(id: number, ofSent: string): Observable<any> {
        const apiUrl = this.backendHostnameProviderService.getServiceUrl('mtBackend') + `/analytics/bar?id=${id}&of=${ofSent}`;
        return this.http.get(apiUrl);
    }

    submitRating(rating: any): Observable<any> {
        const apiUrl = this.backendHostnameProviderService.getServiceUrl('mtBackend') + `/rate`;
        if (rating.id) {
            return this.http.post(apiUrl, rating);
        } else {
            return this.http.put(apiUrl, rating);
        }
    }

    fetchReview(movieInfoId, reviewerId): Observable<Review> | Observable<any> {
        const apiUrl = this.backendHostnameProviderService.getServiceUrl('mtBackend') + `/rating/${movieInfoId}/${reviewerId}`;
        return this.http.get(apiUrl);
    }


}