import { TestBed } from '@angular/core/testing';

import { List1Service } from './list1.service';

describe('List1Service', () => {
  let service: List1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(List1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
