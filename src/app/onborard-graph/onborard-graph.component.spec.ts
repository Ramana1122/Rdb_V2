import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnborardGraphComponent } from './onborard-graph.component';

describe('OnborardGraphComponent', () => {
  let component: OnborardGraphComponent;
  let fixture: ComponentFixture<OnborardGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnborardGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnborardGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
