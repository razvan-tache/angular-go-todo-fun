import { TestBed, inject } from '@angular/core/testing';

import { InMemoryUserServiceService } from './in-memory-user-service.service';

describe('InMemoryUserServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryUserServiceService]
    });
  });

  it('should be created', inject([InMemoryUserServiceService], (service: InMemoryUserServiceService) => {
    expect(service).toBeTruthy();
  }));
});
