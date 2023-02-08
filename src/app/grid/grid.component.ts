import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { concatMap, Observable, of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AppService } from '../app.service';
import { CellActionDialogComponent } from '../dialogs/cell-action-dialog/cell-action-dialog.component';
import { ConfigurePanelDialogComponent } from '../dialogs/configure-panel-dialog/configure-panel-dialog.component';
import { ACTION_TYPE } from '../enums/action.enum';
import { Cell } from '../interfaces/cell.interface';
import { Parameter } from '../interfaces/parameter.interface';
import { StoreService } from '../store.service';
import { Panel } from './list/list.component';

const PANEL_SIZE = 9;


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0, 0, 0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class GridComponent implements OnInit {

  panelID!: number;
  panelName!: string;
  panel!: Panel;
  parameters!: Parameter[];
  panelListState: "in" | "out" = "out";
 
  constructor(private router: Router,
    private service: AppService, private activatedRoute: ActivatedRoute,
    private store: StoreService,
  private dialog: MatDialog) {
    this.panelID = +this.router?.getCurrentNavigation()?.extras?.state?.["panelID"];
    this.panelName = this.activatedRoute.snapshot?.params?.["name"]
  }

  ngOnInit(): void {
    this.fetchParameters();
    if (!!this.panelName) {
      this.fetchPanelInfo();
    }
    console.log("test");
  }

  handleSavedPanelsClick(): void {

    this.panelListState = this.panelListState === "out" ? "in" : "out";
    console.log(this.panelListState)
    // this.router.navigate(['panels']);
  }

  get components() {
    return this.panel?.components ? JSON.parse(this.panel.components).components : null;
  }

  get configureButtonText(): string {
    return !!this.panelName ? 'Create New Panel' : 'Configure';
  }

  getComponentInfoByPosition(i: number) {
    // TO_DO: components inerface
    if (this.components?.length) {
      const cell = this.findComponent(i);
      const parameter = this.parameters.find((parameter: Parameter) => parameter.id === cell?.parameter_id)?.name;
      return parameter;
    }
    return i;
    
  }

  showCellInfo(i: number): boolean{
    return !!this.findComponent(i)
  }

  handleConfigureClick(): void {
    if (!!this.panelName) {
      this.router.navigate(['/']);
      return;
    }
    this.router.navigate(['/panel/configure']);

    // this.dialog.open(ConfigurePanelDialogComponent, {
    //   data: {parameters:this.parameters},
    //   panelClass: "panel-dialog",
    //   width: "60vw",
    //   disableClose: true
    // }).afterClosed().subscribe()
  }

  handleCellClick(position: number): void {
    this.dialog.open(CellActionDialogComponent, {
      data: {component: this.findComponent(position)},
      panelClass: "panel-dialog",
      width: "40vw",
      disableClose: true
    }).afterClosed().subscribe()
  }

  private findComponent(postion: number): Cell {
    return this.components?.find((component: any) => component.position === postion);
  }

  private fetchPanelInfo(): void {
    this.service.getPanelByName(this.panelName).subscribe({
      next: (res) => this.panel = res
     })
  }

  private fetchParameters(): void {
    this.service.getParameters().pipe(concatMap((params) => {
      if (!params?.length) {
        return this.service.initializeParameters()
      }
     return of(params)

    })).subscribe({
      next: (res) => {
        this.parameters = res;
        this.store.setParameters(this.parameters);
      }
     })
  }


}
