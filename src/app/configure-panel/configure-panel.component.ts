import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, Observable, of } from 'rxjs';
import { AppService } from '../app.service';
import { ACTION_SELECT_OPTIONS } from '../constants/actions.constant';
import { GRID_ARRAY } from '../constants/grid.constant';
import { DisplayService } from '../display.service';
import { ACTION_TYPE } from '../enums/action.enum';
import { Cell } from '../interfaces/cell.interface';
import { Parameter } from '../interfaces/parameter.interface';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-configure-panel',
  templateUrl: './configure-panel.component.html',
  styleUrls: ['./configure-panel.component.css'],
})
export class ConfigurePanelComponent implements OnInit {
  ACTION_TYPE: any = ACTION_TYPE;
  cells: Cell[] = [];
  panelForm!: FormGroup;
  showProgress = false;
  parameters: Parameter[] = [];

  constructor(
    private service: AppService,
    private dispalyService: DisplayService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.createPanelForm();
    this.fetchParameters();
  }

  get actionSelectOptions() {
    return [...ACTION_SELECT_OPTIONS];
  }

  get componentsForm() {
    return this.panelForm?.controls['components'] as FormArray;
  }

  get componentsFormControl() {
    return this.componentsForm?.controls as FormGroup[];
  }

  handleSave() {
    this.panelForm.markAllAsTouched();
    if (this.panelForm.invalid) {
      return;
    }
    this.showProgress = true;
    const payload = { ...this.panelForm.value };
    const components = this.panelForm.value.components.filter(
      (cell: Cell) => !Object.values(cell).includes(null)
    );
    payload.components = components;
    this.service.createPanel(payload).subscribe({
      next: (res) => {
        this.showProgress = false;
        this.dispalyService.showToast('Success', 'Panel Created Successfully');
        this.router.navigate([`/${res.name}`]);
      },
      error: () => {
        this.showProgress = false;
      },
    });
  }

  handleCancel(): void {
    this.componentsForm.reset();
    this.router.navigate(['/']);
  }

  onSelectionChange(field: 'parameter_id' | 'action', form: FormGroup): void {
    const controlName = field === 'parameter_id' ? 'action' : 'parameter_id';
    form.controls[controlName].setValidators(Validators.required);
    form.controls[controlName].updateValueAndValidity();
  }

  private createPanelForm() {
    this.panelForm = this.formBuilder.group({
      components: this.formBuilder.array([]),
    });
    GRID_ARRAY.forEach((pos: number) => {
      const form = this.formBuilder.group({
        position: [pos],
        parameter_id: [null],
        action: [null],
      });
      this.componentsForm?.push(form);
    });
  }

  private fetchParameters(): void {
    this.store
      .getParameters()
      .pipe(
        concatMap((res: Parameter[]) => {
          if (!res?.length) {
            return this.service.getParameters();
          }
          return of(res);
        })
      )
      .subscribe({
        next: (res) => {
          this.parameters = res;
        },
      });
  }
}
