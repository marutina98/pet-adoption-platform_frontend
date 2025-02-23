import { TestBed } from '@angular/core/testing';

import { RealApiService } from './real-api.service';

describe('RealApiService', () => {
  let service: RealApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
