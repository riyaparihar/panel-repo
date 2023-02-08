import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

export interface Panel {
  id: number;
  name: string;
  components: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list$!: Observable<Panel[]>;
  constructor(private service: AppService,
  private router: Router) { }

  ngOnInit(): void {
    this.getSavedPanels();
  }

  handleRowClick(panel: Panel): void {
    this.router.navigate([panel.name], {state:{panelID: panel.id}})
  }

  private getSavedPanels() {
   this.list$= this.service.getPanelList()
  }

}
