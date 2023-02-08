import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Panel } from './grid/list/list.component';
import { CreatePanelPayload } from './interfaces/cell.interface';
import { Parameter } from './interfaces/parameter.interface';

const httpOptions = {
  headers: new HttpHeaders(),
  params: new HttpParams(),
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly apiPrefix=environment.apiURL
  readonly panelListURL = "panel/list";
  readonly panelDetailURL = "panel/";
  readonly parameterURL = "parameters";
  readonly panelCreateURL = "panel/create";
  constructor(private httpClient: HttpClient) { }

  public getPanelList() :Observable<Panel[]> {
    return this.httpClient.get<any>(`${this.apiPrefix}${this.panelListURL}`, httpOptions);
  }

  public getPanelByID(panelID: number) :Observable<Panel> {
    return this.httpClient.get<any>(`${this.apiPrefix}${this.panelDetailURL}${panelID}`, httpOptions);
  }

  public getPanelByName(panelName: string) :Observable<Panel> {
    return this.httpClient.get<any>(`${this.apiPrefix}${this.panelDetailURL}${panelName}`, httpOptions);
  }

  public getParameters() :Observable<Parameter[]> {
    return this.httpClient.get<any>(`${this.apiPrefix}${this.parameterURL}`, httpOptions);
  }

  public getParameter(id: number) :Observable<Parameter> {
    return this.httpClient.get<any>(`${this.apiPrefix}${this.parameterURL}/${id}`, httpOptions);
  }

  public updateParameter(payload: { id: number, value: number; }) :Observable<Parameter> {
    return this.httpClient.post<any>(`${this.apiPrefix}${this.parameterURL}/${payload.id}`,payload , httpOptions);
  }

  public createPanel(payload: CreatePanelPayload) :Observable<Panel> {
    return this.httpClient.patch<any>(`${this.apiPrefix}${this.panelCreateURL}`,payload , httpOptions);
  }

  public initializeParameters() :Observable<Parameter[]> {
    return this.httpClient.patch<any>(`${this.apiPrefix}${this.parameterURL}`,{}, httpOptions);
  }
}
