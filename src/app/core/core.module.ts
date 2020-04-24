import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { AppConfigService, appConfigServiceFactory, appConfigFactory } from './services';
import { APP_CONFIG } from './models/app-config.model';

@NgModule({
    imports: [
        HttpClientModule,
        CardModule,
        DropdownModule,
        PanelModule,
        DataViewModule,
        TreeModule,
        ButtonModule,
        SidebarModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appConfigServiceFactory,
            deps: [AppConfigService],
            multi: true
        },
        {
            provide: APP_CONFIG,
            useFactory: appConfigFactory,
            deps: [AppConfigService]
        }
    ]
})
export class CoreModule { }
