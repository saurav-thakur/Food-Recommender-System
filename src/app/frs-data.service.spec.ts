import { TestBed } from '@angular/core/testing';

import { FrsDataService } from './frs-data.service';

describe('FrsDataService', () => {
  let service: FrsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
