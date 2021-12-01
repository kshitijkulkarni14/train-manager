import { TestBed } from '@angular/core/testing';

import { TrainDetailService } from './train-detail.service';

describe('TrainDetailService', () => {
  let service: TrainDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
