import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, of } from 'rxjs';
import { AppService } from '../app.service';
import { GRID_ARRAY } from '../constants/grid.constant';
import { CellActionDialogComponent } from '../dialogs/cell-action-dialog/cell-action-dialog.component';
import { Cell } from '../interfaces/cell.interface';
import { Parameter } from '../interfaces/parameter.interface';
import { StoreService } from '../store.service';
import { Panel } from '../interfaces/panel.interface';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  readonly GRID_ARRAY = GRID_ARRAY;
  panelID!: number;
  panelName!: string;
  panel!: Panel;
  parameters!: Parameter[];

  constructor(
    private router: Router,
    private service: AppService,
    private activatedRoute: ActivatedRoute,
    private store: StoreService,
    private dialog: MatDialog
  ) {
    this.panelName = this.activatedRoute.snapshot?.params?.['name'];
  }

  ngOnInit(): void {
    this.fetchParameters();
    if (!!this.panelName) {
      this.fetchPanelInfo();
    }
  }

  get components() {
    return this.panel?.components
      ? JSON.parse(this.panel.components).components
      : null;
  }

  get configureButtonText(): string {
    return !!this.panelName ? 'Create New Panel' : 'Configure';
  }

  getComponentInfoByPosition(i: number) {
    if (this.components?.length) {
      const cell = this.findComponent(i);
      const parameter = this.parameters.find(
        (parameter: Parameter) => parameter.id === cell?.parameter_id
      )?.name;
      return parameter;
    }
    return i;
  }

  showCellInfo(i: number): boolean {
    return !!this.findComponent(i);
  }

  handleConfigureClick(): void {
    this.router.navigate(['/panel/configure']);
  }

  handleCellClick(position: number): void {
    this.dialog
      .open(CellActionDialogComponent, {
        data: { component: this.findComponent(position) },
        panelClass: 'panel-dialog',
        width: '40vw',
        disableClose: true,
      })
      .afterClosed()
      .subscribe();
  }

  handleAllClick() {
    this.router.navigate(['/panel/list']);
  }

  handleHomeClick() {
    this.router.navigate(['/']);
  }

  private findComponent(postion: number): Cell {
    return this.components?.find(
      (component: any) => component.position === postion
    );
  }

  private fetchPanelInfo(): void {
    this.service.getPanelByName(this.panelName).subscribe({
      next: (res) => (this.panel = res),
    });
  }

  private fetchParameters(): void {
    this.service
      .getParameters()
      .pipe(
        concatMap((params) => {
          if (!params?.length) {
            return this.service.initializeParameters();
          }
          return of(params);
        })
      )
      .subscribe({
        next: (res) => {
          this.parameters = res;
          this.store.setParameters(this.parameters);
        },
      });
  }
}
