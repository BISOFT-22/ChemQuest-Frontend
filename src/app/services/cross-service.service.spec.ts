import { TestBed } from '@angular/core/testing';

import { CrossServiceService } from './cross-service.service';

describe('CrossServiceService', () => {
  let service: CrossServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
