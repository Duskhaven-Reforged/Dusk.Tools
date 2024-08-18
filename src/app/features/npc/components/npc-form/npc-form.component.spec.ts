import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcFormComponent } from './npc-form.component';

describe('NpcFormComponent', () => {
  let component: NpcFormComponent;
  let fixture: ComponentFixture<NpcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpcFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
