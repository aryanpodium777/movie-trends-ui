import { InjectionToken } from '@angular/core';

export interface ServiceInfo {
    serviceName: string;
    rootURL: string;
    port: string;
    contextPath: string
}

export interface AppConfig {
    serviceInfo: Array<ServiceInfo>;
}

export const APP_CONFIG: InjectionToken<AppConfig> = new InjectionToken('Application Configuration');