import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendHostnameProviderService } from './backend-hostname-provider';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class UserService {

    private MT_TOKEN: string = 'MT_TOKEN';
    constructor(private readonly http: HttpClient,
        private readonly backendHostnameProviderService: BackendHostnameProviderService) { }

    public setLoggedInUser(user: any): void {
        localStorage.setItem(this.MT_TOKEN, JSON.stringify(user));
    }

    public getLoggedInUser(): any {
        const user = localStorage.getItem(this.MT_TOKEN);
        return JSON.parse(user);
    }

    public saveUser(user: any): Observable<any> {
        const apiURL = this.backendHostnameProviderService.getServiceUrl('mtBackend') + '/user'
        return this.http.post(apiURL, user);
    }

}