import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWallViewComponent } from './create-wall-view.component';

describe('CreateWallViewComponent', () => {
  let component: CreateWallViewComponent;
  let fixture: ComponentFixture<CreateWallViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWallViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWallViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
