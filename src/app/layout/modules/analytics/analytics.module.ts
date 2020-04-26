import { NgModule } from '@angular/core';
import { AnalyticsRoutingModule } from './analytics.routing.module';
import { AnalyticsContainerComponent } from './components/analytics-container/analytics-container.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [AnalyticsContainerComponent],
    imports: [
        AnalyticsRoutingModule,
        OrganizationChartModule,
        ChartModule,
        ButtonModule
    ]
})
export class AnalyticsModule { }
