import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor(private _snackBar: MatSnackBar) { }

  showToast(status: string, msg: string) {
    this._snackBar.open(msg, status, { duration: 3000 });
  }
}
