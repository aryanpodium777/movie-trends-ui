import { NgModule } from '@angular/core';
import { AnalyticsRoutingModule } from './analytics.routing.module';
import { AnalyticsContainerComponent } from './components/analytics-container/analytics-container.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {TreeTableModule} from 'primeng/treetable';

@NgModule({
    declarations: [AnalyticsContainerComponent],
    imports: [
        AnalyticsRoutingModule,
        OrganizationChartModule,
        ChartModule,
        ButtonModule,
        DialogModule,
        TreeTableModule
    ]
})
export class AnalyticsModule { }
