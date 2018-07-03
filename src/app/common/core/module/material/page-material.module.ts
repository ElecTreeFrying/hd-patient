import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatPaginatorModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  exports: [
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class PageMaterialModule { }
