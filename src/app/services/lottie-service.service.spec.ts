import { TestBed } from '@angular/core/testing';

import { LottieServiceService } from './lottie-service.service';

describe('LottieServiceService', () => {
  let service: LottieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LottieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
