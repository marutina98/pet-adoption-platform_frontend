import { TestBed } from '@angular/core/testing';

import { MockApiHelpersService } from './mock-api-helpers.service';

describe('MockApiHelpersService', () => {
  let service: MockApiHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockApiHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
