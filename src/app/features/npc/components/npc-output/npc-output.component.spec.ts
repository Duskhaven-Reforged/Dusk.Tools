import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcOutputComponent } from './npc-output.component';

describe('NpcOutputComponent', () => {
  let component: NpcOutputComponent;
  let fixture: ComponentFixture<NpcOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpcOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpcOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
