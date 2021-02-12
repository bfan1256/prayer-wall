import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerItemCardComponent } from './prayer-item-card.component';

describe('PrayerItemCardComponent', () => {
  let component: PrayerItemCardComponent;
  let fixture: ComponentFixture<PrayerItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayerItemCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayerItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
