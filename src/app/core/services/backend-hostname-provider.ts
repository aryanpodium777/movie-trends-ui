import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig, ServiceInfo } from '../models/app-config.model';


@Injectable({ providedIn: 'root' })
export class BackendHostnameProviderService {
    private protocol: string; private hostname: string; private port: string;
    constructor(private readonly window: Window,
        @Inject(APP_CONFIG) private readonly appConfig: AppConfig) {
        this.protocol = this.window.location.protocol;
        this.hostname = this.window.location.hostname;
        this.port = this.window.location.port;
    }
    getHostname(): string {
        return this.hostname;
    }

    getProtocol(): string {
        return this.protocol;
    }

    getPort(): string {
        return this.port;
    }

    getServiceUrl(serviceName: string): string {
        const serviceConfig = this.appConfig.serviceInfo.
            find((serviceInfo: ServiceInfo) => {
                return serviceInfo.serviceName === serviceName;
            });
        return serviceConfig ? this.resolveHostNameUrl(serviceConfig) : '';
    }

    private resolveHostNameUrl(serviceInfo: ServiceInfo): string {
        let resolvedUrl = '';
        if (serviceInfo) {
            resolvedUrl = serviceInfo.rootURL ? serviceInfo.rootURL : `${this.protocol}//${this.hostname}`;
            const contextPort = (serviceInfo.port || this.port || '').trim(); resolvedUrl = contextPort ?
                `${resolvedUrl}:${contextPort}${serviceInfo.contextPath}` :
                `${resolvedUrl}${serviceInfo.contextPath}`;
        } return resolvedUrl;
    }
}