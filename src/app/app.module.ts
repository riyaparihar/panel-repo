import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

/*MATERIALS */
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { CellComponent } from './cell/cell.component';
import { ListComponent } from './grid/list/list.component';
import { DetailComponent } from './grid/detail/detail.component';

/*PIPES */
import { JsonParsePipe } from './pipes/json-parse.pipe';
import { ConfigurePanelDialogComponent } from './dialogs/configure-panel-dialog/configure-panel-dialog.component';
import { CellActionDialogComponent } from './dialogs/cell-action-dialog/cell-action-dialog.component';
import { ConfigurePanelComponent } from './configure-panel/configure-panel.component';


const MaterialModules = [
  MatGridListModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatSelectModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CellComponent,
    ListComponent,
    DetailComponent,
    JsonParsePipe,
    ConfigurePanelDialogComponent,
    CellActionDialogComponent,
    ConfigurePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModules,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
