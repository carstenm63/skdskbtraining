import { TestBed } from '@angular/core/testing';

import { SftestService } from './sftest.service';

describe('SftestService', () => {
  let service: SftestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SftestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
