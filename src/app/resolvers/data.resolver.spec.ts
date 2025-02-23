import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { animalsResolver } from './animals.resolver';

describe('animalsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => animalsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
