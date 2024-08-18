import { TestBed } from '@angular/core/testing';

import { NpcService } from './npc.service';

describe('NpcService', () => {
  let service: NpcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
