import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { ACTION_TYPE } from 'src/app/enums/action.enum';
import { Cell } from 'src/app/interfaces/cell.interface';
import { Parameter } from 'src/app/interfaces/parameter.interface';


@Component({
  selector: 'app-cell-action-dialog',
  templateUrl: './cell-action-dialog.component.html',
  styleUrls: ['./cell-action-dialog.component.css']
})
export class CellActionDialogComponent implements OnInit {

  readonly ACTION_TYPE = ACTION_TYPE
  parameter!: Parameter;
  constructor(private dialogRef: MatDialogRef<CellActionDialogComponent>,
    private service: AppService,
    @Inject(MAT_DIALOG_DATA) public data: { component: Cell; }) { }
  
    handleCancel(): void{
      this.dialogRef.close();
    }
  
  get action(): ACTION_TYPE{
    return this.data.component.action;
  }

  get isDisplayValueType(): boolean {
    return this.action === ACTION_TYPE.DISPLAY_VALUE;
  }

  get isIncrementDecrementType(): boolean {
    return this.action === ACTION_TYPE.INCREMENT_DECREMENT_VALUE;
  }

  handleIncrementDecrement(action: "increment"|"decrement"): void {
   this.parameter.value = action === "increment" ? this.parameter.value + 1 : this.parameter.value - 1
  }

  handleSave(): void {
    this.dialogRef.close();
    const payload = { id: this.parameter.id, value: this.parameter.value };
    this.service.updateParameter(payload ).subscribe({
      next: (res) => console.log(res)
    })
  }

  getErrors(error:any) {
    console.log(error);
    return "invalid"
  }
  
  ngOnInit(): void {
    this.fetchParameter();
  }

  private fetchParameter(): void {
    this.service.getParameter(this.data.component.parameter_id).subscribe({
      next: (res) => this.parameter = res
    })
  }
}
