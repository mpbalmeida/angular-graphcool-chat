import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatLineModule,
  MatListModule,
  MatProgressSpinnerModule, MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule, MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import { NoRecordComponent } from './components/no-record/no-record.component';

@NgModule({
  declarations: [NoRecordComponent],
  imports: [
    MatIconModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatLineModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    NoRecordComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
