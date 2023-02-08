import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Panel } from './list/list.component';
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
  readonly parameterDetailURL = "parameter";
  readonly panelCreateURL = "panel/create";
  readonly panelRecentURL = "panel/recent";

  constructor(private httpClient: HttpClient) { }

  public getPanelList(paginationInfo: { limit: number, offset: number; }): Observable<Panel[]> {
    const url = `${this.apiPrefix}${this.panelListURL}?limit=${paginationInfo.limit}`;
    return this.httpClient.get<any>(url);
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
    return this.httpClient.get<any>(`${this.apiPrefix}${this.parameterDetailURL}/${id}`, httpOptions);
  }

  public updateParameter(payload: { id: number, value: number; }) :Observable<Parameter> {
    return this.httpClient.post<any>(`${this.apiPrefix}${this.parameterDetailURL}/${payload.id}`,payload , httpOptions);
  }

  public createPanel(payload: CreatePanelPayload) :Observable<Panel> {
    return this.httpClient.patch<any>(`${this.apiPrefix}${this.panelCreateURL}`,payload , httpOptions);
  }

  public deletePanel(panel_id: number) :Observable<any> {
    return this.httpClient.delete<any>(`${this.apiPrefix}${this.panelDetailURL}${panel_id}`, httpOptions);
  }

  public initializeParameters() :Observable<Parameter[]> {
    return this.httpClient.patch<any>(`${this.apiPrefix}${this.parameterURL}`,{}, httpOptions);
  }
}
