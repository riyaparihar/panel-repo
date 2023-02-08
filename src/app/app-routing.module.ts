import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurePanelComponent } from './configure-panel/configure-panel.component';
import { GridComponent } from './grid/grid.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Control Panel' },
    component: GridComponent,
  },
  {
    path: ':name',
    component: GridComponent,
  },
  {
    path: 'panel/configure',
    component: ConfigurePanelComponent,
  },
  {
    path: 'panel/list',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
