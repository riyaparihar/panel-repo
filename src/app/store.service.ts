import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Parameter } from './interfaces/parameter.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private parameters$ = new BehaviorSubject<Parameter[]>([]);

  setParameters(paramters: Parameter[]): void {
    this.parameters$.next(paramters);
  }

  getParameters(): Observable<Parameter[]>{
    return this.parameters$.asObservable();
  }
}
