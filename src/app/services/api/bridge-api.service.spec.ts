import { TestBed } from '@angular/core/testing';

import { BridgeApiService } from './bridge-api.service';

describe('BridgeApiService', () => {
  let service: BridgeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BridgeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
