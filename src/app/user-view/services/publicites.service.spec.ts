import { TestBed } from '@angular/core/testing';

import { PublicitesService } from './publicites.service';

describe('PublicitesService', () => {
  let service: PublicitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
