import { NgModule } from '@angular/core';
import {  MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule,
          MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule,
          MatPaginatorModule, MatSnackBarModule} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
