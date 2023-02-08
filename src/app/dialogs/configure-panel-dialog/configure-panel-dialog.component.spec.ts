import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePanelDialogComponent } from './configure-panel-dialog.component';

describe('ConfigurePanelDialogComponent', () => {
  let component: ConfigurePanelDialogComponent;
  let fixture: ComponentFixture<ConfigurePanelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurePanelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurePanelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
