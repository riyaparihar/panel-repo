import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DisplayService } from 'src/app/display.service';
import { ACTION_TYPE } from 'src/app/enums/action.enum';
import { Cell } from 'src/app/interfaces/cell.interface';
import { Parameter } from 'src/app/interfaces/parameter.interface';

@Component({
  selector: 'app-configure-panel-dialog',
  templateUrl: './configure-panel-dialog.component.html',
  styleUrls: ['./configure-panel-dialog.component.css']
})
export class ConfigurePanelDialogComponent implements OnInit {
  ACTION_TYPE: any = ACTION_TYPE;
  actionSelectOptions: { value: string; label: string; }[] = [];
  cells: Cell[] = [];
  panelForm!: FormGroup;
  showProgress = false;

  constructor(private service: AppService,
    private dispalyService: DisplayService,
    private router: Router,
    private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ConfigurePanelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { parameters: Parameter[]; }) {
    this.getActionSelectOptions();
      console.log(this.data.parameters);
  }
  
  ngOnInit(): void {
    this.createPanelForm();
  }

  handleCancel(): void{
    this.dialogRef.close();
  }

  get parameters(): Parameter[]{
    return this.data.parameters;
  }

  getActionSelectOptions() {

    this.actionSelectOptions =
      
    Object.keys(this.ACTION_TYPE)
      .filter((key) => !isNaN(Number(this.ACTION_TYPE[key]))).map((key: string) => ({
        value: this.ACTION_TYPE[key],
        label: key
      }))
  }

  setValue(selectChange: MatSelectChange, field: "parameter" | "action", position: number) {
    const key = field === "parameter" ? "parameter_id" : "action";
    const cellData = {
      [key]: selectChange.value,
      position
    }
    // this.cells.push(cellData)
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
        this.dialogRef.close();
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
