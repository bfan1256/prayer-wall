import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerItemsContainerComponent } from './prayer-items-container.component';

describe('PrayerItemsContainerComponent', () => {
  let component: PrayerItemsContainerComponent;
  let fixture: ComponentFixture<PrayerItemsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayerItemsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayerItemsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
