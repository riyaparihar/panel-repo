import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { DisplayService } from 'src/app/display.service';
import { HELP_TEXT } from 'src/app/enums/help-text.enum';

export interface Panel {
  id: number;
  name: string;
  components: string;
}
const LIST_LIMIT = 8;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  readonly HELP_TEXT = HELP_TEXT;
  LIST_LIMIT=LIST_LIMIT

  @Input() showRecentPanels = false;
  list!: Panel[];
  panelList!: Panel[];
  paginationInfo = {
    limit: 100,
    offset:1
  }

  constructor(
    private service: AppService,
    private displayService: DisplayService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSavedPanels();
  }

  handleRowClick(panel: Panel): void {
    this.router.navigate([panel.name], { state: { panelID: panel.id } });
  }

  handleDeleteClick(panelID: number): void {
    this.service.deletePanel(panelID).subscribe({
      next: (res) => {
        this.panelList = res;
        this.list=this.panelList.slice(0,LIST_LIMIT)
        this.displayService.showToast(
          HELP_TEXT.SUCCESS_STATUS,
          HELP_TEXT.PANEL_REMOVE_SUCCESS
        );
      },
      error: () =>
        this.displayService.showToast(
          HELP_TEXT.ERROR_STATUS,
          HELP_TEXT.SERVER_ERROR
        ),
    });
  }

  handleCreateNewClick(): void {
    this.router.navigate(['/panel/configure'])
  }

  handleClick(): void {
    const route = this.showRecentPanels ? '/panel/list' : '/';
    this.router.navigate([route]);
  }

  // TO_DO: need to make it server-side
  onPaginate(event: PageEvent): void {
     
    this.paginationInfo.limit = event.length
    this.paginationInfo.offset = event.pageIndex + 1;
     const start =
     this.paginationInfo.offset - 1
        ? (this.paginationInfo.offset - 1) * LIST_LIMIT
        : this.paginationInfo.offset - 1;
    const end = start + LIST_LIMIT;
    this.list=this.panelList.slice(start,end)
  }

  private getSavedPanels() {
   this.service.getPanelList(this.paginationInfo).subscribe({
     next: (res) => {
       this.panelList = res;
       this.list = this.panelList.slice(0, LIST_LIMIT);
      }
    })
  }
}
