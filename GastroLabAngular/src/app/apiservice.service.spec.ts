import { TestBed } from '@angular/core/testing';

import { apiservice } from './apiservice.service';

describe('apiservice', () => {
  let service: apiservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(apiservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
