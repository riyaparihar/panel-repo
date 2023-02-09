import { Component, Inject, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DisplayService } from 'src/app/display.service';
import { ACTION_TYPE } from 'src/app/enums/action.enum';
import { HELP_TEXT } from 'src/app/enums/help-text.enum';
import { Cell } from 'src/app/interfaces/cell.interface';
import { Parameter } from 'src/app/interfaces/parameter.interface';

type ValidationType = 'min' | 'max' | 'pattern';

@Component({
  selector: 'app-cell-action-dialog',
  templateUrl: './cell-action-dialog.component.html',
  styleUrls: ['./cell-action-dialog.component.css'],
})
export class CellActionDialogComponent implements OnInit {
  readonly ACTION_TYPE = ACTION_TYPE;
  readonly HELP_TEXT = HELP_TEXT;
  readonly ONLY_INTEGER_REGEX = /^[-,+]?[0-9]*$/;

  parameter!: Parameter;
  constructor(
    private dialogRef: MatDialogRef<CellActionDialogComponent>,
    private service: AppService,
    private displayService: DisplayService,
    @Inject(MAT_DIALOG_DATA) public data: { component: Cell }
  ) {}

  handleCancel(): void {
    this.dialogRef.close();
  }

  get action(): ACTION_TYPE {
    return this.data.component.action;
  }

  get isDisplayValueType(): boolean {
    return this.action === ACTION_TYPE.DISPLAY_VALUE;
  }

  get isIncrementDecrementType(): boolean {
    return this.action === ACTION_TYPE.INCREMENT_DECREMENT_VALUE;
  }

  get title(): string {
    switch (this.action) {
      case ACTION_TYPE.INCREMENT_DECREMENT_VALUE:
        return `Increment or Decrement Action ${this.parameter?.name} `;

      case ACTION_TYPE.DISPLAY_VALUE:
        return `${this.parameter?.name}`;

      case ACTION_TYPE.SET_VALUE:
        return `Set ${this.parameter?.name}`;
      default:
        return 'Action';
    }
  }

  handleIncrementDecrement(action: 'increment' | 'decrement'): void {
    this.parameter.value =
      action === 'increment'
        ? this.parameter.value + 1
        : this.parameter.value - 1;
  }

  handleSave(): void {
    this.dialogRef.close();
    const parameterValue = this.parameter.value;
    // TO_DO: remove +, 0 from beginning
    // if (
    //   this.parameter.value.toString().startsWith('+') ||
    //   this.parameter.value.toString().startsWith('0')
    // ) {
    // }
    const payload = { id: this.parameter.id, value: this.parameter.value };
    this.service.updateParameter(payload).subscribe({
      next: (res) => {
        this.parameter = res;
        this.displayService.showToast(
          HELP_TEXT.SUCCESS_STATUS,
          HELP_TEXT.PARAMETER_UPDATE_SUCCESS
        );
      },
    });
  }

  getErrorText(error: ValidationErrors | null): string {
    console.log(error);
    if (error?.['max']) {
      return `Must be less than or equal to 100`;
    }
    if (error?.['min']) {
      return `Must be greater than or equal to -100`;
    }
    if (error?.['pattern']) {
      return `Must be an integer value`;
    }
    return 'valid input required';
  }

  ngOnInit(): void {
    this.fetchParameter();
  }

  private fetchParameter(): void {
    this.service.getParameter(this.data.component.parameter_id).subscribe({
      next: (res) => (this.parameter = res),
    });
  }
}
