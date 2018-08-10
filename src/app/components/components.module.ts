import { AngularMaterialModule } from './../material-module/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import {
  DataTableComponent,
  ConfirmationDialog
} from './data-table/data-table.component';
import {
  DeleteButtonComponent,
  ConfirmationDeleteDialog
} from './delete-button/delete-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { NewButtonComponent } from './new-button/new-button.component';

@NgModule({
  imports: [CommonModule, ComponentsRoutingModule, AngularMaterialModule],
  declarations: [
    ComponentsComponent,
    DataTableComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    NewButtonComponent,
    ConfirmationDialog,
    ConfirmationDeleteDialog
  ],
  entryComponents: [ConfirmationDialog, ConfirmationDeleteDialog]
})
export class ComponentsModule {}
