import { TestBed } from '@angular/core/testing';

import { PrayerItemsService } from './prayer-items.service';

describe('PrayerItemsService', () => {
  let service: PrayerItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrayerItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
