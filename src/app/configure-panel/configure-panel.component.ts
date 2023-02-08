import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, Observable, of } from 'rxjs';
import { AppService } from '../app.service';
import { DisplayService } from '../display.service';
import { ACTION_TYPE } from '../enums/action.enum';
import { Cell } from '../interfaces/cell.interface';
import { Parameter } from '../interfaces/parameter.interface';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-configure-panel',
  templateUrl: './configure-panel.component.html',
  styleUrls: ['./configure-panel.component.css']
})
export class ConfigurePanelComponent implements OnInit {

  ACTION_TYPE: any = ACTION_TYPE;
  actionSelectOptions: { value: string; label: string; }[] = [];
  cells: Cell[] = [];
  panelForm!: FormGroup;
  showProgress = false;
  parameters: Parameter[] = [];

  constructor(private service: AppService,
    private dispalyService: DisplayService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: StoreService) {}

  ngOnInit(): void {
    this.fetchParameters();
    this.createPanelForm();
    this.getActionSelectOptions();
  }

  private fetchParameters(): void {
    this.store.getParameters().pipe(concatMap((res:Parameter[]) => {
      if (!res?.length) {
        return  this.service.getParameters()
      }
      return of(res)
    }))
  .subscribe({
      next: (res) => {
        this.parameters = res
      }
    })
  }

  getActionSelectOptions() {

    this.actionSelectOptions =
      
    Object.keys(this.ACTION_TYPE)
      .filter((key) => !isNaN(Number(this.ACTION_TYPE[key]))).map((key: string) => ({
        value: this.ACTION_TYPE[key],
        label: key
      }))
  }

  handleSave() {
    this.showProgress = true;
    const payload = { ...this.panelForm.value };
    const components = 
      this.panelForm.value.components.filter((cell: Cell) => !Object.values(cell).includes(null)
    )
    payload.components = components;
    this.service.createPanel(payload).subscribe({
      next: (res) => {
        this.showProgress = false;
        this.dispalyService.showToast('Success', 'Panel Created Successfully')
        this.router.navigate([`/${res.name}`]);
      }, error: () => {
        this.showProgress = false;
      }
    })
  }

  get componentsForm() {
    return this.panelForm.controls["components"] as FormArray;
  }

  get componentsFormControl() {
    return this.componentsForm.controls as FormGroup[];
  }

  handleCancel(): void{
    this.componentsForm.reset();
    this.router.navigate(['/']);
  }

  private createPanelForm() {
    this.panelForm = this.formBuilder.group({
      components: this.formBuilder.array([])
    });
    [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((pos: number) => {
      const form = this.formBuilder.group({
        position: [pos],
        parameter_id: [null],
        action:[null]
      })
      this.componentsForm.push(form);
    })
  
  }

}
