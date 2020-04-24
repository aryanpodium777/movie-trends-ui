import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../models/app-config.model';

@Injectable(
    { providedIn: 'root' }
)
export class AppConfigService {

    private readonly APP_CONFIG_URL: string = 'assets/config/app-config.json';
    private _appConfig: AppConfig; constructor(private readonly http: HttpClient) { }

    load(): Promise<any> {
        return this.http.get(this.APP_CONFIG_URL).toPromise()
            .then((appConfig: AppConfig) => { this._appConfig = appConfig; })
            .catch(() => { Promise.reject('Failed to load application configurations'); });
    }

    get appConfig(): AppConfig { return this._appConfig; }
}

export function appConfigServiceFactory(appConfigService: AppConfigService): Function {
    return () => appConfigService.load();
}
export function appConfigFactory(appConfigService: AppConfigService): AppConfig {
    return appConfigService.appConfig;
} 