import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ItemComponent } from './components/item/item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routes } from './app-routing.module';
import { AllTaskComponent } from './components/all-tasks/all-tasks.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/app-table/app-table.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddTaskModalComponent } from './components/task-modal/task-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MAT_CHIPS_DEFAULT_OPTIONS, MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { COMMA, SPACE } from '@angular/cdk/keycodes';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ItemComponent,
    AllTaskComponent,
    TableComponent,
    AddTaskModalComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    MatFormFieldModule,
    MatOptionModule,
    MatChipsModule,
    MatChipListbox,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [COMMA, SPACE]
      }
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
