import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellActionDialogComponent } from './cell-action-dialog.component';

describe('CellActionDialogComponent', () => {
  let component: CellActionDialogComponent;
  let fixture: ComponentFixture<CellActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellActionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
