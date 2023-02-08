import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CellComponent } from './cell/cell.component';
import { ConfigurePanelComponent } from './configure-panel/configure-panel.component';
import { DetailComponent as GridDetailComponent } from './grid/detail/detail.component';
import { GridComponent } from './grid/grid.component';
import { ListComponent as GridListComponent } from './grid/list/list.component';

const routes: Routes = [
  
  {
      path: '',
      data: { title: 'Control Panel' },
      component: GridComponent
  },
  {
    path: "panels",
    component: GridListComponent
  },
  {
    path: "control-panel/:name",
    component: GridDetailComponent
  },
  {
    path: ":name",
    component: GridComponent
  },
  {
    path: "panel/configure",
    component: ConfigurePanelComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
