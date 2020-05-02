import { NgModule } from '@angular/core';
import { SpinerDataviewComponent } from './components/spiner-dataview/spiner-dataview.component';
import { DataViewModule } from 'primeng/dataview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [SpinerDataviewComponent],
  imports:[
    DataViewModule,
    ProgressSpinnerModule,
    PanelModule,
    DropdownModule,
    InputTextModule
  ],
  exports:[SpinerDataviewComponent]
})
export class SharedModule { }
