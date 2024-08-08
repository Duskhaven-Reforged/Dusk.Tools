import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestDocsComponent } from './quest-docs.component';

describe('QuestDocsComponent', () => {
  let component: QuestDocsComponent;
  let fixture: ComponentFixture<QuestDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
