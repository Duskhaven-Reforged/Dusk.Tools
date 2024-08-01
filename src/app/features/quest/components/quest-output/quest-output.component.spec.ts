import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestOutputComponent } from './quest-output.component';

describe('QuestOutputComponent', () => {
  let component: QuestOutputComponent;
  let fixture: ComponentFixture<QuestOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
