import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS } from './constants/icons.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'control-panel';
  svgIcons: Array<{ name: string; path: string; }> = ICONS;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.svgIcons.forEach((item) => {
      this.addSvgIcon(item.name, item.path);
    });
  }
  
  
  addSvgIcon(name: string, path: string) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(path)
    );
  }
}
