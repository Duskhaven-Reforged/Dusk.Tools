import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestGiverDialogComponent } from './quest-giver-dialog.component';

describe('QuestGiverDialogComponent', () => {
  let component: QuestGiverDialogComponent;
  let fixture: ComponentFixture<QuestGiverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestGiverDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestGiverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
